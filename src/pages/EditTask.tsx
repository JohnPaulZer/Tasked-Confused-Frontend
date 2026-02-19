import SkeletonLoader from "@/components/common/SkeletonLoader";
import ActCard from "@/components/task/ActCard";
import AddTaskCalendar from "@/components/task/AddTaskCalendar";
import AddTaskForm from "@/components/task/AddTaskForm";
import AddTaskHeader from "@/components/task/AddTaskHeader";
import AddTaskModal from "@/components/task/AddTaskModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

// Icons
import { FaBook, FaDumbbell, FaRegLightbulb } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdSportsVolleyball } from "react-icons/md";
import Logo from "../images/Logo.png";

// Edit existing task - modify title, time, description, category, and date
function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- Form State ---
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("Study");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // --- MODAL STATE ---
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "alert", // 'alert' or 'confirm'
    onConfirm: null as (() => void) | null,
  });

  // Display alert or confirmation modal with optional callback
  const showAlert = (title: string, message: string, onOk?: () => void) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: "alert",
      onConfirm: onOk || null,
    });
  };

  // --- BLOCKER: Always ask when leaving (unless saved) ---
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSaved && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setModal({
        isOpen: true,
        title: "Confirm Navigation",
        message:
          "Are you sure you want to leave? Any unsaved changes will be lost.",
        type: "confirm",
        onConfirm: () => blocker.proceed(),
      });
    }
  }, [blocker.state]);

  // Close modal and reset blocker if navigation was pending
  const handleCancelModal = () => {
    setModal({ ...modal, isOpen: false });
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${id}`,
        );
        const task = response.data.task || response.data;

        setTaskName(task.title);
        setTaskTime(task.time);
        setTaskDescription(task.description);
        setCategoryTitle(task.category);
        setSelectedDate(new Date(task.date));
      } catch (error) {
        console.error("Error fetching task:", error);
        showAlert("Error", "Failed to load task details.", () =>
          navigate("/MainPage"),
        );
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchTask();
  }, [id, navigate]);

  // Return icon component based on task category
  const getIcon = (title: string) => {
    switch (title) {
      case "Idea":
        return <FaRegLightbulb className="text-primary text-4xl shrink-0" />;
      case "Foods":
        return <IoFastFoodSharp className="text-primary text-4xl shrink-0" />;
      case "Sports":
        return (
          <MdSportsVolleyball className="text-primary text-4xl shrink-0" />
        );
      case "Exercise":
        return <FaDumbbell className="text-primary text-4xl shrink-0" />;
      default:
        return <FaBook className="text-primary text-4xl shrink-0" />;
    }
  };

  // Execute task update via API after user confirmation
  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      const localDate = new Date(selectedDate.getTime() - offset);
      const cleanDate = localDate.toISOString().split("T")[0];

      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: taskName,
        time: taskTime,
        description: taskDescription,
        category: categoryTitle,
        date: cleanDate,
      });

      setIsSaved(true); // Allow navigation

      showAlert("Success!", "Task Updated Successfully!", () => {
        navigate("/MainPage");
      });
    } catch (error) {
      console.error("Error updating task:", error);
      showAlert("Error", "Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  // Validate form inputs and open confirmation modal
  const handleSaveClick = () => {
    if (!taskName)
      return showAlert("Missing Input", "Please enter a task name");
    if (!taskTime) return showAlert("Missing Input", "Please select a time");
    if (!selectedDate)
      return showAlert("Missing Input", "Please select a date");
    if (taskDescription.length > 200)
      return showAlert(
        "Description Too Long",
        "Description must be under 200 characters",
      );

    // Open Confirmation Modal
    setModal({
      isOpen: true,
      title: "Save Changes",
      message: "Are you sure you want to save these changes?",
      type: "confirm", // Show Yes/No
      onConfirm: confirmUpdate, // 👈 Triggers the actual save
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // Navigate to previous month in calendar
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  // Navigate to next month in calendar
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  // Select date and update task date
  const handleDateClick = (day: number) =>
    setSelectedDate(new Date(year, month, day));
  // Check if day is currently selected
  const isSelected = (day: number) =>
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;
  // Check if day is today's date
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  if (fetching) return <SkeletonLoader type="page" />;

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8 relative">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pt-20 pointer-events-none">
        <svg
          viewBox="0 0 412 930"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.69312 261.261C1.69316 33.4596 413.475 147.687 413.475 11.9196C413.475 -123.848 542.906 945 413.475 945C284.043 945 140.503 945 1.69309 945C-137.116 945 1.69308 489.063 1.69312 261.261Z"
            fill="#CDB885"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col w-full h-full">
        <AddTaskHeader logo={Logo} title="Edit Task" />

        <AddTaskCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onDateClick={handleDateClick}
          isSelected={isSelected}
          isToday={isToday}
        />

        {/* Selected Category Display */}
        <div>
          <ActCard
            disabled
            icon={getIcon(categoryTitle)}
            title={categoryTitle}
            subtitle="Selected"
          />
        </div>

        {/* Input Fields */}
        <AddTaskForm
          taskName={taskName}
          taskTime={taskTime}
          taskDescription={taskDescription}
          loading={loading}
          onTaskNameChange={setTaskName}
          onTaskTimeChange={setTaskTime}
          onTaskDescriptionChange={setTaskDescription}
          onSubmit={handleSaveClick}
          buttonLabel="Save Changes"
          loadingLabel="Updating..."
        />
      </div>

      {/* --- MODAL --- */}
      <AddTaskModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type as "alert" | "confirm"}
        onClose={handleCancelModal}
        onConfirm={modal.onConfirm || undefined}
        noLabel={modal.type === "confirm" ? "No" : undefined}
        yesLabel={modal.type === "confirm" ? "Yes" : undefined}
      />
    </div>
  );
}

export default EditTask;
