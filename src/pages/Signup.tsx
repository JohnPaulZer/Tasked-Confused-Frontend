import axios from "axios";
import { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Import Custom Components
import CheckBox from "@/components/CheckBox";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { TermsModal, PrivacyModal } from "../utils/LegalModals"; 
import Modal from "@/components/Modal"; 
import Logo from "../images/Logo.png";

axios.defaults.withCredentials = true;

function Signup() {
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- AGREEMENT STATE ---
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  
  // --- MODAL VISIBILITY STATES ---
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- GENERIC ERROR/INFO MODAL STATE ---
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Validation State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Derived state
  const allAgreementsAccepted = agreedToTerms && agreedToPrivacy;
  const isFormValid = !loading && !emailError && !passwordError && allAgreementsAccepted && name && email && password && confirmPassword;

  // --- HELPER: SHOW ERROR MODAL ---
  const showError = (title: string, message: string) => {
    setInfoModal({ isOpen: true, title, message });
  };

  // --- 1. EMAIL VALIDATION LOGIC ---
  useEffect(() => {
    if (!email) {
      setEmailError("");
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          { email: email }
        );
        if (response.data.exists) setEmailError("This email is already registered.");
        else setEmailError("");
      } catch (error) {
        console.error("Email check failed", error);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  // --- 2. PASSWORD VALIDATION LOGIC ---
  const validatePassword = (val: string) => {
    setPassword(val);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!passwordRegex.test(val)) {
      setPasswordError("8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars.");
    } else {
      setPasswordError("");
    }
  };

  // --- HANDLE CHECKBOX CLICK ---
  const handleCheckboxClick = () => {
    if (allAgreementsAccepted) {
      setAgreedToTerms(false);
      setAgreedToPrivacy(false);
    } else {
      if (!agreedToTerms) setShowTermsModal(true);
      else if (!agreedToPrivacy) setShowPrivacyModal(true);
    }
  };

  // --- HANDLE SUCCESS CLOSE ---
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/LandPage"); 
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return showError("Validation Error", "Please fix the highlighted errors in the form.");
    }
    if (password !== confirmPassword) {
      return showError("Password Mismatch", "The passwords you entered do not match.");
    }
    if (!allAgreementsAccepted) {
      return showError("Agreement Required", "You must read and agree to the Terms & Conditions and Privacy Policy to continue.");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowSuccessModal(true); 
      }
    } catch (error: any) {
      console.error("Signup Error:", error);
      const errorMessage = error.response?.data?.message || "Connection failed. Please check your internet connection.";
      showError("Signup Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden">
      {/* Top Section */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-auto h-64 object-contain" />
      </div>

      {/* The Curve Section */}
      <div className="relative flex-grow flex flex-col">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 412 690" fill="none" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.16937 43.1118C44.3306 181.112 296.434 -67.5257 432.331 18.6118C568.227 104.749 546.727 606.974 410.831 693.112C274.934 779.249 134.727 779.249 -1.16937 693.112C-137.066 606.974 -46.6694 -94.8882 -1.16937 43.1118Z" fill="#CDB885" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-8 flex flex-col items-center justify-center px-6 pb-12 md:mt-4">
          <h1 className="text-3xl text-primary mt-18 mb-8 font-serif font-bold uppercase tracking-tight text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
            <div className="w-full flex flex-col">
              <InputField type="text" placeholder="Name" icon={<FaUser />} value={name} onChange={(e) => setName(e.target.value)} />
              
              <div className="flex flex-col">
                <InputField type="email" placeholder="Email" icon={<MdEmail className={emailError ? "text-red-500" : ""} />} value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} />
                {emailError && <div className="flex items-center gap-1 -mt-3 mb-2 text-red-500 text-xs font-bold pl-2"><MdError /><span>{emailError}</span></div>}
              </div>

              <div className="flex flex-col">
                <InputField type="password" placeholder="Password" icon={<FaLock className={passwordError ? "text-red-500" : ""} />} value={password} onChange={(e) => validatePassword(e.target.value)} error={!!passwordError} />
                {passwordError && <div className="flex items-start gap-1 -mt-3 mb-2 text-red-500 text-xs font-bold pl-2"><MdError className="mt-0.5 min-w-[12px]" /><span>{passwordError}</span></div>}
              </div>

              <InputField type="password" placeholder="Confirm Password" icon={<FaLock />} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className="w-full mt-4">
              <div onClick={handleCheckboxClick} className="inline-block cursor-pointer">
                <CheckBox
                  id="agree"
                  checked={allAgreementsAccepted} 
                  onChange={() => {}} 
                  label={
                    <span className="select-none">
                      I agree to the{" "}
                      <button type="button" onClick={(e) => { e.stopPropagation(); setShowTermsModal(true); }} className={`font-bold hover:underline ${agreedToTerms ? 'text-green-700' : 'text-primary'}`}>Terms & Conditions</button>{" "}
                      and{" "}
                      <button type="button" onClick={(e) => { e.stopPropagation(); setShowPrivacyModal(true); }} className={`font-bold hover:underline ${agreedToPrivacy ? 'text-green-700' : 'text-primary'}`}>Privacy Policy</button>
                    </span>
                  }
                />
              </div>
            </div>

            {/* 👇 FIXED BUTTON SECTION */}
            <div className={`w-full mt-6 transition-opacity duration-300 ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}>
               {/* Instead of wrapping PrimaryButton in another button, 
                  we pass the props directly to PrimaryButton.
               */}
               <PrimaryButton 
                  content={loading ? "Checking..." : "Sign Up"}
                  type="submit"
                  widthClass="w-full"
                  // If PrimaryButton supports 'disabled' prop, pass it here. 
                  // If not, we rely on the parent div's pointer-events or add the prop to PrimaryButton component.
               />
            </div>

          </form>

          <p className="mt-10 text-sm">
            Already have an account?
            <a href="/LandPage" className="text-primary font-bold pl-1 hover:underline">Log In</a>
          </p>
        </div>
      </div>

      {/* --- LEGAL MODALS --- */}
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
        onAgree={() => {
            setAgreedToTerms(true);
            if (!agreedToPrivacy) setShowPrivacyModal(true);
        }} 
      />

      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
        onAgree={() => setAgreedToPrivacy(true)} 
      />

      {/* --- SUCCESS MODAL --- */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Success!"
        footer={
          <div className="flex justify-center w-full">
            <button 
              onClick={handleSuccessClose}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md w-full"
            >
              Go to Login
            </button>
          </div>
        }
      >
        <p className="text-center text-lg text-primary/80">
          Account created successfully! <br/> Please log in to continue.
        </p>
      </Modal>

      {/* --- GENERIC INFO/ERROR MODAL --- */}
      <Modal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        title={infoModal.title}
        footer={
          <div className="flex justify-center w-full">
            <button 
              onClick={() => setInfoModal({ ...infoModal, isOpen: false })}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Okay
            </button>
          </div>
        }
      >
        <p className="text-center text-lg text-primary/80">
          {infoModal.message}
        </p>
      </Modal>

    </div>
  );
}

export default Signup;