"use client";
import React from "react";
import { ProcessData } from "@/data/AboutProcess";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";
const AboutCards = () => {
  const t = useTranslations("About");
  const user = useUser();
  const t2 = useTranslations("toast");
  return (
    <>
      <div className="flex w-[98%] gap-5 mt-20 flex-col flex-wrap md:justify-center items-center  md:flex-row">
        {ProcessData(t).map((item) => (
          <div
            className=" h-max gap-5 w-[95%] md:w-100  flex flex-col justify-center items-center"
            key={item.title}
          >
            <div className="img-container w-80 h-50 md:w-87.5 md:h-62.5 rounded-2xl relative">
              <Image
                src={item.imgUrl}
                fill
                sizes="(max-width: 768px) 320px, 350px"
                loading="lazy"
                placeholder="blur"
                blurDataURL="./blur.jpeg"
                className="rounded-2xl shadow-2xl"
                alt="image"
              />
            </div>
            <h4 className="text-center mt-3 w-80  md:w-87.5 text-gray-700 ">
              <span className="font-bold">{item.title}</span> <br /> {item.info}
            </h4>
          </div>
        ))}
      </div>
      <button
        className="w-55 mt-10 bg-green-700 text-white h-12 font-semibold rounded-2xl hover:bg-green-900 cursor-pointer shadow-xl active:shadow"
        onClick={() => {
          if (!user?.id) {
            toast.warning(t2("about.pleaseLogin"));
            return;
          }
          toast.success(t2("about.callbacksoon"));
        }}
      >
        {t("details.btn")}
        <i className="fa-solid fa-phone font-[#ffffff] ml-2"></i>
      </button>
    </>
  );
};

export default AboutCards;
