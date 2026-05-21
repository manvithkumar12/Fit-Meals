"use client";
import { generateSlots } from "@/src/utils/generateSlots";
import "@/app/[locale]/(public)/page.css";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { uploadMultipleToAWS } from "@/src/Apiservices/api/upload/uploadFile";
import { allowReservation } from "@/app/api/actions/Reservations/allowReservation";
import { toast } from "react-toastify";
interface SlotProps {
  openingTime: string;
  closingTime: string;
  id: number;
}
const SlotsCard = ({ openingTime, closingTime, id }: SlotProps) => {
  const t = useTranslations("Reservation_form");
  const slots = generateSlots(openingTime, closingTime);
  const [menuimages, setMenuImages] = useState<string[]>([]);
  const [resimages, setResImages] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [menuFiles, setMenuFiles] = useState<File[]>([]);
  const [resFiles, setResFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSubmission = async () => {
    try {
      setLoading(true);
      const restaurantId = id;
      const menuUrls = await uploadMultipleToAWS("FoodItem", menuFiles);
      const resUrls = await uploadMultipleToAWS(
        "reservation",
        resFiles,
        restaurantId,
      );
      await allowReservation(menuUrls, resUrls, selectedTime, id);
    } catch (error) {
      toast.error(t("errorUpload"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-max rounded-lg p-4 bg-white border justify-center border-gray-200 shadow-lg mt-3 w-full lg:w-[80%]">
      <div className="justify-center items-center flex">
        <h1 className="text-xl whitespace-nowrap font-semibold">
          {t("slotTimes")}
        </h1>
        <div className="w-full ml-3 h-0.5 bg-black/20"></div>
      </div>
      <h3 className="ml-3 font-semibold mt-2">
        {t("timingsInfo")} {openingTime} {t("to")} {closingTime}
      </h3>
      <div className="w-[90%] p-1 flex flex-wrap h-40 hidebar overflow-y-scroll gap-2 mt-3">
        {slots.map((slot, index) => (
          <button
            key={index + 1}
            onClick={() => {
              setSelectedTime((prev) =>
                prev.includes(slot)
                  ? prev.filter((s) => s !== slot)
                  : [...prev, slot],
              );
            }}
            className={`px-3 py-2 w-30 rounded-full font-semibold border h-10 border-gray-200 text-sm ${selectedTime.includes(slot) ? "bg-green-500 text-white" : "bg-white hover:bg-green-100"}`}
          >
            {slot}
          </button>
        ))}
      </div>
      <div>
        <div className="justify-center mt-5 items-center flex">
          <h1 className="text-xl whitespace-nowrap font-semibold">
            {t("uploadMenuTitle")}
          </h1>
          <div className="w-full ml-3 h-0.5 bg-black/20"></div>
        </div>
        <div className="flex items-center">
          <input
            type="file"
            id="menuUpload"
            className="hidden"
            multiple
            accept="image/*"
            maxLength={3}
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              const MAX_SIZE = 300 * 1024;

              const validFiles = Array.from(files).filter((file) => {
                if (file.size > MAX_SIZE) {
                  alert(t("errorFileSize", { fileName: file.name }));
                  return false;
                }
                return true;
              });

              const imageUrls = validFiles.map((file) =>
                URL.createObjectURL(file),
              );

              setMenuImages((prev) => [...prev, ...imageUrls]);
              setMenuFiles((prev) => [...prev, ...validFiles]);
            }}
          />
          <label
            htmlFor="menuUpload"
            className="inline-block w-max mt-3 px-4 py-2 h-10 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
          >
            {t("uploadMenuBtn")}
          </label>
          <div className="hidebar flex ml-3 gap-3 overflow-x-scroll">
            {menuimages.map((item, index) => (
              <div
                key={index + 1}
                className="h-24 w-24 bg-red-300 relative rounded-md overflow-hidden"
              >
                <Image src={item} alt="preview" fill sizes="96px" />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="justify-center mt-5 items-center flex">
          <h1 className="text-xl whitespace-nowrap font-semibold">
            {t("uploadPhotosTitle")}
          </h1>
          <div className="w-full ml-3 h-0.5 bg-black/20"></div>
        </div>
        <div className="flex items-center">
          <input
            type="file"
            id="menuUpload2"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              const MAX_SIZE = 300 * 1024;

              const validFiles = Array.from(files).filter((file) => {
                if (file.size > MAX_SIZE) {
                  alert(t("errorFileSize", { fileName: file.name }));
                  return false;
                }
                return true;
              });

              const imageUrls = validFiles.map((file) =>
                URL.createObjectURL(file),
              );

              setResImages((prev) => [...prev, ...imageUrls]);
              setResFiles((prev) => [...prev, ...validFiles]);
            }}
          />
          <label
            htmlFor="menuUpload2"
            className="inline-block mt-3 w-max px-4 py-2 h-10 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
          >
            {t("uploadPhotosBtn")}
          </label>
          <div className="flex ml-3 gap-3 hidebar overflow-x-scroll">
            {resimages.map((item, index) => (
              <div
                key={index + 1}
                className="h-24 w-24 bg-red-300 relative rounded-md overflow-hidden"
              >
                <Image src={item} alt="preview" fill sizes="96px" />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={async () => {
          handleSubmission();
        }}
        disabled={loading}
        className={`w-full h-10 mt-2 bg-green-600 font-semibold rounded-md shadow-xl active:shadow text-white ${loading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {t("submitBtn")}
      </button>
    </div>
  );
};

export default SlotsCard;
