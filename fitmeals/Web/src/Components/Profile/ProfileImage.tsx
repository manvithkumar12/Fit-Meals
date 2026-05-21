"use client";

import { logedUser } from "@/src/types/logedUser.types";
import { Pencil, Upload } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { PlainPopUp } from "@/src/Components/PopUp/Popup";
import { uploadToAWS } from "@/src/Apiservices/api/upload/uploadFile";
import { UpdateProfileUrl } from "@/app/api/actions/userDetails/UpdateProfileUrl";
import { toast } from "react-toastify";
import { deleteFromAws } from "@/src/Apiservices/api/upload/deleteFromAws";

const ProfileImage = ({ user }: { user: logedUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const url = await uploadToAWS("user", { file: selectedFile }, user?.id);
      const snapShot = user?.profileUrl;
      if (url && user?.id) {
        const updated = await UpdateProfileUrl(user.id, url);
        if (updated) {
          if (snapShot) {
            await deleteFromAws(snapShot);
          }
          user.profileUrl = url;
          toast.success("Profile image updated successfully");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile image");
    } finally {
      setIsUploading(false);
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center sm:items-start">
      <div className="h-max w-max relative">
        <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full p-1 overflow-hidden relative">
          {user?.profileUrl ? (
            <Image
              src={user.profileUrl}
              alt="logo"
              className="object-cover rounded-full border-8 border-blue-200"
              fill
              sizes="(max-width: 640px) 128px, 144px"
              priority
            />
          ) : (
            <Image
              src="/Userlogo.webp"
              alt="logo"
              className="object-cover rounded-full"
              fill
              sizes="(max-width: 640px) 128px, 144px"
              priority
            />
          )}
        </div>

        <button
          onClick={handleEditClick}
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors absolute bottom-1 right-1 sm:right-2 flex items-center justify-center shadow-md border-2 border-white cursor-pointer"
          aria-label="Edit profile image"
        >
          <Pencil className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
        </button>
      </div>

      {isEditing && (
        <PlainPopUp setPopUp={setIsEditing}>
          <div className="flex flex-col gap-4 bg-white p-2 w-full min-w-[280px] max-w-sm rounded-xl">
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
              Update Profile Image
            </h2>

            <div className="flex justify-center mb-2">
              <div className="h-32 w-32 rounded-full p-1 overflow-hidden relative shadow-sm border border-gray-100">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="preview"
                    className="object-cover rounded-full border-4 border-emerald-200"
                    fill
                    sizes="128px"
                    priority
                  />
                ) : user?.profileUrl ? (
                  <Image
                    src={user.profileUrl}
                    alt="logo"
                    className="object-cover rounded-full border-8 border-blue-200"
                    fill
                    sizes="128px"
                    priority
                  />
                ) : (
                  <Image
                    src="/Userlogo.webp"
                    alt="logo"
                    className="object-cover rounded-full"
                    fill
                    sizes="128px"
                    priority
                  />
                )}
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-4 w-4" />
              {selectedFile ? "Choose Different Image" : "Select Image"}
            </button>

            {selectedFile && (
              <div className="flex w-full gap-2 mt-2">
                <button
                  onClick={handleCancel}
                  disabled={isUploading}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="flex-1 py-2 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            )}

            {!selectedFile && (
              <button
                onClick={handleCancel}
                className="w-full py-2 px-4 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors font-medium text-sm mt-1"
              >
                Cancel
              </button>
            )}
          </div>
        </PlainPopUp>
      )}
    </div>
  );
};

export default ProfileImage;
