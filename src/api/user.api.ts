/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/axios/axios-instance";

// Note: handleError not found, using direct error handling instead

export const fetchOtherUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users", {
      headers: { "Cache-Control": "no-cache" },
    });
    return data;
  } catch (err: any) {
    if (err?.response?.status === 304) {
      const { data } = await axiosInstance.get("/users", {
        params: { t: Date.now() },
      });
      return data;
    }
    if (err?.response?.status === 401) {
      throw err;
    }
    console.error("Error fetching users:", err);
    throw err;
  }
};

export const fetchDTR = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/dtr/all/${id}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching DTR:", error);
    throw error;
  }
};

export const fetchOwnDTR = async () => {
  try {
    const response = await axiosInstance.get("/dtr");
    return response;
  } catch (error: unknown) {
    console.error("Error fetching own DTR:", error);
    throw error;
  }
};

export const fetchSchedule = async () => {
  try {
    const response = await axiosInstance.get("/schedule");
    return response;
  } catch (error: unknown) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};

export const fetchUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/users/profile/me");
    return response;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        throw error;
      }
    }
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId: string,
  profileData: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    about?: string;
    gender?: string;
    dateOfBirth?: string;
    profilePictureFile?: File;
    profilePictureUrl?: string;
    oldPassword?: string;
    newPassword?: string;
    position?: string[];
  },
) => {
  try {
    const formData = new FormData();

    // Append all profile fields
    if (profileData.firstName !== undefined) {
      formData.append("firstName", profileData.firstName);
    }
    if (profileData.middleName !== undefined) {
      formData.append("middleName", profileData.middleName);
    }
    if (profileData.lastName !== undefined) {
      formData.append("lastName", profileData.lastName);
    }
    if (profileData.email !== undefined) {
      formData.append("email", profileData.email);
    }
    if (profileData.phone !== undefined) {
      formData.append("phone", profileData.phone);
    }
    if (profileData.about !== undefined) {
      formData.append("about", profileData.about);
    }
    if (profileData.gender !== undefined) {
      formData.append("gender", profileData.gender);
    }
    if (profileData.dateOfBirth !== undefined) {
      formData.append("dateOfBirth", profileData.dateOfBirth);
    }
    if (profileData.oldPassword !== undefined) {
      formData.append("oldPassword", profileData.oldPassword);
    }
    if (profileData.newPassword !== undefined) {
      formData.append("newPassword", profileData.newPassword);
    }
    // Upload file using chunk uploader if a file is provided
    if (profileData.profilePictureFile) {
      // TODO: Implement file upload if needed
      console.warn("File upload not yet implemented");
      // const { uploadFileInChunks } = await import("@/utils/chunkUploader");
      // const imageUrl = await uploadFileInChunks(profileData.profilePictureFile, `profile`);
      // formData.append("image", imageUrl);
    } else if (profileData.profilePictureUrl) {
      formData.append("image", profileData.profilePictureUrl);
    }

    if (profileData.position) {
      profileData.position.forEach((role, index) => {
        formData.append(`position[${index}]`, role);
      });
    }

    const response = await axiosInstance.put(
      `/users/profile/${userId}`,
      formData,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const switchUserRole = async (role: string) => {
  try {
    const response = await axiosInstance.put("/users/switch-role", { role });
    return response.data;
  } catch (error: unknown) {
    console.error("Error switching user role:", error);
    throw error;
  }
};
