import React from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string; // Optional extra styling
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative px-5 text-5xl text-secondary font-serif font-bold text-left cursor-pointer ${className || ""}`}
      onClick={() => navigate(-1)}
    >
      <p>‹</p>
    </div>
  );
};

export default BackButton;
