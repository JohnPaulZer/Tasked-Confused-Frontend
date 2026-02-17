import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import PrimaryButton from "@/components/PrimaryButton";
import InputField from "@/components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleReset = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!password) return alert("Enter a new password");

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword: password,
      });
      alert("Password reset successful! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Error resetting password");
      } else {
        // Fallback for non-axios errors (e.g., network failure or code crash)
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden relative">
      <button
        className="absolute top-6 left-6 z-50 text-primary hover:opacity-80 transition-opacity"
        onClick={() => window.history.back()}
      >
        <IoMdArrowRoundBack size={30} />
      </button>

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

          <div className="mb-4 space-y-4">
            <InputField
              type="password"
              placeholder="New Password"
              icon={<FaLock />}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              icon={<FaLock />}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            />
          </div>

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
  );
};

export default ResetPassword;