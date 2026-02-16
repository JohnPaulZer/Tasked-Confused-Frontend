import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;           // Controls if modal is visible
  onClose: () => void;       // Function to close the modal
  title?: string;            // Header text
  children: React.ReactNode; // Body text or inputs
  footer?: React.ReactNode;  // Place for your 1 or 2 buttons
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  // If not open, render nothing
  if (!isOpen) return null;

  return (
    // 1. OVERLAY (Backdrop)
    // - fixed inset-0: Covers entire screen
    // - bg-black/40: Darkens the background slightly
    // - backdrop-blur-sm: BLURS the background
    // - z-50: Ensures it sits on top of everything
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Clicking outside closes the modal
    >
      {/* 2. MODAL CARD */}
      <div 
        className="bg-secondary w-11/12 max-w-md rounded-3xl p-6 shadow-2xl border-2 border-primary relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // Clicking inside does NOT close it
      >
        {/* Close Icon (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-primary text-2xl hover:opacity-70"
        >
          <IoClose />
        </button>

        {/* Header */}
        {title && (
          <h2 className="text-2xl font-serif font-bold text-primary mb-4 text-center">
            {title}
          </h2>
        )}

        {/* Body Content */}
        <div className="text-primary/80 font-serif text-center mb-6">
          {children}
        </div>

        {/* Footer (Buttons) */}
        {/* This container handles the layout for 1 or 2 buttons */}
        {footer && (
          <div className="flex gap-4 justify-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;