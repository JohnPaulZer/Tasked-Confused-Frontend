import React from "react";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputField from "../common/InputField";

interface ProfileData {
  username: string;
  mobile: string;
  email: string;
  gender: string;
  address: string;
}

interface ProfileDetailsSectionProps {
  isEditing: boolean;
  formData: ProfileData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
  isEditing,
  formData,
  onInputChange,
}) => {
  return (
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
              onChange={(e) => {
                const event = {
                  ...e,
                  target: { ...e.target, name: "username" },
                } as React.ChangeEvent<HTMLInputElement>;
                onInputChange(event);
              }}
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
              onChange={(e) => {
                const event = {
                  ...e,
                  target: { ...e.target, name: "email" },
                } as React.ChangeEvent<HTMLInputElement>;
                onInputChange(event);
              }}
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
              onChange={(e) => {
                const event = {
                  ...e,
                  target: { ...e.target, name: "mobile" },
                } as React.ChangeEvent<HTMLInputElement>;
                onInputChange(event);
              }}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
    </div>
  );
};

export default ProfileDetailsSection;
