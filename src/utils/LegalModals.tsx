import React from "react";
import Modal from "../components/Modal";

// --- 1. STATIC LEGAL CONTENT ---
const TERMS_CONTENT = (
  <div className="space-y-4 text-justify text-primary/80">
    <p><strong>1. Introduction</strong><br/>Welcome to Tasked & Confused. By using our website, you agree to these terms.</p>
    <p><strong>2. User Accounts</strong><br/>You are responsible for maintaining the security of your account and password. The application cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</p>
    <p><strong>3. Acceptable Use</strong><br/>You must not use the service for any illegal or unauthorized purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.</p>
    <p><strong>4. Termination</strong><br/>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever.</p>
  </div>
);

const PRIVACY_CONTENT = (
  <div className="space-y-4 text-justify text-primary/80">
    <p><strong>1. Data Collection</strong><br/>We collect your name and email address to provide the service. We do not sell your personal data to third parties.</p>
    <p><strong>2. Cookies</strong><br/>We use cookies to maintain your login session. By using our site, you consent to the use of cookies.</p>
    <p><strong>3. Data Security</strong><br/>We implement a variety of security measures to maintain the safety of your personal information.</p>
  </div>
);

// --- 2. INTERFACE FOR PROPS ---
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

// --- 3. EXPORTABLE COMPONENTS ---

export const TermsModal: React.FC<LegalModalProps> = ({ isOpen, onClose, onAgree }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terms & Conditions"
      footer={
        <div className="flex justify-center w-full">
          <button 
            onClick={() => { onAgree(); onClose(); }}
            className="w-full px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
          >
            I Agree to Terms
          </button>
        </div>
      }
    >
      <div className="h-auto overflow-y-auto pr-2 text-sm scrollbar-thin scrollbar-thumb-primary/20">
        {TERMS_CONTENT}
      </div>
    </Modal>
  );
};

export const PrivacyModal: React.FC<LegalModalProps> = ({ isOpen, onClose, onAgree }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy Policy"
      footer={
        <div className="flex justify-center w-full">
          <button 
            onClick={() => { onAgree(); onClose(); }}
            className="w-full px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
          >
            I Agree to Privacy Policy
          </button>
        </div>
      }
    >
      <div className="h-auto overflow-y-auto pr-2 text-sm scrollbar-thin scrollbar-thumb-primary/20">
        {PRIVACY_CONTENT}
      </div>
    </Modal>
  );
};