import Logo from "../images/Logo.png";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareGithub } from "react-icons/fa6";
import CheckBox from "@/components/CheckBox";

function Home() {
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden">
      {/* Top Section (Brown background) */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-auto h-64 object-contain" />
      </div>

      {/* The Curve Section */}
      <div className="relative flex-grow flex flex-col">
        {/* Your Custom SVG as a Background */}
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

        {/* Content Container (Layered on top of SVG) */}
        <div className="relative z-10 flex flex-col items-center justify-center mx-6 pb-12 mt-4">
          <h1 className="text-3xl text-primary mt-18 mb-8 font-serif font-bold uppercase tracking-tight text-center">
            Sign In Your Account
          </h1>

        <div className="w-full max-w-sm"> 
          {/* Email input */}
                  <InputField
                    type="email"
                    placeholder="Email"
                    icon={<MdEmail />}
                  />

                  {/* Password input */}
                  <InputField
                    type="password"
                    placeholder="Password"
                    icon={<FaLock />}
                  />
        </div>
         
          <div className="w-full max-w-sm flex items-center justify-between">
            <CheckBox
              id="remember"
              label="Remember me"
            />

            <a href="/forgot" className="text-sm text-primary opacity-80 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="w-full max-w-sm">
            <PrimaryButton content="Log In" />
          </div>

          <p className="text-primary text-sm opacity-70 my-6">Or sign in with</p>

          <div className="flex items-center justify-center gap-8">
            <button className="text-4xl hover:opacity-80 transition-opacity">
              <FcGoogle/>
            </button>          
            <button className="text-4xl hover:opacity-80 transition-opacity" style={{ color: "#1877F2" }}>
              <ImFacebook2 />
            </button>
            <button className="text-4xl hover:opacity-80 transition-opacity">
              <FaSquareGithub />
            </button>
          </div>

          <p className="mt-10 text-sm">
            Dont have an account?
            <a href="/signup" className="text-primary font-bold pl-1 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;