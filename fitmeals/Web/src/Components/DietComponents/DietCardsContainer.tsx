"use client";
import React, { useContext } from "react";
import DietCard from "./DietCard";
import { SelectionContext } from "@/src/context/dietPlan/selectionContext";
import DaysCard from "./DaysCard";
import { useTranslations } from "next-intl";

const DietCardsContainer = () => {
  const context = useContext(SelectionContext);
  const Items = context?.dietItems;
  const t = useTranslations("DietPlan.timeTable");
  const breakfastItems = Items?.filter((i) => i.foodType === "Breakfast") || [];
  const lunchItems = Items?.filter((i) => i.foodType === "Lunch") || [];
  const dinnerItems = Items?.filter((i) => i.foodType === "Dinner") || [];
  return (
    <div className="w-full grid md:p-1 place-items-center gap-4 grid-cols-1 md:grid-cols-2">
      <DaysCard />
      <DietCard
        mealType="Breakfast"
        mealTime={t("breakFast")}
        itemsData={breakfastItems}
      />
      <DietCard mealType="Lunch" mealTime={t("lunch")} itemsData={lunchItems} />
      <DietCard mealType="Dinner" mealTime={t("dinner")} itemsData={dinnerItems} />
    </div>
  );
};

export default DietCardsContainer;
