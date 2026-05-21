"use client";
import {
  formContext,
  FormContextProvider,
} from "@/src/context/RestaurantFormContext";
import React, { useContext } from "react";
import Image from "next/image";
import RegisterInfo from "./RegisterInfo";
import Notice from "./Notice";
import { useTranslations } from "next-intl";
import RestaurantFooter from "./RestaurantFooter";
import { toast } from "react-toastify";

const InnerForm = () => {
  const t = useTranslations("Form_Restaurant");
  const context = useContext(formContext);
  const handleSubmit = context?.handleSubmit;
  const loading = context?.loading;

  const file = context?.file;
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <>
      <div className="w-full h-50 mt-2 flex gap-1">
        <div className="h-50 w-60 md:w-60 relative group flex justify-center items-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all duration-300">
          <input
            type="file"
            id="restaurant-file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;

              if (file) {
                if (context?.setFile) {
                  context.setFile(file);
                }
              } else {
                toast.error("An error in uploading file");
              }
            }}
          />
          <label
            htmlFor="restaurant-file"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4 z-10"
          >
            <i className="fa-solid fa-cloud-arrow-up text-3xl text-green-500 mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"></i>
            <p className="mb-1 text-sm text-gray-600 font-medium leading-tight text-center">
              <span className="text-green-600 font-semibold">
                {file ? "Change File" : "Click to upload"}
              </span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1">PNG, JPG or PDF</p>
          </label>
        </div>
        <div className="w-[70%] md:w-full pb-2 h-50 flex overflow-y-scroll flex-col justify-center pl-1 rounded-lg items-center text-center bg-[white]  border border-gray-200 text-[13px] relative p-2">
          {previewUrl ? (
            file?.type === "application/pdf" ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                <i className="fa-solid fa-file-pdf text-4xl text-red-500 mb-2"></i>
                <span className="text-sm truncate w-full text-center">
                  {file.name}
                </span>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={previewUrl}
                  alt="Selected preview"
                  fill
                  sizes="(max-width: 768px) 70vw, 100vw"
                  className="object-contain rounded-md"
                />
              </div>
            )
          ) : (
            <>
              <h2 className=" text-sm md:text-lg font-semibold">
                {t("upload_section.upload_title")}
              </h2>
              <h4 className="text-xs w-[90%] md:w-[65%]">
                {t("upload_section.upload_subtitle")}
              </h4>
              <h4 className="text-xs w-[90%] md:w-[65%]">
                {t("upload_section.upload_note")}
              </h4>
            </>
          )}
        </div>
      </div>
      <RegisterInfo />
      <Notice />
      <RestaurantFooter />
      <div className="w-full mt-2 flex justify-center">
        <button
          onClick={() => handleSubmit?.()}
          disabled={loading}
          type="button"
          className={`w-full bg-green-700 font-semibold rounded-md cursor-pointer text-white shadow-lg active:shadow h-10 p-2 ${loading ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          {t("navbar.submit")}
        </button>
      </div>
    </>
  );
};

const Pagestructure = () => {
  return (
    <FormContextProvider>
      <InnerForm />
    </FormContextProvider>
  );
};

export default Pagestructure;
