import React from "react"; // Removed { useState, useEffect } - not needed for controlled component
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import CheckBox from "./CheckBox"; 

interface TaskCardProps {
  time: string;
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  completed?: boolean;
  onToggleComplete?: () => void; // Simplified: No need to pass boolean, we just toggle
}

const TaskCard: React.FC<TaskCardProps> = ({
  time,
  title,
  description,
  onEdit,
  onDelete,
  completed = false,
  onToggleComplete,
}) => {
  
  // We rely entirely on the 'completed' prop from the parent (MainPage)
  // This ensures the box doesn't check itself until the Modal confirms it.

  return (
    <div className={`h-20 w-full border-2 rounded-[10px] mt-5 p-4 transition-colors duration-300 flex items-center justify-between font-serif ${
        completed ? "bg-secondary/50 border-primary/50" : "bg-secondary/90 border-primary"
      }`}>
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <span className={`text-sm min-w-20 ${completed ? "text-primary/50" : "text-primary"}`}>
            {time}
        </span>
        <div className="flex flex-col">
          <span
            className={`text-lg font-bold transition-all duration-300 ${
              completed 
                ? "line-through opacity-50 text-primary/70" 
                : "text-primary"
            }`}
          >
            {title}
          </span>
          <span className={`text-sm ${completed ? "opacity-40" : "opacity-90"} text-primary`}>
            {description}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 font-serif">
        <div className="flex items-center gap-2 text-xl text-primary">
          {onEdit && (
            <MdOutlineEdit 
                className={`cursor-pointer hover:scale-110 transition ${completed ? "opacity-50 pointer-events-none" : ""}`} 
                onClick={onEdit} 
            />
          )}
          {onDelete && (
            <MdDeleteOutline 
                className="cursor-pointer text-red-400 hover:scale-110 transition" 
                onClick={onDelete} 
            />
          )}
        </div>
        <div>
          <CheckBox
            id={`completed-${title}-${time}`}
            label=""
            checked={completed} // Controlled by parent
            onChange={() => {
               // We simply tell the parent "I was clicked"
               // The parent decides whether to update state or show a modal
               onToggleComplete?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;