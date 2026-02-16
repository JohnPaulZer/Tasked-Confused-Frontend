import ActCard from "@/components/ActCard";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useBlocker } from "react-router-dom"; 
import axios from "axios"; 
import Modal from "@/components/Modal"; 

axios.defaults.withCredentials = true;

// Icons
import { FaBook, FaDumbbell, FaRegLightbulb } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight, MdSportsVolleyball } from "react-icons/md";
import Logo from "../images/Logo.png";

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

  // --- Helper to Show Alert ---
  const showAlert = (title: string, message: string, onOk?: () => void) => {
    setModal({ 
      isOpen: true, 
      title, 
      message, 
      type: "alert",
      onConfirm: onOk || null 
    });
  };

  // --- BLOCKER: Always ask when leaving (unless saved) ---
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSaved && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setModal({
        isOpen: true,
        title: "Confirm Navigation",
        message: "Are you sure you want to leave? Any unsaved changes will be lost.",
        type: "confirm",
        onConfirm: () => blocker.proceed(), 
      });
    }
  }, [blocker.state]);

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
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        const task = response.data.task || response.data; 

        setTaskName(task.title);
        setTaskTime(task.time);
        setTaskDescription(task.description);
        setCategoryTitle(task.category);
        setSelectedDate(new Date(task.date)); 
        
      } catch (error) {
        console.error("Error fetching task:", error);
        showAlert("Error", "Failed to load task details.", () => navigate("/MainPage"));
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchTask();
  }, [id, navigate]);


  const getIcon = (title: string) => {
    switch (title) {
      case "Idea": return <FaRegLightbulb className="text-primary text-4xl shrink-0" />;
      case "Foods": return <IoFastFoodSharp className="text-primary text-4xl shrink-0" />;
      case "Sports": return <MdSportsVolleyball className="text-primary text-4xl shrink-0" />;
      case "Exercise": return <FaDumbbell className="text-primary text-4xl shrink-0" />;
      default: return <FaBook className="text-primary text-4xl shrink-0" />;
    }
  };

  // --- 1. ACTUAL SAVE LOGIC (Runs only after confirmation) ---
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

  // --- 2. BUTTON CLICK HANDLER (Validates & Opens Modal) ---
  const handleSaveClick = () => {
    if (!taskName) return showAlert("Missing Input", "Please enter a task name");
    if (!taskTime) return showAlert("Missing Input", "Please select a time");
    if (!selectedDate) return showAlert("Missing Input", "Please select a date");
    if (taskDescription.length > 200) return showAlert("Description Too Long", "Description must be under 200 characters");

    // Open Confirmation Modal
    setModal({
      isOpen: true,
      title: "Save Changes",
      message: "Are you sure you want to save these changes?",
      type: "confirm", // Show Yes/No
      onConfirm: confirmUpdate, // 👈 Triggers the actual save
    });
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleDateClick = (day: number) => setSelectedDate(new Date(year, month, day));
  const isSelected = (day: number) => selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  const isToday = (day: number) => {
      const today = new Date();
      return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  if (fetching) return <div className="min-h-screen bg-primary flex items-center justify-center text-secondary">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8 relative">
       {/* Background SVG */}
       <div className="absolute inset-0 z-0 pt-20 pointer-events-none">
        <svg viewBox="0 0 412 930" fill="none" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.69312 261.261C1.69316 33.4596 413.475 147.687 413.475 11.9196C413.475 -123.848 542.906 945 413.475 945C284.043 945 140.503 945 1.69309 945C-137.116 945 1.69308 489.063 1.69312 261.261Z" fill="#CDB885"/>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col w-full h-full">
        <div>
          <Header logo={Logo} title="Edit Task" />
          <div className="">
            <BackButton />
          </div>
        </div>

        {/* Calendar UI */}
        <div className="px-5 mt-6">
          <div className="bg-secondary/50 rounded-3xl p-5 shadow-lg border border-primary font-serif">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1 hover:bg-secondary rounded-full text-primary"><MdChevronLeft size={24} /></button>
              <h2 className="text-lg font-bold text-primary">{currentDate.toLocaleDateString("default", { month: "long", year: "numeric" })}</h2>
              <button onClick={nextMonth} className="p-1 hover:bg-secondary rounded-full text-primary"><MdChevronRight size={24} /></button>
            </div>
            <div className="grid grid-cols-7 mb-2 text-center">
              {daysOfWeek.map((day) => <div key={day} className="text-xs font-semibold text-primary uppercase">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                return (
                  <button key={day} onClick={() => handleDateClick(day)} className={`h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm font-medium ${isSelected(day) ? "bg-primary text-secondary" : isToday(day) ? "border border-primary text-primary" : "text-primary"}`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

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
        <div className="px-5 mt-6 space-y-4">
          <div>
            <label className="text-primary font-semibold text-sm block mb-2">Task Name</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter task name" className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif" />
          </div>

          <div>
            <label className="text-primary font-semibold text-sm block mb-2">Time</label>
            <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif" />
          </div>

          <div>
            <label className="text-primary font-semibold text-sm block mb-2">Description</label>
            <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Enter task description" rows={4} className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif resize-none" />
          </div>
          
          {/* Submit Button */}
          <div onClick={handleSaveClick}>
            <PrimaryButton content={loading ? "Updating..." : "Save Changes"} />
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCancelModal}
        title={modal.title}
        footer={
          modal.type === "confirm" ? (
            // --- CONFIRM FOOTER (Yes/No) ---
            <>
              <button 
                onClick={handleCancelModal}
                className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
              >
                No
              </button>
              <button 
                onClick={() => {
                  setModal({ ...modal, isOpen: false });
                  if (modal.onConfirm) modal.onConfirm(); 
                }}
                className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-md"
              >
                Yes
              </button>
            </>
          ) : (
            // --- ALERT FOOTER (Okay) ---
            <div className="flex justify-center w-full">
              <button 
                onClick={() => {
                  setModal({ ...modal, isOpen: false });
                  if (modal.onConfirm) modal.onConfirm();
                }}
                className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
              >
                Okay
              </button>
            </div>
          )
        }
      >
        <p className="text-lg">{modal.message}</p>
      </Modal>

    </div>
  );
}

export default EditTask;