import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import CheckBox from "./CheckBox"; // Your reusable checkbox component

interface TaskCardProps {
  time: string;
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  completed?: boolean;
  onToggleComplete?: (checked: boolean) => void;
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
  const [localCompleted, setLocalCompleted] = useState(completed);

  useEffect(() => {
    setLocalCompleted(completed);
  }, [completed]);

  return (
    <div className="h-20 w-full border-2 rounded-[10px] mt-5 p-4 bg-secondary/90 border-primary flex items-center justify-between">
      {/* Left Section: Time and Details */}
      <div className="flex items-center gap-4">
        <span className="text-sm min-w-20 text-primary">{time}</span>
        <div className="flex flex-col">
          <span
            className={`text-lg font-bold text-primary ${localCompleted ? "line-through opacity-50" : ""}`}
          >
            {title}
          </span>
          <span className="text-sm opacity-90 text-primary">{description}</span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xl text-primary">
          {onEdit && (
            <MdOutlineEdit className="cursor-pointer" onClick={onEdit} />
          )}
          {onDelete && (
            <MdDeleteOutline className="cursor-pointer text-red-400" onClick={onDelete} />
          )}
        </div>
        <div>
          <CheckBox
            id={`completed-${time}`}
            label=""
            checked={localCompleted}
            onChange={(e) => {
              const checked = e.target.checked;
              setLocalCompleted(checked);
              onToggleComplete?.(checked);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
