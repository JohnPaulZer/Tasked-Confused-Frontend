import PrimaryButton from "../common/PrimaryButton";

interface MainPageTopSectionProps {
  taskCount: number;
  onAddTaskClick: () => void;
}

export default function MainPageTopSection({
  taskCount,
  onAddTaskClick,
}: MainPageTopSectionProps) {
  return (
    <>
      <h1 className="text-3xl text-secondary font-serif font-bold text-left px-5">
        <span className="text-5xl">Hello! </span>
        <br />
        Good day, JOHN PAUL👋
      </h1>

      <div className="flex justify-between items-end mt-12 font-serif px-5 text-secondary">
        <div>
          <p className="text-2xl font-bold">Today</p>
          <p className="text-base opacity-90">
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </p>
        </div>

        <div className="flex items-end relative">
          <PrimaryButton
            content="Add Task"
            bgColorClass="bg-primary"
            colorClass="text-secondary"
            widthClass="w-30"
            className="text-xl whitespace-nowrap"
            onClick={onAddTaskClick}
          />
        </div>
      </div>
    </>
  );
}
