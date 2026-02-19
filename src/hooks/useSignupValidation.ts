import axios from "axios";
import { useEffect, useState } from "react";

// Hook for email and password validation during user signup
export const useSignupValidation = () => {
  const [email, setEmailState] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation with debounce
  useEffect(() => {
    if (!email) {
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          { email: email },
        );
        if (response.data.exists) {
          setEmailError("This email is already registered.");
        } else {
          setEmailError("");
        }
      } catch (error) {
        console.error("Email check failed", error);
        setEmailError("");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  // Validate password format (8-16 chars, uppercase, lowercase, number, no special chars)
  const validatePassword = (password: string): string => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (!passwordRegex.test(password)) {
      return "8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars.";
    }
    return "";
  };

  // Update password error state on password change
  const handlePasswordChange = (password: string) => {
    const error = validatePassword(password);
    setPasswordError(error);
    return error;
  };

  // Update email state and validate if email already registered
  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      setEmailError("");
    }
    setEmailState(emailValue);
  };

  return {
    emailError,
    passwordError,
    setPasswordError,
    validateEmail,
    validatePassword,
    handlePasswordChange,
  };
};
