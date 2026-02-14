import ActCard from "@/components/ActCard";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Logo from "../images/Logo.png";
import PrimaryButton from "@/components/PrimaryButton";

function AddTask() {
  // --- Calendar State & Logic ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get number of days in the current month
  // (Day 0 of the next month is the last day of the current month)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the day of the week the month starts on (0 = Sun, 1 = Mon...)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Navigation handlers
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

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

      {/* Content Wrapper (z-10 ensures it sits on top of SVG) */}
      <div className="relative z-10 flex flex-col w-full h-full">
        {/* Header Section */}
        <div>
          <Header logo={Logo} title="Create New Task" />
          <div className="">
            <BackButton />
          </div>
        </div>

        <div className="px-5 mt-6">
          <div className="bg-secondary/50 rounded-3xl p-5 shadow-lg border border-primary font-serif">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1 hover:bg-secondary hover:text-primary rounded-full transition-colors text-primary"
              >
                <MdChevronLeft size={24} />
              </button>

              <h2 className="text-lg font-bold text-primary">
                {currentDate.toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                onClick={nextMonth}
                className="p-1 hover:bg-primary hover:text-secondary rounded-full transition-colors text-primary"
              >
                <MdChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2 text-center">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-xs font-semibold text-primary uppercase tracking-wide"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const selected = isSelected(day);
                const today = isToday(day);

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`
                      h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all
                      ${
                        selected
                          ? "bg-primary text-secondary shadow-xl"
                          : today
                            ? "border border-primary text-primary bg-secondary/80"
                            : "text-primary hover:bg-primary/50 hover:text-secondary"
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <ActCard
          disabled
            icon={<FaBook className="text-primary text-4xl shrink-0" />}
            title="Study"
            subtitle="0 Task"
          />
        </div>
        <div className="px-5 mt-6 space-y-4">
            
          <div>
            <label className="text-primary font-semibold text-sm block mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary placeholder-primary/50 focus:outline-none focus:shadow-lg font-serif"
            />
          </div>

          <div>
            <label className="text-primary font-semibold text-sm block mb-2">
              Time
            </label>
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none focus:shadow-lg font-serif"
            />
          </div>

          <div>
            <label className="text-primary font-semibold text-sm block mb-2">
              Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary placeholder-primary/50 focus:outline-none focus:shadow-lg font-serif resize-none"
            />
          </div>
          <PrimaryButton content="Add Task"/>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
