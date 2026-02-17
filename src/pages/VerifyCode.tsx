import React, { useState, useRef } from "react";
import { FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import PrimaryButton from "@/components/PrimaryButton";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return alert("Please enter complete OTP");

    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp: otpCode });
      navigate("/reset", { state: { email } });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Invalid OTP");
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
            Verify Code
          </h1>
          <p className="text-secondary text-center max-w-md mx-auto pb-5">
            Enter the OTP sent to {email}
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputRefs.current[index] = el; }}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border-2 border-secondary rounded-md text-center text-xl font-serif text-secondary focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <PrimaryButton
            content="Verify Code"
            bgColorClass="bg-secondary"
            colorClass="text-primary"
            hoverBgColorClass="hover:bg-primary hover:text-secondary"
            onClick={handleVerify}
          />
          <PrimaryButton
            content="Resend OTP"
            bgColorClass="bg-transparent"
            colorClass="text-secondary"
            hoverBgColorClass="hover:text-primary"
            onClick={() => {/* Implement Resend Logic */}}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;