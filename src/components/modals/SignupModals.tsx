import React from "react";
import { PrivacyModal, TermsModal } from "../../utils/helpers/LegalModals";
import Modal from "../common/Modal";

interface SignupModalsProps {
  showTermsModal: boolean;
  showPrivacyModal: boolean;
  showSuccessModal: boolean;
  showErrorModal: boolean;
  errorTitle: string;
  errorMessage: string;
  onCloseTerms: () => void;
  onClosePrivacy: () => void;
  onCloseSuccess: () => void;
  onCloseError: () => void;
  onAgreeTerms: () => void;
  onAgreePrivacy: () => void;
  onSuccessAction: () => void;
}

const SignupModals: React.FC<SignupModalsProps> = ({
  showTermsModal,
  showPrivacyModal,
  showSuccessModal,
  showErrorModal,
  errorTitle,
  errorMessage,
  onCloseTerms,
  onClosePrivacy,
  onCloseSuccess,
  onCloseError,
  onAgreeTerms,
  onAgreePrivacy,
  onSuccessAction,
}) => {
  return (
    <>
      {/* Legal Modals */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={onCloseTerms}
        onAgree={onAgreeTerms}
      />

      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={onClosePrivacy}
        onAgree={onAgreePrivacy}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={onCloseSuccess}
        title="Success!"
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={onSuccessAction}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md w-full"
            >
              Go to Login
            </button>
          </div>
        }
      >
        <p className="text-center text-lg text-primary/80">
          Account created successfully! <br /> Please log in to continue.
        </p>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={onCloseError}
        title={errorTitle}
        footer={
          <div className="flex justify-center w-full">
            <button
              onClick={onCloseError}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Okay
            </button>
          </div>
        }
      >
        <p className="text-center text-lg text-primary/80">{errorMessage}</p>
      </Modal>
    </>
  );
};

export default SignupModals;
