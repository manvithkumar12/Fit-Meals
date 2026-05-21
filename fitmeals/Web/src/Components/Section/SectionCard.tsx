"use client";
import React from "react";
import Image from "next/image";
import {
  getOrderFeatures,
  getCookbookFeatures,
  getDineInFeatures,
} from "../../../data/datafiles";
import { useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";

const SectionCard = () => {
  const [category, setCategory] = React.useState("order");
  const t = useTranslations("homepage");
  return (
    <div>
      <div className=" w-70 h-20 flex justify-center align-middle items-center ml-auto mr-auto md:w-full">
        <div
          onClick={() => setCategory("order")}
          className={`w-60 h-20 flex items-center justify-center cursor-pointer border-b-2  ${
            category === "order"
              ? "text-black border-b-black"
              : "text-black/40 border-b-black/40 hover:text-black hover:border-b-black"
          }`}
        >
          <p className="mt-auto mb-2">{t("section.order")}</p>
        </div>
        <div
          onClick={() => setCategory("cookbook")}
          className={`w-60 h-20 flex items-center justify-center cursor-pointer border-b-2 ${
            category === "cookbook"
              ? "text-black border-b-black"
              : "text-black/40 border-b-black/40 hover:text-black hover:border-b-black"
          }`}
        >
          <p className="mt-auto mb-2">{t("section.cookbook")}</p>
        </div>
        <div
          onClick={() => setCategory("dinein")}
          className={`w-60 h-20 flex items-center justify-center cursor-pointer border-b-2 ${
            category === "dinein"
              ? "text-black border-b-black"
              : "text-black/40 border-b-black/40 hover:text-black hover:border-b-black"
          }`}
        >
          <p className="mt-auto mb-2 whitespace-nowrap">{t("section.dinein")}</p>
        </div>
      </div>
      {category === "order" && (
        <div className="w-screen flex flex-col items-center justify-center">
          <div className=" text-2xl mt-10 text-center font-medium md:text-4xl">
            {t("section.orderintro")}
          </div>
          <Link href={`/services/${category}`}>
            <button className="h-10 px-6 w-max rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer mt-7 text-white transition font-semibold">
              {t("section.orderbtn")} →
            </button>
          </Link>
        </div>
      )}
      {category === "cookbook" && (
        <div className="w-screen flex flex-col items-center justify-center">
          <div className=" text-2xl mt-10 text-center font-medium md:text-4xl">
            {t("section.cookbookintro")}
          </div>
          <Link href={`/services/${category}`}>
            <button className="h-10 px-6 w-max rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer mt-7 text-white transition font-semibold">
              {t("section.cookbtn")} →
            </button>
          </Link>
        </div>
      )}
      {category === "dinein" && (
        <div className="w-screen flex flex-col items-center justify-center">
          <div className=" text-2xl mt-10 text-center font-medium md:text-4xl">
            {t("section.dineintro")}
          </div>
          <Link href={`/services/reservation`}>
            <button className="h-10 px-6 w-max rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer mt-7 text-white transition font-semibold">
              {t("section.dinebtn")} →
            </button>
          </Link>
        </div>
      )}

      <div className="w-full h-max p-3 mt-10 flex flex-col items-center justify-center xl:flex-row">
        <div className="w-70 relative h-50 md:w-90 md:h-90">
          {category === "order" && (
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/delivery.webp"
              alt="delivery"
              fill
              sizes="(min-width: 1280px) 50vw, 100vw"
              className="object-cover object-top rounded-2xl md:shadow-2xl"
              priority
              placeholder="blur"
              blurDataURL="/blur.jpeg"
            />
          )}
          {category === "cookbook" && (
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/cookbook.webp"
              alt="cookbook"
              fill
              sizes="(max-width:1280px),50vw,100vw"
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL="/blur.jpeg"
            />
          )}
          {category === "dinein" && (
            <Image
              src="https://drin721riupcf.cloudfront.net/web-assest/dinein.webp"
              alt="dinein"
              fill
              sizes="(max-width:1280px),50vw,100vw"
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL="/blur.jpeg"
            />
          )}
        </div>
        <div className="w-max  h-max mt-5  xl:ml-20 grid grid-cols-1 md:grid-cols-2 place-items-center xl:grid-cols-3 gap-5 lg:flex-row">
          {category === "order" &&
            getOrderFeatures(t).map((item, index) => (
              <div
                key={item.title}
                className="bg-[#efede5] h-55.5 w-70 p-2 flex flex-col justify-around pl-7 pr-7 rounded-3xl"
              >
                <i className={item.icon}></i>
                <div>
                  <h2 className="text-xl  font-medium">{item.title}</h2>
                  <h4 className="text-m font-medium text-[#09210f] mt-3">
                    {item.info}
                  </h4>
                </div>
              </div>
            ))}
          {category === "cookbook" &&
            getCookbookFeatures(t).map((item, index) => (
              <div
                key={item.title}
                className="bg-[#efede5] h-55.5 w-70 p-2 flex flex-col justify-around pl-7 pr-7 rounded-3xl"
              >
                <i className={item.icon}></i>
                <div>
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <h4 className="text-m font-medium text-[#09210f] mt-3">
                    {item.info}
                  </h4>
                </div>
              </div>
            ))}
          {category === "dinein" &&
            getDineInFeatures(t).map((item, index) => (
              <div
                key={item.title}
                className="bg-[#efede5] h-55.5 w-70 p-2  flex flex-col justify-around pl-7 pr-7 rounded-3xl"
              >
                <i className={item.icon}></i>
                <div>
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <h4 className="text-m font-medium text-[#09210f] mt-3">
                    {item.info}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SectionCard;
