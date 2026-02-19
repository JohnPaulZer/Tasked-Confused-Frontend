import React from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
  strength: {
    width: string;
    color: string;
    label: string;
    textColor: string;
  };
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  strength,
}) => {
  if (!password) return null;

  return (
    <div className="flex items-center gap-3 mt-1 mb-2">
      <div className="flex-grow h-1 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300 ease-out`}
          style={{ width: strength.width }}
        ></div>
      </div>
      <span
        className={`text-[10px] uppercase font-bold tracking-wider ${strength.textColor}`}
      >
        {strength.label}
      </span>
    </div>
  );
};

export default PasswordStrengthIndicator;
