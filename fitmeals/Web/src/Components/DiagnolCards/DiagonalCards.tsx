"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";

const DiagonalCards = () => {
  const t = useTranslations("About");
  return (
    <div className="w-screen md:w-[80%] h-max p-4 ml-auto mr-auto mt-10">
      <div className="w-full flex p-2 ">
        <div className=" h-30 w-40 md:h-50 md:w-50 relative mr-auto rounded-2xl hidden md:block shadow-2xl mb-2">
          <Image
            src="https://drin721riupcf.cloudfront.net/web-assest/img4.webp"
            alt="image"
            fill
            sizes="(max-width: 768px) 160px, 200px"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
            className="object-cover rounded-2xl"
          />
        </div>
        <div className=" h-30 w-40 md:h-50 md:w-50 relative ml-auto rounded-2xl  shadow-2xl mb-2">
          <Image
            src="https://drin721riupcf.cloudfront.net/web-assest/img3.webp"
            alt="image"
            fill
            sizes="(max-width: 768px) 160px, 200px"
            loading="lazy"
            className="object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
          />
        </div>
      </div>
      <div className="  w-[95%] mr-auto ml-auto md:mr-0 md:ml-0 md:w-full flex flex-col justify-center items-center mt-10 md:mt-0">
        <h4 className=" text-4xl md:text-6xl text-center">
          {t("discover.title")}
        </h4>
        <h6 className="mt-5 md:mt-2 text-center text-m md:w-[40%]">
          {t("discover.subtitle")}
        </h6>
        <Link href="/services/order/1">
          <button className="w-max p-3 pl-7 pr-7  bg-green-700 mt-5 md:mt-2 mb-5 text-white h-12 font-semibold rounded-2xl hover:bg-green-900 cursor-pointer shadow-xl active:shadow ">
            {t("discover.btn")}
          </button>
        </Link>
      </div>
      <div className="w-full flex p-2 ">
        <div className=" h-30 w-40 md:h-50 md:w-50 relative mr-auto rounded-2xl shadow-2xl mb-2">
          <Image
            src="https://drin721riupcf.cloudfront.net/web-assest/img2.webp"
            alt="image"
            fill
            sizes="(max-width: 768px) 160px, 200px"
            loading="lazy"
            className="object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
          />
        </div>
        <div className=" h-30 w-40 md:h-50 md:w-50 relative ml-auto rounded-2xl hidden md:block shadow-2xl mb-2">
          <Image
            src="https://drin721riupcf.cloudfront.net/web-assest/img1.webp"
            alt="image"
            fill
            sizes="(max-width: 768px) 160px, 200px"
            loading="lazy"
            className="object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default DiagonalCards;
