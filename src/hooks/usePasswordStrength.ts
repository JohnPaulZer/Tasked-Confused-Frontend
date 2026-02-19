interface StrengthIndicator {
  width: string;
  color: string;
  label: string;
  textColor: string;
}

// Calculate and return password strength indicator (width, color, label)
export const usePasswordStrength = (password: string): StrengthIndicator => {
  if (!password) {
    return {
      width: "0%",
      color: "bg-transparent",
      label: "",
      textColor: "",
    };
  }

  const len = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

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
