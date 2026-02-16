import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { MdCheckCircle, MdEmail, MdError } from "react-icons/md";

// Components
import CheckBox from "@/components/CheckBox";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import Logo from "../images/Logo.png";

axios.defaults.withCredentials = true;

function LandPage() {
  const navigate = useNavigate();

  // --- 1. STATE INITIALIZATION ---
  
  // ✅ SAFE: It is okay to remember the Email for convenience.
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("rememberedEmail") || "";
  });

  // 🔒 SECURE: NEVER load password from LocalStorage. Always start empty.
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(() => {
    return !!localStorage.getItem("rememberedEmail");
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  // --- 2. SECURITY CLEANUP & AUTH CHECK ---
  useEffect(() => {
    // 🚨 IMPORTANT: Force delete the exposed password from previous versions
    if (localStorage.getItem("rememberedPassword")) {
        localStorage.removeItem("rememberedPassword");
        console.log("Security cleanup: Removed exposed password from storage.");
    }

    // Auth Check Logic
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", { withCredentials: true });
        if (response.status === 200) {
          navigate("/MainPage");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
           localStorage.removeItem("user"); 
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ message: "", type: null });

    try {
      // We send 'rememberMe' to the backend so it can set the Cookie expiration logic
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { 
            email, 
            password,
            rememberMe 
        }
      );

      if (response.status === 200) {
        // --- 3. SECURE STORAGE LOGIC ---
        if (rememberMe) {
          // ✅ Only store non-sensitive data (Email)
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // 🛑 CRITICAL: We do NOT save the password here anymore.
        // The secure HTTP-Only cookie from the backend handles the session.

        setNotification({
          message: "Login Successful! Redirecting...",
          type: "success",
        });

        // Store user profile (Name, ID) but NOT secrets
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/MainPage");
        }, 1500);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid email or password.";
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden relative">
      {/* Notification Banner */}
      {notification.type && (
        <div
          className={`w-90 px-6 py-4 fixed top-5 left-1/2 transform -translate-x-1/2 z-50 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {notification.type === "success" ? (
            <MdCheckCircle size={20} />
          ) : (
            <MdError size={20} />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pt-64 pointer-events-none">
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

      {/* Top Section */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-auto h-64 object-contain" />
      </div>

      {/* Login Form Section */}
      <div className="relative flex-grow flex flex-col">
        <div className="relative z-10 flex flex-col items-center justify-center mx-6 pb-12 mt-4">
          <h1 className="text-3xl text-primary mt-18 mb-8 font-serif font-bold uppercase tracking-tight text-center">
            Sign In Your Account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full max-w-sm">
              <InputField
                type="email"
                placeholder="Email"
                icon={<MdEmail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                type="password"
                placeholder="Password"
                icon={<FaLock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full max-w-sm flex items-center justify-between mt-2">
              <CheckBox 
                id="remember" 
                label="Remember me" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <a
                href="/forgot"
                className="text-sm text-primary opacity-80 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <div className="w-full max-w-sm mt-6">
              <PrimaryButton content="Log In" type="submit" widthClass="w-full" />
            </div>
          </form>

          <p className="text-primary text-sm opacity-70 my-6">
            Or sign in with
          </p>

          <div className="flex items-center justify-center gap-8">
            <button className="text-4xl hover:opacity-80 transition-opacity">
              <FcGoogle />
            </button>
            <button
              className="text-4xl hover:opacity-80 transition-opacity"
              style={{ color: "#1877F2" }}
            >
              <ImFacebook2 />
            </button>
            <button className="text-4xl hover:opacity-80 transition-opacity">
              <FaSquareGithub />
            </button>
          </div>

          <p className="mt-10 text-sm">
            Dont have an account?
            <a
              href="/signup"
              className="text-primary font-bold pl-1 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandPage;