import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode; // Allows JSX for links
  id: string;
}

const CheckBox: React.FC<CheckboxProps> = ({ label, id, ...rest }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 accent-primary cursor-pointer"
        {...rest}
      />
      <label htmlFor={id} className="text-sm cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
