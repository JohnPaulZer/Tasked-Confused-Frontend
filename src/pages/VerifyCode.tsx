import axios from "axios";
import React, { useRef, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal";
import PrimaryButton from "../components/common/PrimaryButton";

// OTP verification page for password recovery
const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string;

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // --- MODAL STATE ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);

  // New state for Resend Modal
  const [showResendModal, setShowResendModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Handle OTP digit input and auto-focus next field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to previous field
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Submit OTP code for verification
  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit code.");
      setShowErrorModal(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp: otpCode,
      });
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Invalid OTP");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setShowErrorModal(true);
    }
  };

  // Close success modal and redirect to password reset page
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/reset", { state: { email } });
  };

  // Resend OTP email to user
  const handleResendOtp = async () => {
    if (!email) {
      setErrorMessage("Email not found. Please go back and try again.");
      setShowErrorModal(true);
      return;
    }

    setIsResending(true);

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      // Trigger the Success Modal instead of inline text
      setShowResendModal(true);

      setOtp(new Array(6).fill("")); // Clear the input fields
      inputRefs.current[0]?.focus(); // Focus on first input
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to resend OTP",
        );
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setShowErrorModal(true);
    } finally {
      setIsResending(false);
    }
  };

  const handleBackClick = () => {
    // If user entered any digit, confirm before leaving
    if (otp.some((digit) => digit !== "")) {
      setShowNavModal(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden relative">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 z-50 text-primary hover:opacity-80 transition-opacity"
        onClick={handleBackClick}
      >
        <IoMdArrowRoundBack size={30} />
      </button>

      {/* Background SVG */}
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

      {/* Top Section */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <FaLock className="w-auto h-50 text-primary" />
      </div>

      {/* Content Area */}
      <div className="relative grow flex flex-col">
        <div className="w-full max-w-sm mx-auto mt-6">
          <h1 className="text-3xl text-secondary mt-30 mb-8 font-serif uppercase tracking-tight text-center">
            Verify Code
          </h1>
          <p className="text-secondary text-center max-w-md mx-auto pb-5">
            Enter the OTP sent to <strong>{email}</strong>
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border-2 border-secondary rounded-md text-center text-xl font-serif text-secondary focus:outline-none focus:border-blue-500 bg-transparent"
              />
            ))}
          </div>

          <div className="px-4 space-y-4">
            <PrimaryButton
              content="Verify Code"
              bgColorClass="bg-secondary"
              colorClass="text-primary"
              hoverBgColorClass="hover:bg-primary hover:text-secondary"
              onClick={handleVerify}
            />
            <PrimaryButton
              content={isResending ? "Resending..." : "Resend OTP"}
              bgColorClass="bg-secondary"
              colorClass="text-primary"
              hoverBgColorClass={
                isResending ? "" : "hover:bg-primary hover:text-secondary"
              }
              onClick={() => !isResending && handleResendOtp()}
              className={isResending ? "opacity-60" : ""}
            />
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. SUCCESS MODAL (Verification) */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Verified!"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={handleSuccessClose}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2"
            >
              <FaCheck /> Reset Password
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-3xl text-green-600 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Code Verified</h3>
          <p className="text-primary/70">
            You can now proceed to reset your password.
          </p>
        </div>
      </Modal>

      {/* 2. RESEND SUCCESS MODAL (New) */}
      <Modal
        isOpen={showResendModal}
        onClose={() => setShowResendModal(false)}
        title="OTP Resent"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowResendModal(false)}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Okay
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-3xl text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Sent!</h3>
          <p className="text-primary/70">
            OTP resent successfully! <br /> Check your email.
          </p>
        </div>
      </Modal>

      {/* 3. ERROR MODAL */}
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
              Try Again
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">
            Verification Failed
          </h3>
          <p className="text-primary/70">{errorMessage}</p>
        </div>
      </Modal>

      {/* 4. NAVIGATION CONFIRMATION MODAL */}
      <Modal
        isOpen={showNavModal}
        onClose={() => setShowNavModal(false)}
        title="Cancel Verification?"
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
            You have started entering the code. Are you sure you want to stop
            verifying?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default VerifyCode;
