import React from "react";
import Modal from "../components/Modal";

// --- 1. STATIC LEGAL CONTENT ---
const TERMS_CONTENT = (
  <div className="space-y-4 text-justify text-primary/80">
    <section>
      <p><strong>1. Introduction</strong><br/>Welcome to Tasked & Confused. By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    </section>

    <section>
      <p><strong>2. User Accounts</strong><br/>You are responsible for maintaining the security of your account and password. The application cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
    </section>

    <section>
      <p><strong>3. Intellectual Property</strong><br/>The Service and its original content, features, and functionality are and will remain the exclusive property of Tasked & Confused and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the owners.</p>
    </section>

    <section>
      <p><strong>4. Acceptable Use</strong><br/>You must not use the service for any illegal or unauthorized purpose. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>
    </section>

    <section>
      <p><strong>5. Limitation of Liability</strong><br/>In no event shall Tasked & Confused, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
    </section>

    <section>
      <p><strong>6. Governing Law</strong><br/>These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.</p>
    </section>

    <section>
      <p><strong>7. Termination</strong><br/>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
    </section>
  </div>
);
const PRIVACY_CONTENT = (
  <div className="space-y-4 text-justify text-primary/80">
    <section>
      <p><strong>1. Data Collection</strong><br/>We collect personal information that you voluntarily provide to us when you register on the website. This includes your name, email address, and any profile information. We also automatically collect certain information when you visit, such as your IP address and browser characteristics.</p>
    </section>

    <section>
      <p><strong>2. Use of Your Information</strong><br/>We use the information we collect to provide, operate, and maintain our website, to improve and personalize your experience, and to communicate with you about updates or security notices.</p>
    </section>

    <section>
      <p><strong>3. Cookies and Tracking</strong><br/>We use cookies to maintain your login session and understand how you interact with our service. You can instruct your browser to refuse all cookies, but some portions of the Service may become inaccessible.</p>
    </section>

    <>
      <p><strong>4. Data Sharing & Disclosure</strong><br/>We do not sell, trade, or rent your personal data to third parties. We may share information with service providers (like hosting or analytics) who perform services for us, provided they comply with strict data protection standards.</p>
    </>

    <section>
      <p><strong>5. Your Data Rights</strong><br/>Depending on your location, you may have the right to access, correct, or delete your personal data. You can exercise these rights by contacting us through your account settings or via our support email.</p>
    </section>

    <section>
      <p><strong>6. Data Security</strong><br/>We implement industry-standard security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
    </section>

    <section>
      <p><strong>7. Changes to This Policy</strong><br/>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
    </section>
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
      <div className="h-150 overflow-y-auto pr-2 text-sm scrollbar-thin scrollbar-thumb-primary/20">
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
      <div className="h-150 overflow-y-auto pr-2 text-sm scrollbar-thin scrollbar-thumb-primary/20">
        {PRIVACY_CONTENT}
      </div>
    </Modal>
  );
};