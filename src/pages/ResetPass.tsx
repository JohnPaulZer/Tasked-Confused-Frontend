import InputField from "@/components/common/InputField";
import Modal from "@/components/common/Modal";
import PrimaryButton from "@/components/common/PrimaryButton";
import axios from "axios";
import React, { useState } from "react";
import { FaCheck, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdError } from "react-icons/md"; // Added for error icon
import { useLocation, useNavigate } from "react-router-dom";

// Password reset page after OTP verification
const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>(""); // New state for validation error

  // --- MODAL STATE ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validate password format and strength
  const validatePassword = (val: string) => {
    setPassword(val);
    // Strict Regex: 8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars allowed
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (!passwordRegex.test(val)) {
      setPasswordError(
        "8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars.",
      );
    } else {
      setPasswordError("");
    }
  };

  // Calculate password strength level
  const getStrength = (val: string) => {
    if (!val)
      return {
        width: "0%",
        color: "bg-transparent",
        label: "",
        textColor: "",
      };

    const len = val.length;
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNum = /\d/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val); // Check for banned chars

    // Case 1: Contains special char (Invalid) -> RED
    if (hasSpecial) {
      return {
        width: "100%",
        color: "bg-red-500",
        label: "Invalid",
        textColor: "text-red-500",
      };
    }

    // Case 2: Too short OR missing complexity -> RED
    if (len < 8 || !hasUpper || !hasLower || !hasNum) {
      return {
        width: "33%",
        color: "bg-red-500",
        label: "Weak",
        textColor: "text-red-500",
      };
    }

    // Case 3: Good length (8-11) AND correct complexity -> YELLOW
    if (len < 12) {
      return {
        width: "66%",
        color: "bg-yellow-500",
        label: "Medium",
        textColor: "text-yellow-600",
      };
    }

    // Case 4: Strong length (12-16) AND correct complexity -> GREEN
    return {
      width: "100%",
      color: "bg-green-500",
      label: "Strong",
      textColor: "text-green-600",
    };
  };

  const strength = getStrength(password);

  // Submit new password to backend
  const handleReset = async () => {
    // Check for validation errors before submitting
    if (passwordError) {
      setErrorMessage("Please fix the password errors.");
      setShowErrorModal(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowErrorModal(true);
      return;
    }
    if (!password) {
      setErrorMessage("Please enter a new password.");
      setShowErrorModal(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword: password,
      });
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Error resetting password",
        );
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setShowErrorModal(true);
    }
  };

  // Close success modal and redirect to login
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/LandPage"); // Redirects to Login/LandPage
  };

  // Go back to previous page or login
  const handleBackClick = () => {
    // If user typed anything, confirm before leaving
    if (password.length > 0) {
      setShowNavModal(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden relative">
      <button
        className="absolute top-6 left-6 z-50 text-primary hover:opacity-80 transition-opacity"
        onClick={handleBackClick}
      >
        <IoMdArrowRoundBack size={30} />
      </button>

      {/* Header Background */}
      <div className="absolute top-0 left-0 w-full h-[35vh] md:h-[50vh] z-0">
        <svg
          viewBox="0 0 412 315"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50.1694 -399.888C-4.66937 -261.888 247.434 -510.526 383.331 -424.388C519.227 -338.251 497.727 163.974 361.831 250.112C225.934 336.249 85.7271 336.249 -50.1694 250.112C-186.066 163.974 -95.6694 -537.888 -50.1694 -399.888Z"
            fill="#CDB885"
          />
        </svg>
      </div>

      <div className="relative z-10 pt-10 flex flex-col items-center">
        <FaLock className="w-auto h-50 text-primary" />
      </div>

      <div className="relative grow flex flex-col">
        <div className="w-full max-w-sm mx-auto mt-6">
          <h1 className="text-3xl text-secondary mt-30 mb-8 font-serif uppercase tracking-tight text-center">
            Reset Password
          </h1>
          <p className="text-secondary text-center max-w-md mx-auto pb-5">
            Create a new password for your account.
          </p>

          <div className="mb-4 flex flex-col gap-2">
            {/* 1. New Password Field */}
            <div>
              <InputField
                type="password"
                placeholder="New Password"
                icon={
                  <FaLock className={passwordError ? "text-red-500" : ""} />
                }
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  validatePassword(e.target.value)
                }
                error={!!passwordError}
              />

              {/* --- STRENGTH INDICATOR --- */}
              {password && (
                <div className="flex items-center gap-3 mt-1 mb-2">
                  {/* The Bar */}
                  <div className="flex-grow h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300 ease-out`}
                      style={{ width: strength.width }}
                    ></div>
                  </div>
                  {/* The Text Label */}
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${strength.textColor}`}
                  >
                    {strength.label}
                  </span>
                </div>
              )}

              {/* Validation Error Message */}
              {passwordError && (
                <div className="flex items-start gap-1 -mt-1 mb-2 text-red-500 text-xs font-bold pl-2">
                  <MdError className="mt-0.5 min-w-[12px]" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            {/* 2. Confirm Password Field */}
            <InputField
              type="password"
              placeholder="Confirm Password"
              icon={<FaLock />}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <div
            className={`transition-opacity duration-300 ${passwordError ? "opacity-50 pointer-events-none" : ""}`}
          >
            <PrimaryButton
              content="Reset Password"
              bgColorClass="bg-secondary"
              colorClass="text-primary"
              hoverBgColorClass="hover:bg-primary hover:text-secondary"
              onClick={handleReset}
            />
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. SUCCESS MODAL */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Success!"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={handleSuccessClose}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2"
            >
              <FaCheck /> Go to Login
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-3xl text-green-600 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">
            Password Reset Successful
          </h3>
          <p className="text-primary/70">
            You can now log in with your new password.
          </p>
        </div>
      </Modal>

      {/* 2. ERROR MODAL */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-8 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-md"
            >
              Close
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">Reset Failed</h3>
          <p className="text-primary/70">{errorMessage}</p>
        </div>
      </Modal>

      {/* 3. NAVIGATION CONFIRMATION MODAL */}
      <Modal
        isOpen={showNavModal}
        onClose={() => setShowNavModal(false)}
        title="Cancel Reset?"
        footer={
          <div className="flex gap-3 w-full justify-center">
            <button
              onClick={() => setShowNavModal(false)}
              className="flex-1 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
            >
              Stay
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Yes, Leave
            </button>
          </div>
        }
      >
        <div className="text-center p-4">
          <p className="text-lg text-primary">
            You have started resetting your password. Are you sure you want to
            cancel?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ResetPassword;
