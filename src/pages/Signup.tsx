import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdError } from "react-icons/md";

// Import your custom components
import CheckBox from "@/components/CheckBox";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import Logo from "../images/Logo.png";

function Signup() {
  const navigate = useNavigate();

  // --- STATE ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 1. EMAIL VALIDATION LOGIC (Debounced) ---
  useEffect(() => {
    // Don't check if email is empty
    if (!email) {
      setEmailError("");
      return;
    }

    // Set a timer to check 500ms after user stops typing
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/check-email", {
          email: email,
        });

        if (response.data.exists) {
          setEmailError("This email is already registered.");
        } else {
          setEmailError("");
        }
      } catch (error) {
        console.error("Email check failed", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  // --- 2. PASSWORD VALIDATION LOGIC ---
  const validatePassword = (val: string) => {
    setPassword(val);

    // Regex: 8-16 chars, 1 Upper, 1 Lower, 1 Number, No special chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (!passwordRegex.test(val)) {
      setPasswordError(
        "8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars."
      );
    } else {
      setPasswordError("");
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final Validation Check before sending
    if (emailError || passwordError) {
      alert("Please fix the errors in the form.");
      return;
    }
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("✅ Account created successfully! Please log in.");
        navigate("/LandPage");
      }
    } catch (error: any) {
      console.error("Signup Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ Connection failed. Is the backend running?";
      alert(errorMessage);
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
              
              {/* Name Input */}
              <InputField
                type="text"
                placeholder="Name"
                icon={<FaUser />}
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />

              {/* Email Input */}
              <div className="flex flex-col">
                <InputField
                  type="email"
                  placeholder="Email"
                  icon={<MdEmail className={emailError ? "text-red-500" : ""} />}
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  error={!!emailError} // Pass the error boolean
                />
                
                {/* Email Error Message */}
                {emailError && (
                  <div className="flex items-center gap-1 -mt-3 mb-2 text-red-500 text-xs font-bold pl-2">
                    <MdError />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <InputField
                  type="password"
                  placeholder="Password"
                  icon={<FaLock className={passwordError ? "text-red-500" : ""} />}
                  value={password}
                  onChange={(e: any) => validatePassword(e.target.value)}
                  error={!!passwordError} // Pass the error boolean
                />

                {/* Password Error Message */}
                {passwordError && (
                  <div className="flex items-start gap-1 -mt-3 mb-2 text-red-500 text-xs font-bold pl-2">
                    <MdError className="mt-0.5 min-w-[12px]" />
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <InputField
                type="password"
                placeholder="Confirm Password"
                icon={<FaLock />}
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Checkbox */}
            <div className="w-full mt-4">
              <CheckBox
                id="agree"
                label={
                  <>
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a>
                    {" "}and{" "}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </>
                }
              />
            </div>

            {/* Submit Button */}
            <div className="w-full mt-6">
              <button 
                type="submit" 
                className={`w-full transition-opacity ${loading || emailError || passwordError ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={loading || !!emailError || !!passwordError}
              >
                <PrimaryButton content={loading ? "Checking..." : "Sign Up"} />
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm">
            Already have an account?
            <a href="/LandPage" className="text-primary font-bold pl-1 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;