import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Custom Components
import SignupForm from "@/components/auth/SignupForm";
import SignupHeader from "@/components/auth/SignupHeader";
import SignupModals from "@/components/modals/SignupModals";

// Import Hooks
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import { useSignupValidation } from "@/hooks/useSignupValidation";

axios.defaults.withCredentials = true;

// User registration page with form validation and agreement checks
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
  const [showErrorModal, setShowErrorModal] = useState(false);

  // --- ERROR/INFO MODAL STATE ---
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // --- VALIDATION & LOADING ---
  const [loading, setLoading] = useState(false);
  const { emailError, passwordError, validateEmail, handlePasswordChange } =
    useSignupValidation();

  // --- PASSWORD STRENGTH ---
  const strength = usePasswordStrength(password);

  // --- DERIVED STATE ---
  const allAgreementsAccepted = agreedToTerms && agreedToPrivacy;
  const isFormValid =
    !loading &&
    !emailError &&
    !passwordError &&
    allAgreementsAccepted &&
    !!name &&
    !!email &&
    !!password &&
    !!confirmPassword;

  // Show error modal with title and message
  const showError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  // Toggle terms and privacy agreement checkboxes
  const handleCheckboxClick = () => {
    if (allAgreementsAccepted) {
      setAgreedToTerms(false);
      setAgreedToPrivacy(false);
    } else {
      if (!agreedToTerms) setShowTermsModal(true);
      else if (!agreedToPrivacy) setShowPrivacyModal(true);
    }
  };

  // Close success modal and redirect to login page
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/LandPage", { state: { from: "signup", email } });
  };

  // Submit signup form with validation and API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return showError(
        "Validation Error",
        "Please fix the highlighted errors in the form.",
      );
    }
    if (password !== confirmPassword) {
      return showError(
        "Password Mismatch",
        "The passwords you entered do not match.",
      );
    }
    if (!allAgreementsAccepted) {
      return showError(
        "Agreement Required",
        "You must read and agree to the Terms & Conditions and Privacy Policy to continue.",
      );
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password },
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      const errorMsg =
        (error instanceof Error && error.message) ||
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Connection failed. Please check your internet connection.";
      showError("Signup Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden">
      {/* Top Section with Logo */}
      <SignupHeader />

      {/* The Curve Section */}
      <div className="relative flex-grow flex flex-col">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 412 690"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.16937 43.1118C44.3306 181.112 296.434 -67.5257 432.331 18.6118C568.227 104.749 546.727 606.974 410.831 693.112C274.934 779.249 134.727 779.249 -1.16937 693.112C-137.066 606.974 -46.6694 -94.8882 -1.16937 43.1118Z"
              fill="#CDB885"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-8 flex flex-col items-center justify-center px-6 pb-12 md:mt-4">
          <h1 className="text-3xl text-primary mt-18 mb-8 font-serif font-bold uppercase tracking-tight text-center">
            Create Your Account
          </h1>

          <SignupForm
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            emailError={emailError}
            passwordError={passwordError}
            agreedToTerms={agreedToTerms}
            agreedToPrivacy={agreedToPrivacy}
            isFormValid={isFormValid}
            loading={loading}
            strength={strength}
            onNameChange={setName}
            onEmailChange={(val) => {
              setEmail(val);
              validateEmail(val);
            }}
            onPasswordChange={(val) => {
              setPassword(val);
              handlePasswordChange(val);
            }}
            onConfirmPasswordChange={setConfirmPassword}
            onCheckboxClick={handleCheckboxClick}
            onTermsClick={() => setShowTermsModal(true)}
            onPrivacyClick={() => setShowPrivacyModal(true)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <SignupModals
        showTermsModal={showTermsModal}
        showPrivacyModal={showPrivacyModal}
        showSuccessModal={showSuccessModal}
        showErrorModal={showErrorModal}
        errorTitle={errorTitle}
        errorMessage={errorMessage}
        onCloseTerms={() => setShowTermsModal(false)}
        onClosePrivacy={() => setShowPrivacyModal(false)}
        onCloseSuccess={handleSuccessClose}
        onCloseError={() => setShowErrorModal(false)}
        onAgreeTerms={() => {
          setAgreedToTerms(true);
          if (!agreedToPrivacy) setShowPrivacyModal(true);
        }}
        onAgreePrivacy={() => setAgreedToPrivacy(true)}
        onSuccessAction={handleSuccessClose}
      />
    </div>
  );
}

export default Signup;
