import React from "react";
import PrimaryButton from "../common/PrimaryButton";

interface AddTaskFormProps {
  taskName: string;
  taskTime: string;
  taskDescription: string;
  loading: boolean;
  onTaskNameChange: (value: string) => void;
  onTaskTimeChange: (value: string) => void;
  onTaskDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  buttonLabel?: string;
  loadingLabel?: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  taskName,
  taskTime,
  taskDescription,
  loading,
  onTaskNameChange,
  onTaskTimeChange,
  onTaskDescriptionChange,
  onSubmit,
  buttonLabel = "Add Task",
  loadingLabel = "Saving...",
}) => {
  return (
    <div className="px-5 mt-6 space-y-4">
      <div>
        <label className="text-primary font-semibold text-sm block mb-2">
          Task Name
        </label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
          placeholder="Enter task name"
          className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif"
        />
      </div>

      <div>
        <label className="text-primary font-semibold text-sm block mb-2">
          Time
        </label>
        <input
          type="time"
          value={taskTime}
          onChange={(e) => onTaskTimeChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif"
        />
      </div>

      <div>
        <label className="text-primary font-semibold text-sm block mb-2">
          Description
        </label>
        <textarea
          value={taskDescription}
          onChange={(e) => onTaskDescriptionChange(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border-2 border-primary bg-secondary text-primary focus:outline-none font-serif resize-none"
        />
      </div>

      <div onClick={onSubmit}>
        <PrimaryButton content={loading ? loadingLabel : buttonLabel} />
      </div>
    </div>
  );
};

export default AddTaskForm;
