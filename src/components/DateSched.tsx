import React, { useState } from "react";

interface DateSchedProps {
  initialDate?: Date;
  daysToShow?: number; // default 30
  onSelectDate?: (date: Date) => void;
}

const DateSched: React.FC<DateSchedProps> = ({
  initialDate = new Date(),
  daysToShow = 30,
  onSelectDate,
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

          return (
            <div
              key={index}
              onClick={() => handleSelectDate(date)}
              className={`
                flex flex-col items-center justify-center
                min-w-[4.5rem] h-24 rounded-2xl cursor-pointer transition-all duration-300
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSched;
