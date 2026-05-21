"use client";
import React, { useContext, useState } from "react";
import ProgressRing from "../TrackerCards/ProgressCard";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import "@/app/[locale]/(public)/page.css";
import { loggedMealContext } from "@/src/context/loggedMeals/loggedMeal.Context";
import { useTranslations } from "next-intl";

const DaysCard = () => {
  const context = useContext(DietContext);
  const macros = context?.macros;
  const t = useTranslations("DietPlan");
  const CreatedDate = context?.creationDate;
  const [rotate, setRotate] = useState(false);
  const context2 = useContext(loggedMealContext);
  const totalData = context2?.totalData;
  const refreshProgress = context2?.refreshProgress;
  const convertToMonth = (value: number | undefined) => {
    if (value === undefined || macros?.days === undefined) return 0;
    return value * macros.days;
  };
  return (
    <div className=" bg-[#f0f0e5] hidden md:block h-45 border md:h-55 border-gray-200 rounded-md pt-2 w-full">
      <div className="border-b border-black w-full items-center pb-1 pr-2 pl-2 font-semibold h-max flex">
        <h1 className="md:text-[15px] whitespace-nowrap">
          {t("timeTable.progressFor")} {macros?.days || 0} {t("timeTable.days")}
        </h1>
        <div className="ml-auto text-[12px] text-xs whitespace-nowrap md:text-md">
          {CreatedDate
            ? new Date(CreatedDate).toLocaleDateString()
            : "00/00/0000"}
        </div>
        <button
          onClick={() => {
            setRotate(true);
            refreshProgress?.();
            setTimeout(() => setRotate(false), 300);
          }}
          className={`ml-2 cursor-pointer transition-transform duration-300 ${
            rotate ? "rotate-180" : ""
          }`}
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <div className="h-45 overflow-x-scroll p-1 pl-2 xl:overflow-x-hidden  hidebar  overflow-y-hidden justify-around md:items-center gap-3 flex">
        <div className="w-25 flex mt-2 text-xs justify-center h-34">
          <ProgressRing
            top_gap="top-9"
            value={Math.round(totalData?.totalCalories ?? 0)}
            textSize="text-[15px]"
            max={convertToMonth(macros?.dailyCalories) ?? 0}
            label={t("Suggestions.Calories")}
            unit="g"
            radiusLG={80}
            smallText={true}
            radiusSM={10}
          />
        </div>
        <div className="w-25 flex mt-2 text-xs justify-center h-34">
          <ProgressRing
            strokeclr="#3b82f6"
            top_gap="top-9"
            value={Math.round(totalData?.totalProtein ?? 0)}
            textSize="text-[15px]"
            max={convertToMonth(macros?.dailyprotein) ?? 0}
            label={t("Navbar.Protein")}
            unit="g"
            smallText={true}
            radiusLG={80}
            radiusSM={10}
          />
        </div>
        <div className="w-25 flex mt-2 text-xs justify-center h-34">
          <ProgressRing
            strokeclr="#f59e0b"
            top_gap="top-9"
            value={Math.round(totalData?.totalCarbs ?? 0)}
            textSize="text-[15px]"
            max={convertToMonth(macros?.dailycarb) ?? 0}
            label={t("Navbar.Carbo")}
            unit="g"
            radiusLG={80}
            radiusSM={10}
            smallText={true}
          />
        </div>

        <div className="w-25 flex mt-2 text-xs justify-center h-34">
          <ProgressRing
            top_gap="top-9"
            smallText={true}
            color="red"
            strokeclr="#ef4444"
            value={Math.round(totalData?.totalFats ?? 0)}
            textSize="text-[15px]"
            max={convertToMonth(macros?.dailyfat) ?? 0}
            label={t("Navbar.Fats")}
            unit="g"
            radiusLG={80}
            radiusSM={10}
          />
        </div>
      </div>
    </div>
  );
};

export default DaysCard;
