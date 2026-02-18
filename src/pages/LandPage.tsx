import CheckBox from "@/components/CheckBox";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { MdCheckCircle, MdEmail, MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

axios.defaults.withCredentials = true;

/**
 * LAND PAGE - User Login Page
 *
 * This is the public landing/login page for unauthenticated users
 * Features:
 * - Email and password authentication
 * - Remember me functionality (30-day session)
 * - Auto-redirect if user already logged in
 * - Real-time validation and error handling
 * - Notification system for success/error messages
 *
 * User Flow:
 * 1. On mount: Check if user is already authenticated
 * 2. If authenticated: Auto-redirect to MainPage
 * 3. If not: Show login form
 * 4. On submit: Validate credentials with backend
 * 5. On success: Store user data and redirect
 * 6. On error: Display error notification
 */
function LandPage() {
  const navigate = useNavigate();

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  /**
   * Email state - loads from localStorage if remember-me was enabled
   */
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("rememberedEmail") || "";
  });

  /**
   * Password state - NOT stored in localStorage for security reasons
   */
  const [password, setPassword] = useState("");

  /**
   * Remember-me checkbox state - determines session length
   * True = 30 days, False = 1 day
   */
  const [rememberMe, setRememberMe] = useState(() => {
    return !!localStorage.getItem("rememberedEmail");
  });

  /**
   * Notification state - displays success/error messages to user
   * Type can be: "success" | "error" | null
   */
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * AUTH CHECK EFFECT
   * Runs on component mount to verify if user is already authenticated
   * If user is logged in, automatically redirects to MainPage
   */
  useEffect(() => {
    // Security: Remove any accidentally stored passwords
    if (localStorage.getItem("rememberedPassword")) {
      localStorage.removeItem("rememberedPassword");
      console.log("Security cleanup: Removed exposed password from storage.");
    }

    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    /**
     * Check if user session is still valid by attempting to fetch tasks
     * This verifies the JWT token in cookies is not expired
     */
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          withCredentials: true,
        });
        if (response.status === 200) {
          // User is authenticated, redirect to dashboard
          navigate("/MainPage");
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
          // Token expired, clear stored user data
          localStorage.removeItem("user");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  /**
   * HANDLE SUBMIT - Process login form submission
   *
   * Steps:
   * 1. Prevent default form submission
   * 2. Send credentials to backend
   * 3. If successful:
   *    - Store user data in localStorage
   *    - Handle remember-me preference
   *    - Show success notification
   *    - Redirect to MainPage after 1.5s
   * 4. If failed: Display error notification
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          rememberMe,
        },
      );

      if (response.status === 200) {
        // --- STORE EMAIL IF REMEMBER-ME IS ENABLED ---
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Show success notification
        setNotification({
          message: "Login Successful! Redirecting...",
          type: "success",
        });

        // Store user profile data (NOT secrets like password)
        // This includes: _id, name, email, gender, mobile, address
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect after showing notification
        setTimeout(() => {
          navigate("/MainPage");
        }, 1500);
      }
    } catch (error: unknown) {
      // Extract error message from backend response
      const axiosError = error as AxiosError<{ message: string }> | null;
      const errorMsg =
        axiosError?.response?.data?.message || "Invalid email or password.";
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
      <div className="relative grow flex flex-col">
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
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                type="password"
                placeholder="Password"
                icon={<FaLock aria-label="show" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
              <PrimaryButton
                content="Log In"
                type="submit"
                widthClass="w-full"
              />
            </div>
          </form>

          <p className="text-primary text-sm opacity-70 my-6">
            Or sign in with
          </p>

          <div className="flex items-center justify-center gap-8">
            <button
              className="text-4xl hover:opacity-80"
              aria-label="Sign in with Google"
            >
              <FcGoogle />
            </button>
            <button
              className="text-4xl hover:opacity-80"
              style={{ color: "#1877F2" }}
              aria-label="Sign in with Facebook"
            >
              <ImFacebook2 />
            </button>
            <button
              className="text-4xl hover:opacity-80"
              aria-label="Sign in with GitHub"
            >
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
