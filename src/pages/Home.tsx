import PrimaryButton from "@/components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";

function LandPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0 pt-64">
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
      <div>
        <h1 className="text-5xl text-secondary font-serif text-center h-64 flex items-center justify-center">
          Welcome!
        </h1>
      </div>
      <div className="relative flex-grow flex flex-col">
        
        <div className="relative z-10 w-full flex items-center justify-center">
          <img src={Logo} alt="Logo" className="mt-20" />
        </div>
        <div className="relative z-10 w-full max-w-sm w-full mx-auto">
          <PrimaryButton
            content="Get Started"
            onClick={() => navigate("/LandPage")}
          />
        </div>
      </div>
    </div>
  );
}

export default LandPage;
