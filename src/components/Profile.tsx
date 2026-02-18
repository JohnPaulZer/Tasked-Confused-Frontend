import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaLock,
  FaMapMarkerAlt,
  FaPen,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputField from "./InputField";
import Modal from "./Modal";

interface ProfileData {
  username: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
}

// 👇 New interface for password state
interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 👇 Changed from 'any' to 'Partial<ProfileData>'
  initialData?: Partial<ProfileData>;
  // 👇 Changed from 'any' to 'PasswordData'
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

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      const startData: ProfileData = {
        username: initialData?.username || initialData?.username || "", // Add .name if backend uses 'name'
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

  // --- HANDLERS ---

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Intercept "Cancel" Button
  const handleCancelClick = () => {
    if (hasUnsavedChanges()) {
      setPendingAction("CANCEL");
      setShowConfirm(true);
    } else {
      setIsEditing(false);
    }
  };

  // 2. Intercept Modal "Close" (X button or Backdrop)
  const handleAttemptClose = () => {
    if (isSaving) return;

    if (isEditing && hasUnsavedChanges()) {
      setPendingAction("CLOSE");
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  // 3. Confirm Discard Action
  const confirmDiscard = () => {
    if (pendingAction === "CLOSE") {
      onClose();
    } else if (pendingAction === "CANCEL") {
      setFormData(originalData);
      setPasswords({ current: "", new: "", confirm: "" });
      setIsEditing(false);
    }
    setShowConfirm(false);
  };

  const handleSave = async () => {
    // 1. Validate Password Fields
    if (showPasswordSection) {
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        alert("Please fill in all password fields.");
        return;
      }
      if (passwords.new !== passwords.confirm) {
        alert("New passwords do not match!");
        return;
      }
      if (passwords.new.length < 6) {
        alert("New password must be at least 6 characters long.");
        return;
      }
    }

    setIsSaving(true);

    try {
      // 2. Call Parent onSave and WAIT for result
      await onSave(formData, showPasswordSection ? passwords : undefined);

      // 3. If successful (no error thrown), close edit mode
      setIsEditing(false);
      setPasswords({ current: "", new: "", confirm: "" });
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
        isEditing ? (
          <div className="flex gap-3 w-full justify-center">
            <button
              onClick={handleCancelClick}
              disabled={isSaving}
              className={`px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition flex items-center gap-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaTimes /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
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
        ) : (
          <div className="w-full flex justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md flex items-center gap-2"
            >
              <FaPen /> Edit Profile
            </button>
          </div>
        )
      }
    >
      <div className="flex flex-col w-full max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 relative">
        {/* --- CONFIRMATION OVERLAY --- */}
        {showConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg animate-fadeIn">
            <div className="bg-white border-2 border-primary p-6 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-[80%]">
              <FaExclamationTriangle className="text-4xl text-orange-500 mb-3" />
              <h3 className="text-xl font-bold text-primary mb-2">
                Unsaved Changes
              </h3>
              <p className="text-primary/70 mb-6 text-sm">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
                >
                  Keep Editing
                </button>
                <button
                  onClick={confirmDiscard}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= HEADER SECTION ================= */}
        <div className="relative mb-16 w-full">
          <div className="relative w-full h-32 rounded-t-xl bg-primary/5 overflow-hidden border-b-4 border-secondary flex items-center justify-center text-primary/40 font-bold">
            No Cover Photo
          </div>
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-secondary bg-primary overflow-hidden shadow-lg flex items-center justify-center text-secondary text-4xl">
              <FaUser />
            </div>
          </div>
        </div>

        {/* ================= DETAILS SECTION ================= */}
        <div className="flex flex-col gap-5 px-2 pb-4 w-full">
          {/* Name */}
          <div className="w-full">
            {isEditing && (
              <label className="text-sm font-bold text-primary ml-1 block mb-1 text-left">
                Full Name
              </label>
            )}
            {isEditing ? (
              <div className="border-2 border-primary/20 rounded-lg bg-secondary w-full">
                <InputField
                  type="text"
                  placeholder="Full Name"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  icon={<FaUser />}
                  name="username"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 text-primary w-full">
                <FaUser className="text-xl opacity-70 shrink-0" />
                <span className="text-xl font-bold font-serif break-all">
                  {formData.username || "No Name Set"}
                </span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            {isEditing && (
              <label className="text-sm font-bold text-primary ml-1 block mb-1 text-left">
                Email Address
              </label>
            )}
            {isEditing ? (
              <div className="border-2 border-primary/20 rounded-lg bg-secondary w-full">
                <InputField
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  icon={<MdEmail />}
                  name="email"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 text-primary w-full">
                <MdEmail className="text-xl opacity-70 shrink-0" />
                <span className="font-serif opacity-90 break-all">
                  {formData.email}
                </span>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="w-full">
            {isEditing && (
              <label className="text-sm font-bold text-primary ml-1 block mb-1 text-left">
                Mobile Number
              </label>
            )}
            {isEditing ? (
              <div className="border-2 border-primary/20 rounded-lg bg-secondary w-full">
                <InputField
                  type="text"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  icon={<FaPhone />}
                  name="mobile"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 text-primary bg-primary/5 p-3 rounded-lg border border-primary/10 w-full">
                <FaPhone className="text-lg opacity-70 shrink-0" />
                <span className="font-serif break-all">
                  {formData.mobile || "No Mobile"}
                </span>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="w-full">
            {isEditing && (
              <label className="text-sm font-bold text-primary ml-1 block mb-1 text-left">
                Gender
              </label>
            )}
            {isEditing ? (
              <div className="border-2 border-primary/20 rounded-lg bg-secondary relative h-12 w-full">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full h-full px-4 rounded-lg bg-transparent text-primary outline-none appearance-none font-serif font-bold cursor-pointer"
                >
                  <option className="bg-secondary" value="Male">
                    Male
                  </option>
                  <option className="bg-secondary" value="Female">
                    Female
                  </option>
                  <option className="bg-secondary" value="Other">
                    Other
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                  ▼
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-primary bg-primary/5 p-3 rounded-lg border border-primary/10 w-full">
                <span className="font-bold opacity-70 w-6 text-center shrink-0">
                  ⚥
                </span>
                <span className="font-serif">{formData.gender}</span>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="w-full">
            {isEditing && (
              <label className="text-sm font-bold text-primary ml-1 block mb-1 text-left">
                Address
              </label>
            )}
            {isEditing ? (
              <div className="border-2 border-primary/20 rounded-lg bg-secondary relative w-full">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-primary opacity-50 z-10" />
                <textarea
                  name="address"
                  value={formData.address}
                  // 👇 Removed (e: any). handleInputChange already accepts textarea events.
                  onChange={handleInputChange}
                  placeholder="Address"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent text-primary outline-none font-serif resize-none relative z-0"
                />
              </div>
            ) : (
              <div className="flex gap-3 text-primary bg-primary/5 p-4 rounded-lg border border-primary/10 min-h-20 w-full text-left">
                <FaMapMarkerAlt className="text-xl opacity-70 mt-1 shrink-0" />
                <span className="font-serif opacity-90 whitespace-pre-wrap break-all w-full">
                  {formData.address || "No Address Set"}
                </span>
              </div>
            )}
          </div>

          {/* Password Section */}
          {isEditing && (
            <div className="border-t-2 border-primary/10 pt-4 mt-2 w-full">
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="flex items-center gap-2 text-primary font-bold hover:underline mb-4 text-sm"
              >
                <FaLock />{" "}
                {showPasswordSection
                  ? "Cancel Password Change"
                  : "Change Password"}
              </button>
              {showPasswordSection && (
                <div className="space-y-3 bg-primary/5 p-4 rounded-xl border-2 border-primary/10 w-full">
                  <div className="bg-secondary rounded-lg border border-primary/20 p-1">
                    <InputField
                      type="password"
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      icon={<FaLock />}
                    />
                  </div>
                  <div className="bg-secondary rounded-lg border border-primary/20 p-1">
                    <InputField
                      type="password"
                      placeholder="New Password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      icon={<FaLock />}
                    />
                  </div>
                  <div className="bg-secondary rounded-lg border border-primary/20 p-1">
                    <InputField
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      icon={<FaLock />}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
