import React, { useEffect, useState } from "react";
import PasswordChangeSection from "../auth/PasswordChangeSection";
import Modal from "../common/Modal";
import ConfirmationOverlay from "../modals/ConfirmationOverlay";
import ProfileDetailsSection from "../profile/ProfileDetailsSection";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileModalFooter from "../profile/ProfileModalFooter";

interface ProfileData {
  username: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
}

interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<ProfileData>;
  onSave: (data: ProfileData, passwordData?: PasswordData) => Promise<void>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- CONFIRMATION STATE ---
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<"CLOSE" | "CANCEL" | null>(
    null,
  );

  // --- FORM DATA ---
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    ...initialData,
  });

  const [originalData, setOriginalData] = useState<ProfileData>(formData);

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwords, setPasswords] = useState<PasswordData>({
    current: "",
    new: "",
    confirm: "",
  });

  // Validation State for Password
  const [passwordError, setPasswordError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      const startData: ProfileData = {
        username: initialData?.username || "",
        mobile: initialData?.mobile || "",
        email: initialData?.email || "",
        gender: initialData?.gender || "Male",
        address: initialData?.address || "",
      };
      setFormData(startData);
      setOriginalData(startData);
      setIsEditing(false);
      setShowConfirm(false);
      setPendingAction(null);
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswordSection(false);
      setIsSaving(false);
      setPasswordError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Check if form is "Dirty" (Changed)
  const hasUnsavedChanges = () => {
    const dataChanged =
      JSON.stringify(formData) !== JSON.stringify(originalData);
    const passwordChanged = passwords.new.length > 0;
    return dataChanged || passwordChanged;
  };

  // --- PASSWORD VALIDATION & STRENGTH ---
  const validatePassword = (val: string) => {
    setPasswords((prev) => ({ ...prev, new: val }));
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (!passwordRegex.test(val)) {
      setPasswordError(
        "8-16 chars, 1 Upper, 1 Lower, 1 Number, NO special chars.",
      );
    } else {
      setPasswordError("");
    }
  };

  // --- HANDLERS ---

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelClick = () => {
    if (hasUnsavedChanges()) {
      setPendingAction("CANCEL");
      setShowConfirm(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleAttemptClose = () => {
    if (isSaving) return;

    if (isEditing && hasUnsavedChanges()) {
      setPendingAction("CLOSE");
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmDiscard = () => {
    if (pendingAction === "CLOSE") {
      onClose();
    } else if (pendingAction === "CANCEL") {
      setFormData(originalData);
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordError("");
      setIsEditing(false);
    }
    setShowConfirm(false);
  };

  const handleSave = async () => {
    if (showPasswordSection) {
      if (passwordError) {
        alert("Please fix the password errors before saving.");
        return;
      }
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        alert("Please fill in all password fields.");
        return;
      }
      if (passwords.new !== passwords.confirm) {
        alert("New passwords do not match!");
        return;
      }
    }

    setIsSaving(true);

    try {
      await onSave(formData, showPasswordSection ? passwords : undefined);
      setIsEditing(false);
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordError("");
      setShowPasswordSection(false);
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleAttemptClose}
      title={isEditing ? "Edit Profile" : "My Profile"}
      footer={
        <ProfileModalFooter
          isEditing={isEditing}
          isSaving={isSaving}
          passwordError={passwordError}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancelClick}
          onSave={handleSave}
        />
      }
    >
      <div className="flex flex-col w-full max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 relative">
        {/* --- CONFIRMATION OVERLAY --- */}
        <ConfirmationOverlay
          isOpen={showConfirm}
          onKeepEditing={() => setShowConfirm(false)}
          onDiscard={confirmDiscard}
        />

        {/* ================= HEADER SECTION ================= */}
        <ProfileHeader />

        {/* ================= DETAILS SECTION ================= */}
        <ProfileDetailsSection
          isEditing={isEditing}
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* ================= PASSWORD SECTION ================= */}
        <PasswordChangeSection
          isEditing={isEditing}
          showPasswordSection={showPasswordSection}
          onTogglePasswordSection={() =>
            setShowPasswordSection(!showPasswordSection)
          }
          passwords={passwords}
          onPasswordChange={handlePasswordChange}
          passwordError={passwordError}
          validatePassword={validatePassword}
        />
      </div>
    </Modal>
  );
};

export default ProfileModal;
