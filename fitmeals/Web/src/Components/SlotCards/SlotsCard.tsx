"use client";
import { generateSlots } from "@/src/utils/generateSlots";
import "@/app/[locale]/(public)/page.css";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { uploadMultipleToAWS } from "@/src/Apiservices/api/upload/uploadFile";
import { allowReservation } from "@/app/api/actions/Reservations/allowReservation";
import { toast } from "react-toastify";
import { deleteMultipleFromAws } from "@/src/Apiservices/api/upload/deleteFromAws";

interface SlotProps {
  openingTime: string;
  closingTime: string;
  id: number;
}

const SlotsCard = ({ openingTime, closingTime, id }: SlotProps) => {
  const t = useTranslations("Reservation_form");
  const slots = generateSlots(openingTime, closingTime);
  
  const [activeStep, setActiveStep] = useState<number>(1);
  const [menuimages, setMenuImages] = useState<string[]>([]);
  const [resimages, setResImages] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [menuFiles, setMenuFiles] = useState<File[]>([]);
  const [resFiles, setResFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const steps = [
    { number: 1, name: t("steps.slotTimes.name"), subtitle: t("steps.slotTimes.subtitle") },
    { number: 2, name: t("steps.uploadMenu.name"), subtitle: t("steps.uploadMenu.subtitle") },
    { number: 3, name: t("steps.restaurantPhotos.name"), subtitle: t("steps.restaurantPhotos.subtitle") },
    { number: 4, name: t("steps.reviewSubmit.name"), subtitle: t("steps.reviewSubmit.subtitle") }
  ];

  const handleMenuDelete = (index: number) => {
    setMenuImages((prev) => {
      const urlToDelete = prev[index];
      if (urlToDelete && urlToDelete.startsWith("blob:")) {
        URL.revokeObjectURL(urlToDelete);
      }
      return prev.filter((_, i) => i !== index);
    });
    setMenuFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResDelete = (index: number) => {
    setResImages((prev) => {
      const urlToDelete = prev[index];
      if (urlToDelete && urlToDelete.startsWith("blob:")) {
        URL.revokeObjectURL(urlToDelete);
      }
      return prev.filter((_, i) => i !== index);
    });
    setResFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmission = async () => {
    if (selectedTime.length === 0) {
      toast.warning(t("toasts.selectSlotSubmitError"));
      return;
    }
    if (menuFiles.length === 0) {
      toast.warning(t("toasts.uploadMenuError"));
      return;
    }

    let menuUrls: string[] = [];
    let resUrls: string[] = [];

    try {
      setLoading(true);
      const restaurantId = id;
      
      // Upload files to AWS
      menuUrls = await uploadMultipleToAWS("FoodItem", menuFiles);
      resUrls = await uploadMultipleToAWS(
        "reservation",
        resFiles,
        restaurantId,
      );
      
      // Save Reservation details in database
      await allowReservation(menuUrls, resUrls, selectedTime, id);
      toast.success(t("toasts.uploadSuccess"));
    } catch (error) {
      toast.error(t("errorUpload"));
      
      // Clean up uploaded files from AWS on failure (prevents orphaned dead files)
      const uploadedUrls = [...menuUrls, ...resUrls];
      if (uploadedUrls.length > 0) {
        await deleteMultipleFromAws(uploadedUrls);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSlotChip = (slot: string, i: number) => {
    const isSelected = selectedTime.includes(slot);
    return (
      <button
        key={i}
        onClick={() => {
          setSelectedTime((prev) =>
            prev.includes(slot)
              ? prev.filter((s) => s !== slot)
              : [...prev, slot],
          );
        }}
        type="button"
        className={`group relative flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold border transition-all duration-300 text-xs md:text-sm select-none cursor-pointer ${isSelected
            ? "bg-[#0A3326] border-[#0A3326] text-white shadow-md shadow-emerald-800/10 scale-[1.03]"
            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm"
          }`}
      >
        {isSelected && (
          <i className="fa-solid fa-circle-check text-xs text-white animate-[scaleIn_0.2s_ease-out]"></i>
        )}
        <span>{slot}</span>
      </button>
    );
  };

  const renderTimingsStep = () => {
    const morningSlots = slots.filter((slot) => {
      const hour = parseInt(slot.split(":")[0]);
      return hour >= 6 && hour < 12;
    });
    const afternoonSlots = slots.filter((slot) => {
      const hour = parseInt(slot.split(":")[0]);
      return hour >= 12 && hour < 18;
    });
    const eveningSlots = slots.filter((slot) => {
      const hour = parseInt(slot.split(":")[0]);
      return hour >= 18 || hour < 6;
    });

    return (
      <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out] select-none">
        {/* Active Config Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <i className="fa-solid fa-bell-concierge text-sm"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">
                {t("dashboard.activeConfig", { count: selectedTime.length })}
              </h3>
              <p className="text-xs text-emerald-700 font-bold mt-0.5">
                {t("dashboard.timings", { opening: openingTime, closing: closingTime })}
              </p>
            </div>
          </div>
          <div className="bg-white/80 border border-slate-200 shadow-sm px-3 py-1 rounded-full text-xs font-bold text-slate-500">
            {selectedTime.length > 0 ? t("dashboard.configured") : t("dashboard.configRequired")}
          </div>
        </div>

        {/* Morning Slots */}
        {morningSlots.length > 0 && (
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i className="fa-solid fa-sun text-amber-500"></i>
              {t("dashboard.morning")}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {morningSlots.map((slot, i) => renderSlotChip(slot, i))}
            </div>
          </div>
        )}

        {/* Afternoon Slots */}
        {afternoonSlots.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i className="fa-solid fa-cloud-sun text-orange-400"></i>
              {t("dashboard.afternoon")}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {afternoonSlots.map((slot, i) => renderSlotChip(slot, i))}
            </div>
          </div>
        )}

        {/* Evening Slots */}
        {eveningSlots.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i className="fa-solid fa-moon text-indigo-500"></i>
              {t("dashboard.evening")}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {eveningSlots.map((slot, i) => renderSlotChip(slot, i))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMenuStep = () => {
    return (
      <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <input
              type="file"
              id="menuUpload"
              className="hidden"
              multiple
              accept="image/*,application/pdf"
              disabled={menuimages.length >= 5}
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;

                const MAX_SIZE = 300 * 1024;
                const currentCount = menuimages.length;

                if (currentCount >= 5) {
                  toast.warning(t("toasts.menuLimitReached"));
                  return;
                }

                const validFiles = Array.from(files).filter((file) => {
                  if (file.size > MAX_SIZE) {
                    toast.error(t("errorFileSize", { fileName: file.name }));
                    return false;
                  }
                  return true;
                });

                if (validFiles.length === 0) return;

                const limit = 5;
                const remaining = limit - currentCount;
                const toAdd = validFiles.slice(0, remaining);

                if (validFiles.length > remaining) {
                  toast.warning(t("toasts.menuLimitWarning", { remaining }));
                }

                const imageUrl = toAdd.map((file) =>
                  file.type === "application/pdf" || file.name.endsWith(".pdf")
                    ? "/pdf-placeholder.png"
                    : URL.createObjectURL(file)
                );

                setMenuImages((prev) => [...prev, ...imageUrl]);
                setMenuFiles((prev) => [...prev, ...toAdd]);
                e.target.value = "";
              }}
            />
            <label
              htmlFor="menuUpload"
              className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-6 text-center transition-all duration-300 cursor-pointer min-h-[220px] ${menuimages.length >= 5
                  ? "bg-slate-50 border-slate-200 cursor-not-allowed opacity-60"
                  : "bg-white hover:bg-slate-50/50 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md"
                }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-4 transition-all duration-300 ${menuimages.length >= 5 ? "bg-slate-100 text-slate-400" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                }`}>
                <i className="fa-solid fa-cloud-arrow-up text-xl animate-bounce"></i>
              </div>
              <span className="font-extrabold text-slate-800 text-sm block">
                {menuimages.length >= 5 ? t("dashboard.configured") : t("dashboard.dragDropMenu")}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                or <span className="text-emerald-600 font-bold group-hover:underline">{t("dashboard.browseFiles")}</span>
              </span>
              <span className="text-[10px] text-slate-400/80 font-bold mt-2 block">
                {t("dashboard.maxSizeMenu")}
              </span>
              <div className="mt-4 flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${menuimages.length >= 5 ? "bg-red-400" : "bg-emerald-500 animate-pulse"}`}></span>
                {t("dashboard.filesUploaded", { count: menuimages.length })}
              </div>
            </label>
          </div>

          <div className="lg:col-span-2">
            {menuFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[220px] border border-slate-100 bg-slate-50/30 rounded-3xl text-slate-400 text-xs p-6 text-center">
                <i className="fa-regular fa-file-lines text-4xl mb-3 text-slate-200 animate-pulse"></i>
                <h4 className="font-bold text-slate-600 text-sm">{t("dashboard.noMenuFiles")}</h4>
                <p className="text-slate-400 mt-1 max-w-[240px]">
                  {t("dashboard.uploadMenuDesc")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1 hidebar">
                {menuFiles.map((file, index) => {
                  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-slate-100 bg-white hover:bg-slate-50/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative group animate-[fadeIn_0.2s_ease-out]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-black text-xs shadow-sm select-none ${isPdf ? "bg-orange-500 shadow-orange-500/10" : "bg-emerald-500 shadow-emerald-500/10"
                          }`}>
                          {isPdf ? "PDF" : "IMG"}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-xs leading-tight">
                            {file.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">
                            {(file.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMenuDelete(index)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer border border-red-100/50"
                        >
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGalleryStep = () => {
    return (
      <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <input
              type="file"
              id="menuUpload2"
              className="hidden"
              multiple
              accept="image/*"
              disabled={resimages.length >= 3}
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;

                const MAX_SIZE = 300 * 1024;
                const currentCount = resimages.length;

                if (currentCount >= 3) {
                  toast.warning(t("toasts.photoLimitReached"));
                  return;
                }

                const validFiles = Array.from(files).filter((file) => {
                  if (file.size > MAX_SIZE) {
                    toast.error(t("errorFileSize", { fileName: file.name }));
                    return false;
                  }
                  return true;
                });

                if (validFiles.length === 0) return;

                const limit = 3;
                const remaining = limit - currentCount;
                const toAdd = validFiles.slice(0, remaining);

                if (validFiles.length > remaining) {
                  toast.warning(t("toasts.photoLimitWarning", { remaining }));
                }

                const imageUrls = toAdd.map((file) => URL.createObjectURL(file));

                setResImages((prev) => [...prev, ...imageUrls]);
                setResFiles((prev) => [...prev, ...toAdd]);
                e.target.value = "";
              }}
            />
            <label
              htmlFor="menuUpload2"
              className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-6 text-center transition-all duration-300 cursor-pointer min-h-[220px] ${resimages.length >= 3
                  ? "bg-slate-50 border-slate-200 cursor-not-allowed opacity-60"
                  : "bg-white hover:bg-slate-50/50 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md"
                }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-4 transition-all duration-300 ${resimages.length >= 3 ? "bg-slate-100 text-slate-400" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                }`}>
                <i className="fa-solid fa-cloud-arrow-up text-xl animate-bounce"></i>
              </div>
              <span className="font-extrabold text-slate-800 text-sm block">
                {resimages.length >= 3 ? t("dashboard.configured") : t("dashboard.dragDropPhotos")}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                or <span className="text-emerald-600 font-bold group-hover:underline">{t("dashboard.selectPhotos")}</span>
              </span>
              <span className="text-[10px] text-slate-400/80 font-bold mt-2 block">
                {t("dashboard.maxSizePhotos")}
              </span>
              <div className="mt-4 flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${resimages.length >= 3 ? "bg-red-400" : "bg-emerald-500 animate-pulse"}`}></span>
                {t("dashboard.photosUploaded", { count: resimages.length })}
              </div>
            </label>
          </div>

          <div className="lg:col-span-2">
            {resimages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[220px] border border-slate-100 bg-slate-50/30 rounded-3xl text-slate-400 text-xs p-6 text-center">
                <i className="fa-regular fa-image text-4xl mb-3 text-slate-200 animate-pulse"></i>
                <h4 className="font-bold text-slate-600 text-sm">{t("dashboard.noPhotos")}</h4>
                <p className="text-slate-400 mt-1 max-w-[240px]">
                  {t("dashboard.noPhotosDesc")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {resimages.map((item, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-[fadeIn_0.2s_ease-out]"
                  >
                    <Image src={item} alt="preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleResDelete(index)}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-50 hover:bg-red-600 text-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 cursor-pointer z-10"
                    >
                      <i className="fa-solid fa-trash-can text-[10px]"></i>
                    </button>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                ))}

                {resimages.length < 3 && (
                  <label
                    htmlFor="menuUpload2"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl aspect-video bg-white hover:bg-slate-50/50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <i className="fa-solid fa-plus text-slate-400 text-sm mb-1"></i>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{t("dashboard.addMore")}</span>
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    const isSlotsValid = selectedTime.length > 0;
    const isMenuValid = menuFiles.length > 0;
    const isGalleryValid = resFiles.length > 0;

    return (
      <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-[24px] p-6 shadow-sm">
          <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
            <i className="fa-solid fa-clipboard-check text-emerald-600"></i>
            {t("dashboard.checklistTitle")}
          </h3>

          <div className="flex flex-col gap-4">
            {/* Timings summary */}
            <div className="flex items-start justify-between p-4 border border-slate-100 bg-white rounded-2xl relative overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="flex gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${isSlotsValid ? "bg-emerald-50 text-emerald-600 animate-[pulse_1s_infinite_alternate]" : "bg-orange-50 text-orange-600"
                  }`}>
                  <i className={isSlotsValid ? "fa-solid fa-check" : "fa-solid fa-triangle-exclamation"}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{t("steps.slotTimes.name")}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {isSlotsValid
                      ? t("dashboard.timingsDesc", { count: selectedTime.length, opening: openingTime, closing: closingTime })
                      : t("dashboard.noTimingsDesc")}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${isSlotsValid ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700 animate-pulse"
                }`}>
                {isSlotsValid ? t("dashboard.configured") : t("dashboard.incomplete")}
              </span>
            </div>

            {/* Menu summary */}
            <div className="flex items-start justify-between p-4 border border-slate-100 bg-white rounded-2xl relative overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="flex gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${isMenuValid ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                  }`}>
                  <i className={isMenuValid ? "fa-solid fa-check" : "fa-solid fa-triangle-exclamation"}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{t("uploadMenuTitle")}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {isMenuValid
                      ? t("dashboard.menuDesc", { count: menuFiles.length })
                      : t("dashboard.noMenuDesc")}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${isMenuValid ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700 animate-pulse"
                }`}>
                {isMenuValid ? t("dashboard.configured") : t("dashboard.incomplete")}
              </span>
            </div>

            {/* Gallery summary */}
            <div className="flex items-start justify-between p-4 border border-slate-100 bg-white rounded-2xl relative overflow-hidden group hover:shadow-sm transition-shadow">
              <div className="flex gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${isGalleryValid ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}>
                  <i className={isGalleryValid ? "fa-solid fa-check" : "fa-solid fa-info"}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{t("uploadPhotosTitle")}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {isGalleryValid
                      ? t("dashboard.photosDesc", { count: resFiles.length })
                      : t("dashboard.optionalPhotosDesc")}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${isGalleryValid ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                {isGalleryValid ? t("dashboard.configured") : t("dashboard.optional")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1280px] mx-auto p-4 md:p-6 bg-slate-50/20 rounded-[32px] border border-slate-100 shadow-xl mt-6 min-h-[640px]">
      {/* 1. Left Progress Sidebar */}
      <div className="lg:w-[320px] bg-[#0A3326] rounded-[24px] p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-lg select-none min-h-[500px]">
        {/* Glow Effects */}
        <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-emerald-500/10 filter blur-[80px]"></div>

        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight text-white leading-tight">
              {t("title")}
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
              {t("timingsInfo")} {openingTime} {t("to")} {closingTime}
            </p>
          </div>

          {/* Stepper Steps */}
          <div className="flex flex-col gap-6 relative pl-4 mt-2">
            {/* Connecting vertical line */}
            <div className="absolute left-[30px] top-[14px] bottom-[14px] w-[2px] bg-slate-700/60 z-0"></div>

            {steps.map((step) => {
              const isActive = activeStep === step.number;
              const isCompleted = activeStep > step.number;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  type="button"
                  className="flex items-center gap-4 text-left group z-10 cursor-pointer"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-sm transition-all duration-300 border ${isActive
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 border-emerald-400 text-[#0A3326] shadow-md shadow-emerald-400/25 scale-110"
                      : isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-[#092B20] border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-white"
                    }`}>
                    {isCompleted ? (
                      <i className="fa-solid fa-check text-xs"></i>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold tracking-tight transition-colors duration-300 leading-none ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                      }`}>
                      {step.name}
                    </h4>
                    <p className={`text-[10px] transition-colors duration-300 mt-1 leading-none ${isActive ? "text-slate-300" : "text-slate-500 group-hover:text-slate-400"
                      }`}>
                      {step.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Vector SVG Restaurant Table at Bottom */}
        <div className="relative z-10 w-full mt-8 md:mt-12 flex justify-center">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[240px] opacity-95">
            <circle cx="200" cy="150" r="120" fill="url(#glowGradient)" opacity="0.15" />
            <line x1="200" y1="0" x2="200" y2="80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <path d="M170 80L230 80L250 110L150 110Z" fill="#B45309" />
            <circle cx="200" cy="112" r="8" fill="#FBBF24" />
            <polygon points="150,110 250,110 320,300 80,300" fill="url(#beamGradient)" opacity="0.2" />
            <path d="M80 200C80 170 95 170 115 170C135 170 145 170 145 200V240H80V200Z" fill="#047857" />
            <rect x="85" y="240" width="8" height="60" rx="3" fill="#B45309" transform="rotate(5 85 240)" />
            <rect x="132" y="240" width="8" height="60" rx="3" fill="#B45309" transform="rotate(-5 132 240)" />
            <path d="M255 200C255 170 265 170 285 170C305 170 320 170 320 200V240H255V200Z" fill="#047857" />
            <rect x="260" y="240" width="8" height="60" rx="3" fill="#B45309" transform="rotate(5 260 240)" />
            <rect x="307" y="240" width="8" height="60" rx="3" fill="#B45309" transform="rotate(-5 307 240)" />
            <rect x="194" y="210" width="12" height="80" fill="#475569" />
            <ellipse cx="200" cy="290" rx="40" ry="10" fill="#334155" />
            <ellipse cx="200" cy="205" rx="85" ry="22" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
            <line x1="160" y1="190" x2="160" y2="182" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="160" cy="182" rx="4" ry="6" fill="#E2E8F0" opacity="0.6" />
            <line x1="240" y1="190" x2="240" y2="182" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="240" cy="182" rx="4" ry="6" fill="#E2E8F0" opacity="0.6" />
            <rect x="198" y="182" width="4" height="18" rx="1" fill="#CBD5E1" />
            <circle cx="200" cy="178" r="2.5" fill="#EF4444" />
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="beamGradient" x1="200" y1="110" x2="200" y2="300">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
        {/* Step Header */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t("dashboard.stepText", { current: activeStep, total: 4 })}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">
                  {t("dashboard.completedText", { percent: activeStep * 25 })}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mt-1.5 leading-snug">
                {activeStep === 1 && t("titles.step1")}
                {activeStep === 2 && t("titles.step2")}
                {activeStep === 3 && t("titles.step3")}
                {activeStep === 4 && t("titles.step4")}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 font-medium mt-1 leading-relaxed">
                {activeStep === 1 && t("subtitles.step1")}
                {activeStep === 2 && t("subtitles.step2")}
                {activeStep === 3 && t("subtitles.step3")}
                {activeStep === 4 && t("subtitles.step4")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toast.success(t("toasts.draftSaved"))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all select-none cursor-pointer"
              >
                <i className="fa-regular fa-bookmark"></i>
                {t("dashboard.saveDraft")}
              </button>
              <button
                type="button"
                onClick={() => toast.info(t("toasts.previewMode"))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-all select-none cursor-pointer"
              >
                <i className="fa-regular fa-eye"></i>
                {t("dashboard.preview")}
              </button>
            </div>
          </div>

          {/* Active Step Content */}
          <div className="min-h-[300px]">
            {activeStep === 1 && renderTimingsStep()}
            {activeStep === 2 && renderMenuStep()}
            {activeStep === 3 && renderGalleryStep()}
            {activeStep === 4 && renderReviewStep()}
          </div>
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 text-sm text-slate-600 transition-all select-none ${activeStep === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer active:scale-95"
              }`}
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            {t("dashboard.back")}
          </button>

          {activeStep < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (activeStep === 1 && selectedTime.length === 0) {
                  toast.warning(t("toasts.selectSlotError"));
                  return;
                }
                if (activeStep === 2 && menuFiles.length === 0) {
                  toast.warning(t("toasts.uploadMenuError"));
                  return;
                }
                setActiveStep((prev) => Math.min(4, prev + 1));
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#0A3326] hover:bg-[#07241A] text-white text-sm shadow-md hover:shadow-lg transition-all active:scale-95 select-none cursor-pointer"
            >
              {t("dashboard.saveContinue")}
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmission}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 text-white text-sm shadow-lg shadow-emerald-600/10 hover:shadow-xl hover:brightness-105 transition-all select-none ${loading ? "opacity-60 cursor-not-allowed animate-pulse" : "cursor-pointer active:scale-95"
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("dashboard.processing")}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-check"></i>
                  {t("dashboard.allowReservation")}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotsCard;
