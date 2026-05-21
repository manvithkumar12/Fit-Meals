"use client";

import React, { useState, useRef, useContext } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RiderContext } from "@/src/context/RiderContext";

const PartnerPhoto = () => {
  const t = useTranslations("Form_DeliveryPartner");

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useContext(RiderContext);
  const setPhoto = context?.setSelfie;
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setPhotoPreview(null);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error("Camera access error:", err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unable to access camera. Please allow camera permission.");
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setPhotoPreview(dataUrl);

        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "selfie.png", { type: "image/png" });
            setPhoto?.(file);
          });

        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="h-max w-full mt-2 bg-white p-2 border border-gray-200 rounded-lg flex flex-col">
      <div className="border-b border-black/30 pb-2">
        <h2>{t("form_fields.Upload_Selfie")}</h2>
      </div>

      <div className="mt-2 flex pl-2">
        <div className="w-20 h-20 md:w-40 md:h-40 rounded-full relative overflow-hidden bg-gray-50 border-[3px] border-green-500 shadow-md flex items-center justify-center">
          {photoPreview ? (
            <Image
              src={photoPreview}
              fill
              sizes="(max-width: 768px) 80px, 160px"
              className="object-cover"
              alt="Selfie preview"
            />
          ) : stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/Userlogo.webp"
              fill
              sizes="(max-width: 768px) 80px, 160px"
              className="object-cover"
              alt="default_icon"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex justify-center gap-2 flex-col ml-5">
          <h2 className="font-semibold text-xl">
            {t("form_fields.Upload_Selfie")}
          </h2>
          <h3 className="text-sm text-gray-500 max-w-xs">
            {t("form_fields.selfie_description")}
          </h3>

          <div className="flex gap-2 mt-2">
            {stream ? (
              <>
                <button
                  onClick={capturePhoto}
                  className="p-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <i className="fa-solid fa-camera"></i>
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="p-2 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={openCamera}
                className="p-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-camera"></i>
                {photoPreview
                  ? "Retake Selfie"
                  : t("form_fields.Upload_Selfie")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPhoto;
