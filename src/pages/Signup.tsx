import CheckBox from "@/components/CheckBox";
import Logo from "../images/Logo.png";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function signup() {
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

{/* Content Container */}
        <div className="relative z-10 mt-8 flex flex-col items-center justify-center px-6 pb-12 md:mt-4">
          <h1 className="text-3xl text-primary mt-18 mb-8 font-serif font-bold uppercase tracking-tight text-center">
            Create Your Account
          </h1>

          {/* Form Inputs */}
          <div className="w-full max-w-sm">
            <InputField 
              type="text" 
              placeholder="Name" 
              icon={<FaUser />} 
            />
            
            <InputField 
              type="email" 
              placeholder="Email" 
              icon={<MdEmail />} 
            />

            <InputField
              type="password"
              placeholder="Password"
              icon={<FaLock />}
            />
            
            <InputField
              type="password"
              placeholder="Confirm Password"
              icon={<FaLock />}
            />
          </div>

          {/* Optional: Add your PrimaryButton here once uncommented */}
          {/* <div className="mt-8 w-full max-w-[90%] sm:max-w-md md:max-w-sm">
            <PrimaryButton content="Sign Up" />
          </div> */}

          <CheckBox
            id="agree"
            label={
                <>
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                </a>
                </>
            }
            />
            <div className="w-full max-w-sm">
            <PrimaryButton content="Sign Up" />
          </div>
          <p className="mt-10 text-sm">
            Already have an account?
            <a href="/LandPage" className="text-primary font-bold pl-1 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default signup;