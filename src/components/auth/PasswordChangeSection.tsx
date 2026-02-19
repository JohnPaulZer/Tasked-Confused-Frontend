import React from "react";
import { FaLock } from "react-icons/fa";
import { MdError } from "react-icons/md";
import InputField from "../common/InputField";

interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

interface PasswordChangeSectionProps {
  isEditing: boolean;
  showPasswordSection: boolean;
  onTogglePasswordSection: () => void;
  passwords: PasswordData;
  onPasswordChange: (field: keyof PasswordData, value: string) => void;
  passwordError: string;
  validatePassword: (val: string) => void;
}

interface StrengthIndicator {
  width: string;
  color: string;
  label: string;
  textColor: string;
}

const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({
  isEditing,
  showPasswordSection,
  onTogglePasswordSection,
  passwords,
  onPasswordChange,
  passwordError,
  validatePassword,
}) => {
  const getStrength = (val: string): StrengthIndicator => {
    if (!val)
      return { width: "0%", color: "bg-transparent", label: "", textColor: "" };

    const len = val.length;
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNum = /\d/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    if (hasSpecial) {
      return {
        width: "100%",
        color: "bg-red-500",
        label: "Invalid",
        textColor: "text-red-500",
      };
    }
    if (len < 8 || !hasUpper || !hasLower || !hasNum) {
      return {
        width: "33%",
        color: "bg-red-500",
        label: "Weak",
        textColor: "text-red-500",
      };
    }
    if (len < 12) {
      return {
        width: "66%",
        color: "bg-yellow-500",
        label: "Medium",
        textColor: "text-yellow-600",
      };
    }
    return {
      width: "100%",
      color: "bg-green-500",
      label: "Strong",
      textColor: "text-green-600",
    };
  };

  const strength = getStrength(passwords.new);

  if (!isEditing) return null;

  return (
    <div className="border-t-2 border-primary/10 pt-4 mt-2 w-full">
      <button
        onClick={onTogglePasswordSection}
        className="flex items-center gap-2 text-primary font-bold hover:underline mb-4 text-sm"
      >
        <FaLock />{" "}
        {showPasswordSection ? "Cancel Password Change" : "Change Password"}
      </button>

      {showPasswordSection && (
        <div className="space-y-4 bg-primary/5 p-4 rounded-xl border-2 border-primary/10 w-full">
          {/* Current Password */}
          <div className="bg-secondary rounded-lg border border-primary/20 p-1">
            <InputField
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) => onPasswordChange("current", e.target.value)}
              icon={<FaLock />}
            />
          </div>

          {/* New Password with Validator */}
          <div>
            <div className="bg-secondary rounded-lg border border-primary/20 p-1">
              <InputField
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => validatePassword(e.target.value)}
                icon={
                  <FaLock className={passwordError ? "text-red-500" : ""} />
                }
                error={!!passwordError}
              />
            </div>

            {/* Strength Indicator */}
            {passwords.new && (
              <div className="flex items-center gap-3 mt-2 px-1">
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
            )}

            {/* Error Message */}
            {passwordError && (
              <div className="flex items-start gap-1 mt-1 text-red-500 text-xs font-bold pl-2">
                <MdError className="mt-0.5 min-w-[12px]" />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="bg-secondary rounded-lg border border-primary/20 p-1">
            <InputField
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) => onPasswordChange("confirm", e.target.value)}
              icon={<FaLock />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeSection;
