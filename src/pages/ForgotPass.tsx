import { FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { useNavigate } from "react-router-dom";
// import CheckBox from "@/components/CheckBox";

function ForgotPass() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden relative">
      {/* Back Button - Top Right */}
      <button
        className="absolute top-6 left-6 z-50 text-primary hover:opacity-80 transition-opacity"
        onClick={() => window.history.back()} // Optional: adds simple back functionality
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

      {/* Top Section (Icon) */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <FaLock className="w-auto h-50 text-primary" />
      </div>

      {/* The Curve Section / Content Area */}
      <div className="relative grow flex flex-col">
        <div className="w-full max-w-sm mx-auto mt-6">
          <h1 className="text-3xl text-secondary mt-30 mb-8 font-serif uppercase tracking-tight text-center">
            Forgot Password
          </h1>
          <p className="text-secondary text-center max-w-md mx-auto pb-5">
            Enter your email address and we'll send you a OTP to reset your
            password.
          </p>
          <InputField
            type="email"
            placeholder="Enter your email"
            icon={<MdEmail />}
          />
          <PrimaryButton
            content="Send OTP"
            bgColorClass="bg-secondary"
            colorClass="text-primary"
            hoverBgColorClass="hover:bg-primary hover:text-secondary"
            onClick={() => navigate("/verify")}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
