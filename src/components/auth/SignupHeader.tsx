import React from "react";
import Logo from "../../images/Logo.png";

const SignupHeader: React.FC = () => {
  return (
    <div className="relative z-10 pt-10 flex flex-col items-center">
      <img src={Logo} alt="Logo" className="w-auto h-64 object-contain" />
    </div>
  );
};

export default SignupHeader;
