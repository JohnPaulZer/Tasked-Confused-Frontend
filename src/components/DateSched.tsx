import React, { useState } from "react";

// 1. Define Task Interface locally (or import it)
interface Task {
  date: string | Date; // Depending on how your backend sends it
  
}

interface DateSchedProps {
  initialDate?: Date;
  daysToShow?: number; // default 30
  onSelectDate?: (date: Date) => void;
  tasks?: Task[]; // 👈 2. Add tasks prop
}

const DateSched: React.FC<DateSchedProps> = ({
  initialDate = new Date(),
  daysToShow = 30,
  onSelectDate,
  tasks = [] // Default to empty array
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  // Generate the next `daysToShow` dates
  const getDaysArray = () => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const daysList = getDaysArray();

  // Check if two dates are the same
  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  // 3. Helper to check if a specific date has at least one task
  const hasTaskOnDate = (dateToCheck: Date) => {
    return tasks.some((task) => {
      const taskDate = new Date(task.date);
      return isSameDay(taskDate, dateToCheck);
    });
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  return (
    <div className="mt-8 px-5">
      <div
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // hides scrollbar in Firefox/IE
      >
        {daysList.map((date, index) => {
          const isActive = isSameDay(date, selectedDate);
          const hasTask = hasTaskOnDate(date); // 👈 4. Check for task

          return (
            <div
              key={index}
              onClick={() => handleSelectDate(date)}
              className={`
                flex flex-col items-center justify-center
                min-w-18 h-24 rounded-2xl cursor-pointer transition-all duration-300
                border border-secondary/20 shadow-sm font-serif relative
                ${isActive
                  ? "bg-secondary text-primary scale-105 font-bold"
                  : "bg-primary text-secondary hover:bg-secondary/10 hover:text-primary/80"
                }
              `}
            >
              <span className="text-sm uppercase mb-1">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-2xl">{date.getDate()}</span>

              {/* 👇 5. TASK INDICATOR DOT */}
              {hasTask && (
                <div 
                  className={`
                    absolute bottom-2 h-1.5 w-1.5 rounded-full 
                    ${isActive ? "bg-primary" : "bg-secondary"}
                  `} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSched;