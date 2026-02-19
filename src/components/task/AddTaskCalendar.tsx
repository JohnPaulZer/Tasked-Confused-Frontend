import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface AddTaskCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateClick: (day: number) => void;
}

const AddTaskCalendar: React.FC<AddTaskCalendarProps> = ({
  currentDate,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDateClick,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const isSelected = (day: number) =>
    selectedDate.getDate() === day && selectedDate.getMonth() === month;

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth();
  };

  return (
    <div className="px-5 mt-6">
      <div className="bg-secondary/50 rounded-3xl p-5 shadow-lg border border-primary font-serif">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrevMonth}
            className="p-1 hover:bg-secondary rounded-full text-primary"
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
            onClick={onNextMonth}
            className="p-1 hover:bg-secondary rounded-full text-primary"
          >
            <MdChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2 text-center">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-xs font-semibold text-primary uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            return (
              <button
                key={day}
                onClick={() => onDateClick(day)}
                className={`h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm font-medium ${
                  isSelected(day)
                    ? "bg-primary text-secondary"
                    : isToday(day)
                      ? "border border-primary text-primary"
                      : "text-primary"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddTaskCalendar;
