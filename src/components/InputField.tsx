import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type?: "text" | "email" | "password" | "number";
  error?: boolean; // Added error prop
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type = "text",
  placeholder,
  error = false, // Default to false
  className,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full relative my-4">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-2xl">
          {icon}
        </span>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        // Logic: Apply red border directly here if error is true
        className={`w-full bg-secondary rounded-[5px] text-primary text-[20px] h-10 pl-12 pr-20 outline-none font-serif transition-all duration-300 ease-out
          ${error ? "border-2 border-red-500 shadow-red-200 shadow-md" : "border-2 border-transparent"} 
          focus:border-primary focus:shadow-lg focus:shadow-primary/20
          ${className || ""}`}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer text-2xl hover:opacity-70 active:scale-90 transition-all duration-200"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;
