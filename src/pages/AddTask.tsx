import SkeletonLoader from "@/components/common/SkeletonLoader";
import ActCard from "@/components/task/ActCard";
import AddTaskCalendar from "@/components/task/AddTaskCalendar";
import AddTaskForm from "@/components/task/AddTaskForm";
import AddTaskHeader from "@/components/task/AddTaskHeader";
import AddTaskModal from "@/components/task/AddTaskModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

// Icons
import { FaBook, FaDumbbell, FaRegLightbulb } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdSportsVolleyball } from "react-icons/md";
import Logo from "../images/Logo.png";

// Create and add task form page
function AddTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const categoryTitle = location.state?.category || "Study";

  // --- Calendar State ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- Form State ---
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // New state to track if save was successful

  // --- 1. MODAL STATE (Reusable) ---
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "alert", // 'alert' (OK) or 'confirm' (Yes/No)
    onConfirm: null as (() => void) | null,
  });

  // --- 2. DIRTY FORM DETECTION ---
  // Check if user has typed anything
  const isDirty =
    (taskName !== "" || taskTime !== "" || taskDescription !== "") && !isSaved;

  // --- 3. INTERCEPT NAVIGATION (React Router v6) ---
  // This blocks navigation if the form is dirty
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  // If the blocker is active, show the confirmation modal
  useEffect(() => {
    if (blocker.state === "blocked") {
      setModal({
        isOpen: true,
        title: "Unsaved Changes",
        message: "You have unsaved changes. Are you sure you want to leave?",
        type: "confirm", // Show Yes/No buttons
        onConfirm: () => blocker.proceed(), // If Yes, let them leave
      });
    }
  }, [blocker.state]);

  // Cancel leave and stay on page if there are unsaved changes
  const handleCancelLeave = () => {
    setModal({ ...modal, isOpen: false });
    if (blocker.state === "blocked") {
      blocker.reset(); // Stay on the page
    }
  };

  // Show confirmation alert modal
  const showAlert = (title: string, message: string, onOk?: () => void) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: "alert",
      onConfirm: onOk || null,
    });
  };

  // Return appropriate icon based on category
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

  // Submit form and create task via API
  const handleSubmit = async () => {
    if (!taskName)
      return showAlert("Missing Input", "Please enter a task name.");
    if (!taskTime) return showAlert("Missing Input", "Please select a time.");
    if (!selectedDate)
      return showAlert("Missing Input", "Please select a date.");
    if (taskDescription.length > 200)
      return showAlert(
        "Description Too Long",
        "Description must be under 200 characters.",
      );

    if (loading) return;

    setLoading(true);
    try {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      const locatDate = new Date(selectedDate.getTime() - offset);
      const cleanDate = locatDate.toISOString().split("T")[0];

      await axios.post("http://localhost:5000/api/tasks", {
        title: taskName,
        time: taskTime,
        description: taskDescription,
        category: categoryTitle,
        date: cleanDate,
      });

      setIsSaved(true); // Mark as saved so blocker doesn't trigger

      showAlert("Success!", "Task Added Successfully!", () => {
        navigate("/MainPage");
      });
    } catch (error) {
      console.error("Error adding task:", error);
      showAlert("Error", "Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // Move to previous month in calendar
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  // Move to next month in calendar
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  // Set selected date when clicking calendar day
  const handleDateClick = (day: number) =>
    setSelectedDate(new Date(year, month, day));
  // Check if day is selected
  const isSelected = (day: number) =>
    selectedDate.getDate() === day && selectedDate.getMonth() === month;
  // Check if day is today
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth();
  };

  if (isLoading) return <SkeletonLoader type="addtask" />;

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
        <AddTaskHeader logo={Logo} />

        <AddTaskCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onDateClick={handleDateClick}
        />

        <div>
          <ActCard
            disabled
            icon={getIcon(categoryTitle)}
            title={categoryTitle}
            subtitle="Selected"
          />
        </div>

        <AddTaskForm
          taskName={taskName}
          taskTime={taskTime}
          taskDescription={taskDescription}
          loading={loading}
          onTaskNameChange={setTaskName}
          onTaskTimeChange={setTaskTime}
          onTaskDescriptionChange={setTaskDescription}
          onSubmit={handleSubmit}
        />
      </div>

      <AddTaskModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type as "alert" | "confirm"}
        onClose={handleCancelLeave}
        onConfirm={
          modal.type === "confirm"
            ? () => {
                if (modal.onConfirm) modal.onConfirm();
              }
            : modal.onConfirm || undefined
        }
      />
    </div>
  );
}

export default AddTask;
