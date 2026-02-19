import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationOverlayProps {
  isOpen: boolean;
  onKeepEditing: () => void;
  onDiscard: () => void;
}

const ConfirmationOverlay: React.FC<ConfirmationOverlayProps> = ({
  isOpen,
  onKeepEditing,
  onDiscard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg animate-fadeIn">
      <div className="bg-white border-2 border-primary p-6 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-[80%]">
        <FaExclamationTriangle className="text-4xl text-orange-500 mb-3" />
        <h3 className="text-xl font-bold text-primary mb-2">Unsaved Changes</h3>
        <p className="text-primary/70 mb-6 text-sm">
          You have unsaved changes. Are you sure you want to discard them?
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onKeepEditing}
            className="flex-1 py-2 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
          >
            Keep Editing
          </button>
          <button
            onClick={onDiscard}
            className="flex-1 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
