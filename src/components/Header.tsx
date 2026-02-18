import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { BiUserCircle } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import {
  IoCheckmarkCircle,
  IoClose,
  IoHomeOutline,
  IoLogOutOutline,
  IoTimeOutline,
} from "react-icons/io5";

// Components
import HistoryModal from "../components/HistoryModal";
import Modal from "../components/Modal";
import ProfileModal from "../components/Profile";

// ============================================================================
// HEADER COMPONENT - Navigation and User Controls
// ============================================================================
// This component provides:
// - Top navigation bar with logo and title
// - Sidebar menu (mobile-friendly)
// - User profile management
// - Logout functionality
// - History modal
// - Account settings

// ============================================================================
// INTERFACES - Type definitions for user data and props
// ============================================================================

/**
 * User Object - Stores authenticated user information
 */
interface User {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
}

/**
 * Profile Update Data - Form data for updating user profile
 * Subset of User info that can be edited
 */
interface ProfileUpdateData {
  username: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
}

/**
 * Password Data - Form data for changing password
 */
interface PasswordData {
  current: string;
  new: string;
}

/**
 * Header Props - Component configuration options
 */
interface HeaderProps {
  /** Logo image URL/path */
  logo: string;
  /** Title text to display beside logo */
  title?: string;
  /** Callback when menu button is clicked */
  onMenuClick?: () => void;
  /** Optional React element to render on right side */
  rightElement?: React.ReactNode;
}

/**
 * Sidebar Link Props - Configuration for sidebar navigation items
 */
interface SidebarLinkProps {
  /** Icon component/element */
  icon: React.ReactNode;
  /** Link label text */
  label: string;
  /** Callback when link is clicked */
  onClick: () => void;
  /** Optional Tailwind color class */
  colorClass?: string;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  onMenuClick,
  rightElement,
}) => {
  const navigate = useNavigate();

  // --- UI STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- MODAL STATES ---
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // --- USER DATA STATE (Lazy Initialization) ---
  // We define the defaults here to reuse them
  const defaultUser: User = {
    name: "User",
    email: "",
    mobile: "",
    gender: "Male",
    address: "",
    profilePhoto: null,
    coverPhoto: null,
  };

  const [user, setUser] = useState<User>(() => {
    // 1. Check local storage immediately during initialization
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Merge stored data with defaults to ensure all fields exist
        return { ...defaultUser, ...parsedUser };
      } catch (error) {
        console.error("Failed to parse user data", error);
        return defaultUser;
      }
    }

    // 2. Fallback to default if nothing in storage
    return defaultUser;
  });

  // ❌ REMOVED: The useEffect that was causing the error is no longer needed.

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (onMenuClick) onMenuClick();
  };

  const handleLogoutClick = () => {
    setIsSidebarOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("user");
      setIsLogoutModalOpen(false);
      navigate("/LandPage");
    } catch (error) {
      console.error("Logout failed", error);
      localStorage.removeItem("user");
      navigate("/LandPage");
    }
  };

  const handleHistoryClick = () => {
    setIsSidebarOpen(false);
    setIsHistoryModalOpen(true);
  };

  const handleProfileClick = () => {
    setIsSidebarOpen(false);
    setIsProfileModalOpen(true);
  };

  // --- SAVE HANDLER ---
  const handleSaveProfile = async (
    updatedData: ProfileUpdateData,
    passwordData?: PasswordData,
  ) => {
    try {
      const payload = {
        ...updatedData,
        ...(passwordData
          ? {
              currentPassword: passwordData.current,
              newPassword: passwordData.new,
            }
          : {}),
      };

      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        payload,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const newUserState: User = {
          ...user,
          ...updatedData,
          name: updatedData.username,
        };

        setUser(newUserState);
        localStorage.setItem("user", JSON.stringify(newUserState));

        setIsProfileModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error: unknown) {
      console.error("Profile update failed", error);

      let errMsg = "Failed to update profile.";

      if (axios.isAxiosError(error)) {
        errMsg = error.response?.data?.message || errMsg;
      }

      alert(`❌ ${errMsg}`);
      throw error;
    }
  };

  return (
    <>
      {/* HEADER UI */}
      <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-25 object-contain shrink-0 leading-none"
        />
        <div className="flex-1 text-center text-secondary text-lg leading-none mr-9 font-serif">
          {title}
        </div>
        {rightElement ? (
          rightElement
        ) : (
          <button
            onClick={toggleSidebar}
            className="text-secondary text-4xl hover:opacity-80 shrink-0 flex items-center justify-center"
          >
            <CgMenuGridO />
          </button>
        )}
      </div>

      {/* SIDEBAR - With smooth slide animation */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-all duration-300 ease-out ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleSidebar}
      />
      <div
        className={`font-serif fixed top-0 right-0 h-full w-72 bg-secondary shadow-2xl z-[101] transform transition-all duration-300 ease-out p-6 flex flex-col gap-6 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-white/50">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <BiUserCircle className="text-primary text-4xl" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-xl font-bold truncate max-w-[140px]">
                {user.name}
              </span>
              <span className="text-xs text-primary/60 truncate max-w-[140px]">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-primary text-3xl hover:opacity-70"
          >
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <SidebarLink
            icon={<IoHomeOutline />}
            label="Home"
            onClick={() => {
              navigate("/MainPage");
              toggleSidebar();
            }}
          />
          <SidebarLink
            icon={<IoTimeOutline />}
            label="History"
            onClick={handleHistoryClick}
          />
          <SidebarLink
            icon={<BiUserCircle />}
            label="Profile"
            onClick={handleProfileClick}
          />
          <hr className="border-primary/10 my-2" />
          <SidebarLink
            icon={<IoLogOutOutline />}
            label="Log Out"
            onClick={handleLogoutClick}
            colorClass="text-red-400"
          />
        </nav>
      </div>

      {/* --- 1. LOGOUT MODAL --- */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log Out"
        footer={
          <>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-md hover:shadow-lg"
            >
              Yes, Log Out
            </button>
          </>
        }
      >
        <p className="text-lg">Are you sure you want to log out?</p>
      </Modal>

      {/* --- 2. HISTORY MODAL --- */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      {/* --- 3. PROFILE MODAL --- */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialData={{
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          gender: user.gender,
          address: user.address,
        }}
        onSave={handleSaveProfile}
      />

      {/* --- 4. SUCCESS MODAL --- */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        footer={
          <div className="w-full flex justify-center">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-8 py-2 rounded-xl bg-primary text-secondary font-bold hover:opacity-90 transition shadow-md"
            >
              Okay
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <IoCheckmarkCircle className="text-6xl text-green-600 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-primary">Profile Updated!</h3>
          <p className="text-primary/70 mt-2">
            Your changes have been saved successfully.
          </p>
        </div>
      </Modal>
    </>
  );
};

// Helper
const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  onClick,
  colorClass = "text-primary",
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 transition-all group ${colorClass}`}
  >
    <span className="text-2xl group-hover:scale-110 transition-transform">
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </button>
);

export default Header;
