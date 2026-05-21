"use client"
import React from "react";
import { useTranslations } from "next-intl";
import { FaqData } from "@/data/Faqdata";

const FaqCards = () => {
    const t = useTranslations("homepage");
    return (
    <>
      <div className="h-max w-full ">
        <h4 className="text-2xl  md:ml-5 text-center md:text-left  md:text-6xl font-semibold font-montserrat">
          {t("faq.title")}
        </h4>
        <h4 className="md:mt-2 p-1  md:ml-5 text-center md:text-left text-sm ">{t("faq.subtitle")}</h4>
      </div>
      <div className="flex flex-col w-screen justify-center align-middle items-center h-max gap-5 pt-5 mt-3 pb-5">
        {FaqData(t).map((item, index) => (
          <div
            className="w-[97%]  h-max  flex flex-col md:flex-row items-center border-b border-b-black"
            key={index + 1}
          >
            <div className="question mr-auto w-[50%] text-sm ml-1.5 md:ml-0  font-bold md:text-2xl md:font-medium">
              {item.question}
            </div>
            <div className="answer md:text-lg text-md  ml-3 w-full md:w-[50%] font-light font-[#838e83]  md:ml-auto mb-2.5">
              {item.solution}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqCards;
