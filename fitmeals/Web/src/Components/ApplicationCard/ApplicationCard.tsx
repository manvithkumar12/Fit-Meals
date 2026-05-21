"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const ApplicationCard = () => {
  const t = useTranslations("LoginPage");
  return (
    <div className="w-max ml-5 md:ml-0 md:w-110 h-45 flex relative bg-black pt-2 pb-2 rounded-lg shadow-2xl md:justify-start md:items-start pr-3">
      <div className="absolute h-60 w-30 ml-2 bottom-0">
        <Image
          src="https://drin721riupcf.cloudfront.net/web-assest/phone.png"
          alt="phone"
          fill
          sizes="120px"
          className="hidden md:block"
          loading="lazy"
          blurDataURL="/blur.jpeg"
          placeholder="blur"
        />
      </div>
      <div className="h-20 w-70 text-center flex flex-col pl-2 md:ml-auto">
        <h1 className="text-lg font-semibold font-montserrat text-white">
          {t("app_card.title")}
        </h1>
        <div className="flex gap-2 h-max">
          <div className="w-35 h-20 relative">
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/playstore.jpg"
              alt="Play Store"
              fill
              sizes="140px"
              className="object-cover cursor-not-allowed"
              loading="lazy"
              blurDataURL="/blur.jpeg"
              placeholder="blur"
            />
          </div>

          <div className="w-35 h-20 relative">
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/appstore.svg"
              alt="App Store"
              fill
              sizes="140px"
              className="object-cover cursor-not-allowed"
              loading="lazy"
              blurDataURL="/blur.jpeg"
              placeholder="blur"
            />
          </div>
        </div>
        <h3 className="text-md font-semibold text-white">
          {t("app_card.subtitle")}
        </h3>
      </div>
    </div>
  );
};

export default ApplicationCard;
