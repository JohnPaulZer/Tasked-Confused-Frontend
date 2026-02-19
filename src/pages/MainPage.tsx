import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "@/components/common/Header";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import MainPageModals from "@/components/modals/MainPageModals";
import DateSched from "@/components/task/DateSched";
import MainPageTaskHeader from "@/components/task/MainPageTaskHeader";
import MainPageTaskList from "@/components/task/MainPageTaskList";
import MainPageTopSection from "@/components/task/MainPageTopSection";
import Logo from "../images/Logo.png";

/**
 * TASK INTERFACE
 * Represents a single task object structure
 */
interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  date: string;
  time: string;
}

/**
 * MAIN PAGE - Dashboard for Task Management
 *
 * This is the main authenticated dashboard where users can:
 * - View all their tasks
 * - Filter tasks by date
 * - Create, edit, delete tasks
 * - Mark tasks as complete
 *
 * Features:
 * - Real-time task loading from backend
 * - Date filtering with calendar picker
 * - Multiple modal confirmations (delete, edit, complete)
 * - Optimistic UI updates for better UX
 * - Task count display
 */
// Main dashboard page for viewing and managing tasks
function MainPage() {
  const navigate = useNavigate();

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  /** All tasks fetched from backend */
  const [tasks, setTasks] = useState<Task[]>([]);

  /** Loading state while fetching tasks from API */
  const [loading, setLoading] = useState(true);

  /** Current filter date - null means show all tasks */
  const [filterDate, setFilterDate] = useState<string | null>(null);

  /** Delete modal states */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  /** Edit modal states */
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<string | null>(null);

  /** Complete task modal states */
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState<string | null>(null);

  // Get current date in user-friendly format
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // ============================================================================
  // API CALLS
  // ============================================================================

  /**
   * FETCH TASKS
   * Retrieves all tasks from backend for the authenticated user
   * Handles different response formats for flexibility
   */
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        withCredentials: true,
      });

      // Handle different API response formats
      if (response.data.tasks && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // ============================================================================
  // DELETE TASK HANDLERS
  // ============================================================================

  /**
   * INITIATE DELETE
   * Opens delete confirmation modal for a task
   * @param taskId - ID of task to delete
   */
  const initiateDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  /**
   * CONFIRM DELETE
   * Permanently deletes task from backend after user confirms
   * Updates UI optimistically on success
   */
  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete}`, {
        withCredentials: true,
      });
      // Remove task from state
      setTasks((prev) => prev.filter((task) => task._id !== taskToDelete));
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  // ============================================================================
  // EDIT TASK HANDLERS
  // ============================================================================

  /**
   * INITIATE EDIT
   * Opens edit confirmation modal and navigates to edit page
   * @param taskId - ID of task to edit
   */
  const initiateEdit = (taskId: string) => {
    setTaskToEdit(taskId);
    setIsEditModalOpen(true);
  };

  /**
   * CONFIRM EDIT
   * Navigates to EditTask page with task ID
   */
  const confirmEdit = () => {
    if (taskToEdit) {
      navigate(`/EditTask/${taskToEdit}`);
      setIsEditModalOpen(false);
      setTaskToEdit(null);
    }
  };

  // ============================================================================
  // COMPLETE TASK HANDLERS
  // ============================================================================

  /**
   * HANDLE TOGGLE CLICK
   * Triggered when user clicks task checkbox
   * If task is not complete: Show confirmation modal
   * If task is already complete: Immediately unmark as complete
   *
   * @param taskId - ID of task being toggled
   * @param currentStatus - Current completion status
   */
  const handleToggleClick = (taskId: string, currentStatus: boolean) => {
    if (!currentStatus) {
      // Task is NOT complete -> Show modal before completing
      setTaskToComplete(taskId);
      setIsCompleteModalOpen(true);
    } else {
      // Task is ALREADY complete -> Immediately unmark it
      performTaskUpdate(taskId, false);
    }
  };

  /**
   * CONFIRM COMPLETE
   * Called when user clicks "Yes, Complete" in modal
   * Sends update to backend
   */
  const confirmComplete = () => {
    if (taskToComplete) {
      performTaskUpdate(taskToComplete, true);
      setIsCompleteModalOpen(false);
      setTaskToComplete(null);
    }
  };

  /**
   * PERFORM TASK UPDATE
   * Updates task completion status in backend and UI
   * Uses optimistic updates for immediate UI feedback
   *
   * @param taskId - ID of task to update
   * @param newStatus - New completion status (true = complete, false = incomplete)
   */
  const performTaskUpdate = async (taskId: string, newStatus: boolean) => {
    try {
      // Optimistic update - update UI immediately
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, isCompleted: newStatus } : t,
        ),
      );

      // Send update to backend
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { isCompleted: newStatus },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert optimistic update on failure
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !newStatus } : t,
        ),
      );
    }
  };

  // ============================================================================
  // FILTER LOGIC
  // ============================================================================

  /**
   * DISPLAYED TASKS
   * Filters tasks based on selected date
   * If filterDate is null, shows all tasks
   */
  const displayedTasks = filterDate
    ? tasks.filter((task) => {
        const d = new Date(task.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const taskDateLocal = `${year}-${month}-${day}`;
        return taskDateLocal === filterDate;
      })
    : tasks;
  if (loading) return <SkeletonLoader type="page" />;
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pt-64 pointer-events-none">
        <svg
          viewBox="0 0 412 690"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1.16937 43.1118C44.3306 181.112 296.434 -67.5257 432.331 18.6118C568.227 104.749 546.727 606.974 410.831 693.112C274.934 779.249 134.727 779.249 -1.16937 693.112C-137.066 606.974 -46.6694 -94.8882 -1.16937 43.1118Z"
            fill="#CDB885"
          />
        </svg>
      </div>

      <Header logo={Logo} title={currentDate} />

      <div className="relative z-10 flex flex-col grow">
        <MainPageTopSection
          taskCount={displayedTasks.length}
          onAddTaskClick={() => navigate("/CreateTask")}
        />

        <DateSched
          initialDate={new Date()}
          daysToShow={30}
          onSelectDate={(date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            setFilterDate(`${year}-${month}-${day}`);
          }}
          tasks={tasks}
        />

        <MainPageTaskHeader
          filterDate={filterDate}
          onClearFilter={() => setFilterDate(null)}
        />

        <MainPageTaskList
          tasks={displayedTasks}
          loading={loading}
          filterDate={filterDate}
          onToggleComplete={(taskId) => {
            const task = tasks.find((t) => t._id === taskId);
            if (task) {
              handleToggleClick(taskId, task.isCompleted);
            }
          }}
          onEdit={initiateEdit}
          onDelete={initiateDelete}
        />
      </div>

      {/* MODALS */}
      <MainPageModals
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirm={confirmDelete}
        isEditModalOpen={isEditModalOpen}
        onEditClose={() => setIsEditModalOpen(false)}
        onEditConfirm={confirmEdit}
        isCompleteModalOpen={isCompleteModalOpen}
        onCompleteClose={() => setIsCompleteModalOpen(false)}
        onCompleteConfirm={confirmComplete}
      />
    </div>
  );
}

export default MainPage;
