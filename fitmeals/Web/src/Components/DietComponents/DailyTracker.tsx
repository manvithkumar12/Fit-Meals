"use client";

import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { loggedMealContext } from "@/src/context/loggedMeals/loggedMeal.Context";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";

const DailyTracker = () => {
  const t = useTranslations("DietPlan.Navbar");
  const context = useContext(DietContext);

  const context2 = useContext(loggedMealContext);

  const targetMacros = context?.macros;

  const dailyLoggedData = context2?.dailyTargets;

  const refreshProgress = context2?.refreshProgress;

  const [rotate, setRotate] = useState(false);

  return (
    <div className="w-full bg-[#f0f0e5] py-2 flex flex-wrap justify-center items-center rounded-md gap-2">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold whitespace-nowrap lg:text-[16px]  md:block text-md">
          {t("todaysProgress")}:
        </h1>

        <button
          onClick={() => {
            setRotate(true);

            refreshProgress?.();

            setTimeout(() => {
              setRotate(false);
            }, 300);
          }}
          className={`cursor-pointer transition-transform duration-300 ${
            rotate ? "rotate-180" : ""
          }`}
        >
          <i className="fa-solid fa-arrows-rotate text-sm"></i>
        </button>
      </div>

      {/* CARDS */}
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {/* CALORIES */}
        <div className="p-1 bg-green-400 md:text-[16px] text-xs text-white px-2 rounded-md whitespace-nowrap">
          {t("Calories")} = {Math.round(dailyLoggedData?.totalCalories || 0)}/
          {Math.round(targetMacros?.dailyCalories || 0)}Kcal
          <i className="fa-solid fa-fire ml-2 text-orange-400"></i>
        </div>

        {/* PROTEIN */}
        <div className="p-1 bg-blue-400 md:text-[16px] text-xs text-white px-2 rounded-md whitespace-nowrap">
          Protein = {Math.round(dailyLoggedData?.totalProtein || 0)}/
          {Math.round(targetMacros?.dailyprotein || 0)}g
        </div>

        {/* CARBS */}
        <div className="p-1 bg-yellow-400 md:text-[16px] text-xs text-white px-2 rounded-md whitespace-nowrap">
          {t("Carbo")} = {Math.round(dailyLoggedData?.totalCarbs || 0)}/
          {Math.round(targetMacros?.dailycarb || 0)}g
        </div>

        {/* FATS */}
        <div className="p-1 bg-red-500 md:text-[16px] text-xs text-white px-2 rounded-md whitespace-nowrap">
          {t("Fats")} = {Math.round(dailyLoggedData?.totalFats || 0)}/
          {Math.round(targetMacros?.dailyfat || 0)}g
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;
