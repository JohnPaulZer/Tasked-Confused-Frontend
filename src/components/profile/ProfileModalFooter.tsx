import React from "react";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";

interface ProfileModalFooterProps {
  isEditing: boolean;
  isSaving: boolean;
  passwordError: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const ProfileModalFooter: React.FC<ProfileModalFooterProps> = ({
  isEditing,
  isSaving,
  passwordError,
  onEdit,
  onCancel,
  onSave,
}) => {
  if (isEditing) {
    return (
      <div className="flex gap-3 w-full justify-center">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className={`px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition flex items-center gap-2 ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaTimes /> Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSaving || !!passwordError}
          className={`px-6 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2 ${
            isSaving || !!passwordError ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? (
            "Verifying..."
          ) : (
            <>
              <FaCheck /> Save Changes
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={onEdit}
        className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2"
      >
        <FaPen /> Edit Profile
      </button>
    </div>
  );
};

export default ProfileModalFooter;
