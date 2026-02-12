interface PrimaryButtonContent {
  content: string;
  bgColorClass?: string;
  colorClass?: string;
  // New optional props for hover states
  hoverBgColorClass?: string;
  hoverColorClass?: string;
  onClick?: () => void; // Optional onClick handler
}

const PrimaryButton: React.FC<PrimaryButtonContent> = ({
  content,
  bgColorClass,
  colorClass,
  hoverBgColorClass,
  hoverColorClass,
  onClick
}) => {
  return (
    <>
      <button
      onClick={onClick}
        className={`
          w-full 
          ${bgColorClass || "bg-primary"} 
          ${colorClass || "text-secondary"} 
          text-2xl font-serif mt-5 rounded-[10px] h-10 
          cursor-pointer transition-colors duration-300
          ${hoverBgColorClass || "hover:bg-third"} 
          ${hoverColorClass || "hover:text-primary"}
        `}
      >
        {content}
      </button>
    </>
  );
};

export default PrimaryButton;