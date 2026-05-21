"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { RiderContext } from "@/src/context/RiderContext";

const PartnerFooter = () => {
  const t = useTranslations("Form_DeliveryPartner");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const context = useContext(RiderContext);
  const setDocument = context?.setApplication;
  return (
    <div className="h-max w-full mt-2 bg-white p-2  border border-gray-200  rounded-lg flex flex-col">
      <h1 className="text-[17px] w-full">{t("Agreement_section.title")}</h1>
      <h3 className="text-[13px]">{t("Agreement_section.sub_title")}</h3>

      <div className="flex w-full gap-1 mt-2">
        <div className="h-52 w-[52%] text-center top-0 bg-[white] flex gap-2 flex-col p-2  border border-gray-200 justify-center items-center  rounded-lg">
          <h2 className="text-[13px] text-center font-semibold md:text-lg">
            {t("Agreement_section.title")}
          </h2>
          <h3 className="text-[12px] md:text-[16px]">
            {t("Agreement_section.agreement_description")}
          </h3>
          <a
            href="https://drin721riupcf.cloudfront.net/web-assest/FitMeals_Delivery_Agent_Agreement.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 text-sm text-white font-semibold p-1 pl-2 pr-2 rounded-md inline-block"
          >
            <i className="fa-solid fa-file-pdf mr-2"></i>
            {t("Agreement_section.agreement_btn")}
          </a>
        </div>
        <div className="w-[50%] flex gap-2 flex-col justify-center pl-1 rounded-lg items-center text-center bg-[white]  border border-gray-200 text-[13px] relative">
          <div className="h-50 w-40 md:w-60 top-0 bg-green-200 flex flex-col justify-center items-center border border-gray-200 rounded-lg overflow-hidden relative group">
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
            ) : (
              <h2 className="font-semibold text-md md:text-lg mb-2">
                {t("Agreement_section.upload_document")}
              </h2>
            )}

            <input
              type="file"
              id="partner-footer-file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  if (file.type.startsWith("image/")) {
                    setPreview(URL.createObjectURL(file));
                    setDocument?.(file);
                  } else {
                    setPreview(null);
                  }
                }
              }}
            />
            {!selectedFile && (
              <label
                htmlFor="partner-footer-file"
                className="w-[80%] bg-green-500 text-white font-semibold text-md py-2 rounded-md cursor-pointer text-center z-10"
              >
                Upload File
              </label>
            )}
            {selectedFile && (
              <label
                htmlFor="partner-footer-file"
                className="absolute bottom-2 right-2 bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer z-10 hover:bg-green-700 transition-colors shadow-lg"
              >
                <i className="fa-solid fa-pen text-[11px]"></i>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerFooter;
