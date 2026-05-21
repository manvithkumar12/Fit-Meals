"use client";
import { SelectionContext } from "@/src/context/dietPlan/selectionContext";
import { loggedMealContext } from "@/src/context/loggedMeals/loggedMeal.Context";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";

interface LoggedMeal {
  id: string;
  name: string;
  quantity: string;
}

type MealType = "Breakfast" | "Lunch" | "Dinner";

const DailyLoggedMeals = () => {
  const [activeTab, setActiveTab] = useState<MealType>("Breakfast");
  const context = useContext(loggedMealContext);
  const t = useTranslations("DietPlan");
  const context2 = useContext(SelectionContext);
  const Items = context2?.dietItems;
  const lengthofItems = () => {
    return Items?.filter((item) => item.foodType === activeTab)?.length;
  };
  const BreakFast = context?.loggedbreakFast;
  const Lunch = context?.loggedLunch;
  const Dinner = context?.loggedDinner;
  const mealData = {
    Breakfast: BreakFast,
    Lunch: Lunch,
    Dinner: Dinner,
  };
  const tabs: MealType[] = ["Breakfast", "Lunch", "Dinner"];
  const activeData = mealData[activeTab];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex w-full border-b border-gray-300 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-sm font-semibold transition-all duration-200 border-b-2 ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab === "Breakfast"
              ? t("timeTable.breakFast")
              : tab === "Lunch"
                ? t("timeTable.lunch")
                : t("timeTable.dinner")}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 px-1 py-1.5 mb-2 border-b border-gray-200">
        <span className="bg-green-500 p-2 rounded-md text-white font-bold">
          {t("timeTable.mealsLogged")}{" "}
          <span className="font-bold">{activeData?.length}</span>
        </span>
        <span className="bg-red-500 p-2 rounded-md text-white font-bold">
          {t("timeTable.remaining")}{" "}
          <span className="font-bold">{lengthofItems()}</span>
        </span>
      </div>

      {/* Meal Rows */}
      <div className="flex-1 overflow-y-auto hidebar flex flex-col gap-1">
        {activeData?.length! > 0 ? (
          activeData?.map((item, index) => (
            <div
              key={index + 1}
              className="flex justify-between items-center text-sm py-1.5 border-b border-black/10 last:border-0"
            >
              <span className="font-medium text-gray-800">
                {item.loggedItems?.map((item) => item?.foodname)}
              </span>
              <span className="text-gray-500 text-xs bg-white px-2 py-0.5 rounded-md border border-gray-200">
                {item.loggedQuantity} gm
              </span>
            </div>
          ))
        ) : (
          <span className="text-md  text-center text-black font-semibold mt-2">
            {t("timeTable.noItems")}{" "}
            {activeTab === "Breakfast"
              ? t("timeTable.breakFast")
              : activeTab === "Lunch"
                ? t("timeTable.lunch")
                : t("timeTable.dinner")}{" "}
            {t("timeTable.yet")}
          </span>
        )}
      </div>
    </div>
  );
};

export default DailyLoggedMeals;
