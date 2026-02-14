import React from "react";
import { useNavigate } from "react-router-dom";

interface ActCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void; // optional override if needed
  disabled?: boolean;
}

const ActCard: React.FC<ActCardProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick(); // allows custom behavior override
    } else {
      navigate("/AddTask"); // predefined route
    }
  };

  return (
    <div
      className={`relative h-20 mx-5 mt-4 rounded-lg bg-secondary border-2 border-primary flex items-center justify-between px-4 gap-4 font-serif cursor-pointer hover:shadow-md transition-shadow duration-300 ${
        disabled ? 'pointer-events-none' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-primary text-4xl shrink-0">{icon}</span>
        <div className="flex flex-col">
          <p className="text-primary font-semibold">{title}</p>
          {subtitle && <p className="text-primary text-xs">{subtitle}</p>}
        </div>
      </div>

      <p className="text-primary text-4xl font-light">{disabled ? <span className="inline-block rotate-90">›</span> : '›'}</p>
    </div>
  );
};

export default ActCard;
