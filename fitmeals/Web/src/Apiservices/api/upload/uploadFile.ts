import { toast } from "react-toastify";

export type uploadFormat = {
  file: File;
};

export type UploadFolderType =
  | "Restaurant"
  | "FoodItem"
  | "reservation"
  | "Driver"
  | "user";

const UploadFolder = (folder: UploadFolderType, id?: number) => {
  const map = {
    Restaurant: `Restaurants/${id}`,
    FoodItem: `foodItems/${id}`,
    reservation: `reservations/${id}`,
    Driver: `Riders/${id}`,
    user: `users/${id}`,
  };
  return map[folder];
};

export const uploadToAWS = async (
  folder: UploadFolderType,
  data: uploadFormat,
  id?: number,
) => {
  try {
    const signedRes = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        folder: UploadFolder(folder, id),
        contentType: data.file.type,
      }),
    });

    if (!signedRes.ok) {
      toast.error("Failed to get upload URL");
      return;
    }
    const { uploadUrl, fileUrl } = await signedRes.json();
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": data.file.type,
      },
      body: data.file,
    });

    if (!uploadRes.ok) {
      toast.error("File upload failed");
      return;
    }

    return fileUrl;
  } catch (error) {
    toast.error("Upload error");
  }
};

export const uploadMultipleToAWS = async (
  folder: UploadFolderType,
  files: File[],
  id?: number,
) => {
  try {
    if (!files || files.length === 0) return [];
    if (files.length > 5) {
      toast.error("Maximum 5 files allowed");
      return [];
    }

    const uploadPromises = files.map((file) =>
      uploadToAWS(folder, { file }, id),
    );

    const results = await Promise.all(uploadPromises);

    return results.filter(Boolean);
  } catch (error) {
    toast.error("Multiple upload failed");
    return [];
  }
};
