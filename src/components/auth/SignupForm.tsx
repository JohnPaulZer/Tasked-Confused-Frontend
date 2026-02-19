import React from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdError } from "react-icons/md";
import CheckBox from "../common/CheckBox";
import InputField from "../common/InputField";
import PasswordStrengthIndicator from "../common/PasswordStrengthIndicator";

interface SignupFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  emailError: string;
  passwordError: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  isFormValid: boolean;
  loading: boolean;
  strength: {
    width: string;
    color: string;
    label: string;
    textColor: string;
  };
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onCheckboxClick: () => void;
  onTermsClick: () => void;
  onPrivacyClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  name,
  email,
  password,
  confirmPassword,
  emailError,
  passwordError,
  agreedToTerms,
  agreedToPrivacy,
  isFormValid,
  loading,
  strength,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onCheckboxClick,
  onTermsClick,
  onPrivacyClick,
  onSubmit,
}) => {
  const allAgreementsAccepted = agreedToTerms && agreedToPrivacy;

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <div className="w-full flex flex-col">
          {/* Name Input */}
          <InputField
            type="text"
            placeholder="Name"
            icon={<FaUser />}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />

          {/* Email Input */}
          <div className="flex flex-col">
            <InputField
              type="email"
              placeholder="Email"
              icon={<MdEmail className={emailError ? "text-red-500" : ""} />}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              error={!!emailError}
              required
            />
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
              onChange={(e) => onPasswordChange(e.target.value)}
              error={!!passwordError}
            />

            {/* Strength Indicator */}
            <PasswordStrengthIndicator
              password={password}
              strength={strength}
            />

            {/* Password Error */}
            {passwordError && (
              <div className="flex items-start gap-1 -mt-1 mb-2 text-red-500 text-xs font-bold pl-2">
                <MdError className="mt-0.5 min-w-[12px]" />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <InputField
            type="password"
            placeholder="Confirm Password"
            icon={<FaLock />}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
        </div>

        {/* Terms & Privacy Checkbox */}
        <div className="w-full mt-4">
          <div
            onClick={onCheckboxClick}
            className="inline-block cursor-pointer"
          >
            <CheckBox
              id="agree"
              checked={allAgreementsAccepted}
              onChange={() => {}}
              label={
                <span className="select-none">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTermsClick();
                    }}
                    className={`font-bold hover:underline ${
                      agreedToTerms ? "text-green-700" : "text-primary"
                    }`}
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrivacyClick();
                    }}
                    className={`font-bold hover:underline ${
                      agreedToPrivacy ? "text-green-700" : "text-primary"
                    }`}
                  >
                    Privacy Policy
                  </button>
                </span>
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <div
          className={`w-full mt-6 transition-opacity duration-300 ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-3 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-sm">
        Already have an account?
        <a
          href="/LandPage"
          className="text-primary font-bold pl-1 hover:underline"
        >
          Log In
        </a>
      </p>
    </>
  );
};

export default SignupForm;
