import InputField from "@/components/common/InputField";
import Modal from "@/components/common/Modal"; // Ensure you import your Modal component
import PrimaryButton from "@/components/common/PrimaryButton";
import axios from "axios";
import React, { useState } from "react";
import { FaCheck, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Forgot password - request OTP via email
const ForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // --- MODAL STATE ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- HANDLERS ---

  // Send OTP to email via backend
  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address.");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      setShowSuccessModal(true); // Show success modal instead of alert
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Error sending OTP");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Close success modal and go to OTP verification
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/verify", { state: { email } });
  };

  // Go back with unsaved email confirmation
  const handleBackClick = () => {
    // If user has typed an email, confirm before leaving
    if (email.length > 0) {
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
        onClick={handleBackClick} // Updated to use confirmation handler
      >
        <IoMdArrowRoundBack size={30} />
      </button>

      {/* Background SVG (Original Layout Preserved) */}
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

      {/* Top Section Icon (Original Layout Preserved) */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <FaLock className="w-auto h-50 text-primary" />
      </div>

      {/* Content Area (Original Layout Preserved) */}
      <div className="relative grow flex flex-col">
        <div className="w-full max-w-sm mx-auto mt-6">
          <h1 className="text-3xl text-secondary mt-30 mb-8 font-serif uppercase tracking-tight text-center">
            Forgot Password
          </h1>
          <p className="text-secondary text-center max-w-md mx-auto pb-5">
            Enter your email address and we'll send you a OTP to reset your
            password.
          </p>

          <div className="mb-4">
            <InputField
              type="email"
              placeholder="Enter your email"
              icon={<MdEmail />}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <PrimaryButton
            content={loading ? "Sending..." : "Send OTP"}
            bgColorClass="bg-secondary"
            colorClass="text-primary"
            hoverBgColorClass="hover:bg-primary hover:text-secondary"
            onClick={handleSendOtp}
          />
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. SUCCESS MODAL */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Email Sent"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={handleSuccessClose}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <FaCheck /> Verify Now
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-3xl text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">
            OTP Sent Successfully!
          </h3>
          <p className="text-primary/70">
            We have sent a verification code to <strong>{email}</strong>. Please
            check your inbox.
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
              className="px-8 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center text-center p-4">
          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">
            Failed to Send OTP
          </h3>
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
              className="flex-1 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10"
            >
              Stay
            </button>
            <button
              onClick={() => navigate("/LandPage")}
              className="flex-1 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 shadow-md hover:shadow-lg"
            >
              Yes, Leave
            </button>
          </div>
        }
      >
        <div className="text-center p-4">
          <p className="text-lg text-primary">
            You have entered an email but haven't sent the OTP yet. Are you sure
            you want to go back?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPass;
