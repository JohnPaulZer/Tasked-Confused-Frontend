import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icons
import { MdOutlineAssignmentLate } from "react-icons/md"; 

// Components
import DateSched from "@/components/DateSched";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import TaskCard from "@/components/TaskCard"; 
import Modal from "@/components/Modal"; 
import Logo from "../images/Logo.png";

interface Task {
  _id: string;
  title: string;
  description?: string; 
  isCompleted: boolean;
  createdAt: string;
  date: string; 
  time: string; 
}

function MainPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  // --- MODAL STATES ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // 👇 New State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<string | null>(null);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", { 
        withCredentials: true 
      });

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

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- DELETE LOGIC ---
  const initiateDelete = (taskId: string) => {
    setTaskToDelete(taskId);     
    setIsDeleteModalOpen(true);  
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete}`, {
        withCredentials: true,
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskToDelete));
      setIsDeleteModalOpen(false); 
      setTaskToDelete(null);       
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    } 
  };

  // --- 👇 EDIT LOGIC ---
  const initiateEdit = (taskId: string) => {
    setTaskToEdit(taskId);
    setIsEditModalOpen(true);
  };

  const confirmEdit = () => {
    if (taskToEdit) {
      navigate(`/EditTask/${taskToEdit}`);
      setIsEditModalOpen(false);
      setTaskToEdit(null);
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":")
    let hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12;
    return `${hourNum}:${minute} ${ampm}`;
  }

  // --- FILTER LOGIC ---
  const displayedTasks = filterDate 
    ? tasks.filter((task) => {
        const d = new Date(task.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const taskDateLocal = `${year}-${month}-${day}`;
        return taskDateLocal === filterDate;
      })
    : tasks;

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pt-64 pointer-events-none">
        <svg viewBox="0 0 412 690" fill="none" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1.16937 43.1118C44.3306 181.112 296.434 -67.5257 432.331 18.6118C568.227 104.749 546.727 606.974 410.831 693.112C274.934 779.249 134.727 779.249 -1.16937 693.112C-137.066 606.974 -46.6694 -94.8882 -1.16937 43.1118Z" fill="#CDB885" />
        </svg>
      </div>

      <Header logo={Logo} title={currentDate} />

      <div className="relative z-10 flex flex-col flex-grow">
        <h1 className="text-3xl text-secondary font-serif font-bold text-left px-5">
          <span className="text-5xl">Hello! </span>
          <br />
          Good day, JOHN PAUL👋
        </h1>

        <div className="flex justify-between items-end mt-12 font-serif px-5 text-secondary">
          <div>
            <p className="text-2xl font-bold">Today</p>
            <p className="text-base opacity-90">
              {displayedTasks.length} {displayedTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <div className="flex items-end relative">
            <PrimaryButton
              content="Add Task"
              bgColorClass="bg-primary"
              colorClass="text-secondary"
              widthClass="w-30"
              className="text-xl whitespace-nowrap"
              onClick={() => navigate("/CreateTask")}
            />
          </div>
        </div>

        <DateSched
          initialDate={new Date()}
          daysToShow={30}
          onSelectDate={(date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setFilterDate(`${year}-${month}-${day}`);
          }}
          tasks={tasks}
        />

        <div className="mt-5 px-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary font-serif">
            {filterDate ? `Tasks for ${new Date(filterDate).toLocaleDateString()}` : "All My Tasks"}
          </h1>
          
          {filterDate && (
            <button 
              onClick={() => setFilterDate(null)}
              className="text-sm font-bold text-secondary bg-primary px-3 py-1 rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Show All
            </button>
          )}
        </div>

        <div className="px-5 pb-10 flex flex-col gap-2 min-h-[200px]">
          {loading ? (
            <p className="text-secondary text-center mt-10 animate-pulse">
              Loading tasks...
            </p>
          ) : displayedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10 text-primary">
              <MdOutlineAssignmentLate className="text-8xl mb-4" />
              <p className="text-xl font-serif font-bold">No tasks found</p>
              <p className="text-sm font-serif text-center px-10">
                {filterDate 
                  ? "There are no tasks scheduled for this day." 
                  : "You're all caught up! Add a new task to get started."}
              </p>
            </div>
          ) : (
            displayedTasks.map((task) => (
              <TaskCard
                key={task._id}
                time={formatTime(task.time)} 
                title={task.title}
                description={task.description || "No description"}
                completed={task.isCompleted}
                onToggleComplete={() => console.log("Toggle", task._id)}
                
                // 👇 Update to use initiateEdit
                onEdit={() => initiateEdit(task._id)}
                
                onDelete={() => initiateDelete(task._id)}
              />
            ))
          )}
        </div>
      </div>

      {/* --- DELETE MODAL --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Task"
        footer={
          <>
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-md"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-lg">Are you sure you want to delete this task?</p>
        <p className="text-sm opacity-70 mt-2">This action cannot be undone.</p>
      </Modal>

      {/* --- 👇 NEW EDIT MODAL --- */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
        footer={
          <>
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
            >
              Cancel
            </button>
            <button 
              onClick={confirmEdit}
              className="px-6 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Edit
            </button>
          </>
        }
      >
        <p className="text-lg">Do you want to edit this task?</p>
      </Modal>

    </div>
  );
}

export default MainPage;