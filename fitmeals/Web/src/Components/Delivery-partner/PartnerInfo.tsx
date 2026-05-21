"use client";

import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useUser } from "@/src/context/UserContext";
import { RiderContext } from "@/src/context/RiderContext";

const PartnerInfo = () => {
  const t = useTranslations("Form_DeliveryPartner");
  const ageData = Array.from({ length: 43 }, (_, i) => i + 18);
  const user = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const context = useContext(RiderContext);
  const setLicence = context?.setLicense;
  const setname = context?.setName;
  const setage = context?.setAge;
  const setvehicle = context?.setVehicle;

  return (
    <>
      <div className="w-full h-50 mt-2 flex gap-1">
        <div className="w-40 h-50 md:w-60 rounded-lg flex justify-center items-center relative">
          <div className="h-50 w-40 md:w-60 top-0 bg-green-200 flex justify-center items-center border border-gray-200 rounded-lg overflow-hidden relative group">
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                sizes="(max-width: 768px) 160px, 240px"
                className="object-cover"
              />
            ) : selectedFile ? (
              <div className="flex flex-col items-center justify-center text-center p-2 z-10">
                <i className="fa-solid fa-file-lines text-3xl text-green-700 mb-2"></i>
                <span className="text-xs font-semibold text-green-800 break-all">
                  {selectedFile.name}
                </span>
              </div>
            ) : null}
            <input
              type="file"
              id="partner-file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  if (file.type.startsWith("image/")) {
                    setPreview(URL.createObjectURL(file));
                    setLicence?.(file);
                  } else {
                    setPreview(null);
                  }
                }
              }}
            />
            {!selectedFile && (
              <label
                htmlFor="partner-file"
                className="w-[80%] bg-green-500 text-white font-semibold text-md py-2 rounded-md cursor-pointer text-center z-10"
              >
                Upload File
              </label>
            )}
            {selectedFile && (
              <label
                htmlFor="partner-file"
                className="absolute bottom-2 right-2 bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer z-10 hover:bg-green-700 transition-colors shadow-lg"
              >
                <i className="fa-solid fa-pen text-[11px]"></i>
              </label>
            )}
          </div>
        </div>
        <div className="w-[61%] md:w-full pb-2 h-50 flex overflow-y-scroll flex-col justify-center pl-1 rounded-lg items-center text-center bg-[white]  border border-gray-200 text-[13px] relative">
          <h2 className=" text-sm md:text-lg font-semibold">
            {t("file_section.title")}
          </h2>
          <h4 className="text-xs w-[90%] md:w-[65%]">
            {t("file_section.description")}
          </h4>
        </div>
      </div>
      <div className="w-full  flex flex-col  p-2 gap-2 mt-2 pt-3 rounded-lg  border border-gray-200 bg-[white]">
        <div className="flex  gap-2 md:justify-center">
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold">
              {t("form_fields.Full_Name")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <input
              type="text"
              className="h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              placeholder="Eg- John smith"
              onChange={(e) => {
                setname?.(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold">
              {t("form_fields.Phone_Number")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <input
              type="tel"
              value={
                user?.phoneNumber ?? "Please update phone number in profile"
              }
              onChange={(e) => {
                const onlyDigits = e.target.value
                  .replaceAll(/\D/g, "")
                  .slice(0, 10);
              }}
              className="h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              placeholder={t("form_fields.Placeholder_phone_number")}
            />
          </div>
        </div>
        <div className="flex gap-2 md:justify-center">
          <div className="flex flex-col gap-1 mt-2 w-[47%] text-left">
            <h1 className="font-semibold">
              {t("form_fields.Vechile_type")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <select
              className="border rounded-md border-black p-2 text-center text-sm"
              onChange={(e) => {
                setvehicle?.(e.target.value);
              }}
            >
              <option value="Scooter">{t("form_fields.Scooter")}</option>
              <option value="E-scooty">{t("form_fields.E-scooty")}</option>
              <option value="Motorcycle">{t("form_fields.Motorcycle")}</option>
              <option value="Others">{t("form_fields.others")}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold text-md">
              {t("form_fields.Age")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <select
              className="border rounded-md border-black p-2 text-center text-sm"
              onChange={(e) => {
                setage?.(Number(e.target.value));
              }}
            >
              <option value="">{t("form_fields.Select_Age")}</option>
              {ageData.map((item, index) => (
                <option value={item} key={index + item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerInfo;
