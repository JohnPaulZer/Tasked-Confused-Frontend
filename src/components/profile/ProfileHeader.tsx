import React from "react";
import { FaUser } from "react-icons/fa";

const ProfileHeader: React.FC = () => {
  return (
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
  );
};

export default ProfileHeader;
