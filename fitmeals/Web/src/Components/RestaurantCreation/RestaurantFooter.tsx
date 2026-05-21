"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { formContext } from "@/src/context/RestaurantFormContext";
import Image from "next/image";

const RestaurantFooter = () => {
  const t = useTranslations("Form_DeliveryPartner");
  const context = useContext(formContext);
  const setFile = context?.setAgreementFile;
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  return (
    <div className="h-max w-full mt-2 bg-white p-2 border border-gray-200 rounded-lg flex flex-col">
      <h1 className="text-[17px] w-full">{t("Agreement_section.title")}</h1>

      <h3 className="text-[13px]">{t("Agreement_section.sub_title")}</h3>

      <div className="flex w-full gap-1 mt-2">
        {/* LEFT */}
        <div className="h-52 w-[52%] text-center bg-white flex gap-2 flex-col p-2 border border-gray-200 justify-center items-center rounded-lg">
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

        {/* RIGHT */}
        <div className="w-[50%] flex gap-2 flex-col justify-center pl-2 pr-2 rounded-lg items-center text-center bg-white border border-gray-200 relative p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="font-semibold text-md md:text-lg text-gray-800">
            {t("Agreement_section.upload_document")}
          </h2>
          <p className="text-xs text-gray-500 mb-1">
            Upload your signed agreement in PDF or Image format
          </p>

          <div className="w-full max-w-60 mx-auto relative group mt-2">
            <input
              type="file"
              id="footer-document"
              className="hidden"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile?.(file);
                  const fileUrl = URL.createObjectURL(file);
                  setPreview(fileUrl);

                  if (file.type === "application/pdf") {
                    setFileType("pdf");
                  } else {
                    setFileType("image");
                  }
                }
              }}
            />

            {preview ? (
              <div className="flex flex-col items-center justify-center w-full p-2 border-2 border-green-100 bg-green-50/50 rounded-xl transition-all duration-300">
                {fileType === "pdf" ? (
                  <div className="w-full h-24 md:h-28 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <iframe
                      src={`${preview}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full scale-[1.1]"
                      title="PDF Preview"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-24 md:h-28 rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-white">
                    <Image
                      src={preview}
                      alt="preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 100%"
                      className="object-cover"
                    />
                  </div>
                )}
                <label
                  htmlFor="footer-document"
                  className="mt-2 px-3 py-1.5 w-[90%] bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg cursor-pointer hover:bg-gray-50 hover:text-green-600 hover:border-green-300 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-arrows-rotate"></i> Change File
                </label>
              </div>
            ) : (
              <label
                htmlFor="footer-document"
                className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center p-4">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-green-500 mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"></i>
                  <p className="mb-1 text-sm text-gray-600 font-medium leading-tight">
                    <span className="text-green-600 font-semibold">
                      Click to upload
                    </span>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    PNG, JPG or PDF
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFooter;
