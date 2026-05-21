"use client";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import React, { useContext } from "react";
import { FoodItemProps } from "@/app/api/actions/getDiet/addFood";
import DietFoodLoading from "./loadings/DietFoodLoading";
import ErrorComponent from "../errorComponent/ErrorComponent";
import { useTranslations } from "next-intl";

interface DietFoodCardProps {
  state: "Breakfast" | "Lunch" | "Dinner";
  addedItems: Record<string, boolean> | undefined;
  handleAddSubmit: (item: FoodItemProps) => Promise<void>;
  handledeleteSubmit: (item: FoodItemProps) => Promise<void>;
}

const DietFoodCard = ({
  state,
  addedItems,
  handleAddSubmit,
  handledeleteSubmit,
}: DietFoodCardProps) => {
  const context = useContext(DietContext);
  const data = context?.fetcheditems;
  const loading = context?.fetchedItemsLoading;
  const t = useTranslations("DietPlan");

  return (
    <div className="flex-col w-full pt-2 overflow-y-scroll h-full mt-2 flex  gap-4 hidebar">
      {loading && (
        <div>
          <DietFoodLoading />
        </div>
      )}
      {!loading && (!data?.[state] || data[state].length === 0) && (
        <div className="h-90 w-90 md:w-120 md:h-120 ml-auto mr-auto">
          <ErrorComponent
            whiteBg={true}
            label={t("error.no_results")}
            btnTxt={t("error.search_again")}
            refreshBtn
          />
        </div>
      )}
      {data?.[state]?.map((item, index) => (
        <div
          key={item.id}
          className="w-[95%] h-30 md:h-35 flex rounded-md bg-[#F0F0E5] shadow-md p-2 border border-gray-200"
        >
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">
              {item.foodname ?? t("foodCard.unknown")}
            </h1>
            <div className="flex flex-col text-sm font-semibold">
              <div className="flex gap-1">
                <h2>
                  {t("foodCard.calories")} {item.energy ?? 0} kcal
                </h2>
                •
                <h2>
                  {t("foodCard.protein")} {item.protein ?? 0} g
                </h2>
              </div>
              <div className="flex gap-1">
                <h2>
                  {t("foodCard.fats")} {item.fat ?? 0} g
                </h2>
                •
                <h2>
                  {t("foodCard.carbo")} {item.carbohydrate ?? 0} g
                </h2>
                •
                <h2>
                  {t("foodCard.salts")} {item.salt ?? 0} g
                </h2>
              </div>
            </div>
          </div>
          {addedItems?.[`${item.id}-${state}`] ? (
            <button
              onClick={() => handledeleteSubmit(item as FoodItemProps)}
              className="bg-red-300 font-semibold mt-auto rounded-md h-max w-max p-1 px-4 ml-auto text-black "
            >
              {t("foodCard.remove")}
            </button>
          ) : (
            <button
              onClick={() => handleAddSubmit(item as FoodItemProps)}
              className="bg-green-700 font-semibold mt-auto rounded-md h-max w-max p-1 px-4 ml-auto text-white"
            >
              {t("foodCard.add")}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DietFoodCard;
