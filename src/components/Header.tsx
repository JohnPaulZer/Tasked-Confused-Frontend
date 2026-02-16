import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoClose, IoHomeOutline, IoTimeOutline, IoLogOutOutline, IoSearchOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Modal from "@/components/Modal"; // 👈 1. Import Modal

interface HeaderProps {
  logo: string;
  title?: string;
  onMenuClick?: () => void;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  onMenuClick,
  rightElement,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // --- STATE FOR LOGOUT MODAL ---
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [userName] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        return userObj.name || "User";
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return "";
      }
    }
    return "User";
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (onMenuClick) onMenuClick();
  };

  // --- 2. CLICK HANDLER (Triggers transition) ---
  const handleLogoutClick = () => {
    setIsOpen(false); // Close sidebar first (Smooth transition)
    setIsLogoutModalOpen(true); // Then open modal
  };

  // --- 3. ACTUAL LOGOUT LOGIC (Runs on Confirm) ---
  const confirmLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("user");
      setIsLogoutModalOpen(false); // Close modal
      navigate("/LandPage");
    } catch (error) {
      console.error("Logout failed", error);
      localStorage.removeItem("user");
      navigate("/LandPage");
    }
  };

  return (
    <>
      <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-25 object-contain shrink-0 leading-none"
        />

        {/* Center Title */}
        <div className="flex-1 text-center text-secondary text-lg leading-none mr-9 font-serif">
          {title}
        </div>

        {/* Right Action */}
        {rightElement ? (
          rightElement
        ) : (
          <button
            onClick={toggleSidebar}
            className="text-secondary text-4xl hover:opacity-80 transition shrink-0 flex items-center justify-center"
          >
            <CgMenuGridO />
          </button>
        )}
      </div>

      {/* --- SIDEBAR OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Panel */}
      <div className={`font-serif fixed top-0 right-0 h-full w-72 bg-secondary shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out p-6 flex flex-col gap-6 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Close Button & Profile */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-primary text-3xl">
              <BiUserCircle />
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-xl font-bold">{userName}</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="text-primary text-3xl">
            <IoClose />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full bg-primary/10 border-none rounded-lg py-2 pl-10 pr-4 text-primary placeholder:text-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 mt-4">
          <SidebarLink icon={<IoHomeOutline />} label="Home" onClick={() => { navigate('/MainPage'); toggleSidebar(); }} />
          <SidebarLink icon={<IoTimeOutline />} label="History" onClick={() => { navigate('/history'); toggleSidebar(); }} />
          <SidebarLink icon={<BiUserCircle />} label="Profile" onClick={() => { navigate('/profile'); toggleSidebar(); }} />
          <hr className="border-primary/10 my-2" />
          
          {/* 4. Update Logout Link to use new Handler */}
          <SidebarLink 
            icon={<IoLogOutOutline />} 
            label="Log Out" 
            onClick={handleLogoutClick} // 👈 Calls the intermediate function
            colorClass="text-red-400" 
          />
        </nav>
      </div>

      {/* --- 5. LOGOUT CONFIRMATION MODAL --- */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log Out"
        footer={
          <>
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-6 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition"
            >
              Cancel
            </button>
            <button 
              onClick={confirmLogout}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-md"
            >
              Yes, Log Out
            </button>
          </>
        }
      >
        <p className="text-lg">Are you sure you want to log out?</p>
      </Modal>

    </>
  );
};

// Helper component
const SidebarLink = ({ icon, label, onClick, colorClass = "text-primary" }: { icon: React.ReactNode, label: string, onClick: () => void, colorClass?: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 transition-all group ${colorClass}`}
  >
    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default Header;