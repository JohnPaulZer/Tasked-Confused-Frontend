import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type?: "text" | "email" | "password" | "number";
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type = "text",
  placeholder,
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
        className={`w-full bg-secondary rounded-[5px] text-primary text-[20px] w-full h-10 pl-12 pr-20 outline-none font-serif`}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer text-2xl"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;
