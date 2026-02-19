import { MdOutlineAssignmentLate } from "react-icons/md";
import TaskCard from "./TaskCard";

interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  date: string;
  time: string;
}

interface MainPageTaskListProps {
  tasks: Task[];
  loading: boolean;
  filterDate: string | null;
  onToggleComplete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function MainPageTaskList({
  tasks,
  loading,
  filterDate,
  onToggleComplete,
  onEdit,
  onDelete,
}: MainPageTaskListProps) {
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    let hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12;
    return `${hourNum}:${minute} ${ampm}`;
  };

  // Sort tasks by date in ascending order (oldest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return (
    <div className="px-5 pb-10 flex flex-col gap-2 min-h-50 max-h-100 sm:max-h-[500px] md:max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-secondary/10">
      {loading ? (
        <p className="text-secondary text-center mt-10 animate-pulse">
          Loading tasks...
        </p>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 text-primary">
          <MdOutlineAssignmentLate className="text-8xl mb-4" />
          <p className="text-xl font-serif font-bold">No tasks found</p>
          <p className="text-sm font-serif text-center px-10">
            {filterDate
              ? "There are no tasks scheduled for this day."
              : "You're all caught up! Add a new task to get started."}
          </p>
        </div>
      ) : (
        sortedTasks.map((task) => (
          <TaskCard
            key={task._id}
            time={formatTime(task.time)}
            title={task.title}
            description={task.description || "No description"}
            completed={task.isCompleted}
            onToggleComplete={() => onToggleComplete(task._id)}
            onEdit={() => onEdit(task._id)}
            onDelete={() => onDelete(task._id)}
          />
        ))
      )}
    </div>
  );
}
