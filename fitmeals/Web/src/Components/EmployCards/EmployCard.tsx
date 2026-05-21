"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RolesData } from "@/data/RolesData";
import Link from "@/src/Components/LocalizedLink";

const EmployCard = () => {
  const t = useTranslations("About");
  return (
    <div className="mt-20 h-max w-screen pb-5 pt-5  flex flex-col md:flex-row">
      <div className="md:w-[40%] w-screen  h-max md:ml-10 items-center flex xl:items-start flex-col xl:pl-17 xl:pt-30 justify-center">
        <h5 className="text-2xs mr-auto ml-3 lg:ml-0 lg:mr-0">{t("team.subtitle")}</h5>
        <h2 className="text-6xl mt-5 font-montserrat text-[#09220e] md:text-start text-center">
          {t("team.title")}
        </h2>
        <h4 className="text-xl mt-5 text-[#707d72] text-center md:text-left">
          {t("team.heading1")} <br />
          {t("team.heading2")} <br />
          {t("team.heading3")}{" "}
        </h4>
        <Link href="/contact/query" className="md:mr-auto lg:mr-0">
          <button className="w-30 auto bg-green-700 mt-5 text-white h-12 font-semibold rounded-2xl hover:bg-green-900 cursor-pointer shadow-xl active:shadow ">
            {t("team.btn")}
          </button>
        </Link>
      </div>
      <div className="w-[98%] h-max pb-3 pt-3 xl:p-5 ml-2 xl:ml-0 grid gap:6 xl:grid-cols-3 xl:grid-rows-2 grid-cols-2 grid-rows-2 xl:gap-2 place-items-center">
        {RolesData(t).map((item, index) => (
          <div
            className="xl:w-75 xl:h-87.5 w-40 h-60 lg:w-60 lg:h-80 mt-5 "
            key={item.sno}
          >
            <div className="w-40 h-40 xl:w-62.5 xl:h-75 lg:w-50  lg:h-50 relative overflow-hidden shadow-2xl group rounded-2xl">
              <Image
                src={item.image}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 250px"
                loading="lazy"
                alt="manager image"
                placeholder="blur"
                blurDataURL="/blur.jpeg"
                className=" object-top object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-115"
              />
            </div>
            <div className="pl-3 mt-2 font-semibold">
              <h2>{item.name}</h2>
              <h2>{item.role}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployCard;
