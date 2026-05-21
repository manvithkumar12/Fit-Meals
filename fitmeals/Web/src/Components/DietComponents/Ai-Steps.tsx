"use client";
import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { PlainPopUp } from "../PopUp/Popup";
import "@/app/[locale]/(public)/page.css";
import DietPlaner from "./DietPlaner";

const AiSteps = () => {
  const t = useTranslations("DietPlan");
  const context = useContext(DietContext);
  const handleSubmit = context?.handlePlanSubmit;
  const handleloading = context?.submitloading;
  const showitem = context?.itemspopup;
  const setShowitem = context?.setItemsPopup!;
  const points = [
    t("Methodology.point1"),
    t("Methodology.point2"),
    t("Methodology.point3"),
    t("Methodology.point4"),
  ];
  return (
    <div className="h-max w-full flex flex-col bg-[#F0F0E5] p-2  border border-gray-200 rounded-lg">
      <h2 className="font-semibold md:text-[17px]">{t("Methodology.title")}</h2>
      {points.map((items, index) => (
        <h2 className="text-sm ml-2 md:text-[17px]" key={items + index}>
          {index + 1}.{items}
        </h2>
      ))}
      <button
        onClick={handleSubmit}
        disabled={handleloading}
        className={`bg-green-700 p-2 text-xs mt-2 md:text-[16px] text-white font-semibold w-max ml-auto rounded-md ${handleloading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {t("ai_steps.createbtn")}
      </button>
      {showitem && setShowitem && (
        <div className=" absolute h-100 w-90">
          <PlainPopUp setPopUp={setShowitem}>
            <DietPlaner />
          </PlainPopUp>
        </div>
      )}
    </div>
  );
};

export default AiSteps;
