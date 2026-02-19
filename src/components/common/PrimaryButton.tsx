interface PrimaryButtonContent {
  content: string;
  bgColorClass?: string;
  colorClass?: string;
  // New optional props for hover states
  hoverBgColorClass?: string;
  hoverColorClass?: string;
  onClick?: () => void; // Optional onClick handler
  widthClass?: string; // allow overriding width (e.g. "w-20")
  className?: string; // additional custom classes
  type?: "submit" | "reset" | "button";
}

const PrimaryButton: React.FC<PrimaryButtonContent> = ({
  content,
  bgColorClass,
  colorClass,
  hoverBgColorClass,
  hoverColorClass,
  onClick,
  widthClass,
  className,
  type,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`
          ${widthClass || "w-full"} 
          ${bgColorClass || "bg-primary"} 
          ${colorClass || "text-secondary"} 
          text-2xl font-serif mt-5 rounded-[10px] h-10 
          cursor-pointer
          ${hoverBgColorClass || "hover:bg-secondary"} 
          ${hoverColorClass || "hover:text-primary"}
          ${className || ""}
        `}
      >
        {content}
      </button>
    </>
  );
};

export default PrimaryButton;
