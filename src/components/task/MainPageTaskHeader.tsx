interface MainPageTaskHeaderProps {
  filterDate: string | null;
  onClearFilter: () => void;
}

export default function MainPageTaskHeader({
  filterDate,
  onClearFilter,
}: MainPageTaskHeaderProps) {
  return (
    <div className="mt-5 px-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary font-serif">
        {filterDate
          ? `Tasks for ${new Date(filterDate).toLocaleDateString()}`
          : "All My Tasks"}
      </h1>

      {filterDate && (
        <button
          onClick={onClearFilter}
          className="text-sm font-bold text-secondary bg-primary px-3 py-1 rounded-full shadow-md"
        >
          Show All
        </button>
      )}
    </div>
  );
}
