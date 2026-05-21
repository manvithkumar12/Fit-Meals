"use client";
import React, { useContext, useState } from "react";
import { DietCardProps } from "@/src/types/DietCard.types";
import { useTranslations } from "next-intl";
import "@/app/[locale]/(public)/page.css";
import { SelectionContext } from "@/src/context/dietPlan/selectionContext";
import RowLoading from "./loadings/RowLoading";
import { PlainPopUp } from "../PopUp/Popup";
import QuantitySection, { FoodDetails } from "./QuantitySection";
import { removeDietItem } from "@/app/api/actions/getDiet/removeFood";
import { FoodType } from "@/app/api/actions/getDiet/addFood";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { toast } from "react-toastify";

const DietCard = ({ mealTime, mealType }: DietCardProps) => {
  const t = useTranslations("DietPlan");

  const context = useContext(SelectionContext);
  const context2 = useContext(DietContext);

  const dietItems = context?.dietItems;
  const setDietItems = context?.setDietItems;
  const Itemsloading = context?.loading;

  const userDietId = context2?.userdietid;

  const [pendingDeletes, setPendingDeletes] = useState<Set<string>>(new Set());

  const [selectedfood, setSelectedItem] = useState<FoodDetails>({
    calories: 0,
    carbos: 0,
    fats: 0,
    foodItem: { foodname: "N/A" },
    foodItemId: 0,
    foodType: "N/A",
    protein: 0,
    quantity: 0,
  });

  const [selectpopup, setSelectPopup] = useState(false);

  const handleDelete = async (itemId: number, mealType: FoodType) => {
    if (!userDietId) return;
    await removeDietItem(userDietId, itemId, mealType);
  };

  const totalSum = (key: "protein" | "calories" | "fats", mealType: string) => {
    return (
      dietItems
        ?.filter((item) => item.foodType === mealType)
        .reduce((acc, item) => {
          return Math.round((acc + Number(item[key] ?? 0)) * 100) / 100;
        }, 0) ?? 0
    );
  };

  return (
    <div className="min-h-10 max-h-55 w-full border border-gray-200 rounded-lg bg-[#f0f0e5] flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-center border-b p-1 border-black/20">
        <h1 className="font-semibold md:text-[17px] mr-auto">{mealTime}</h1>

        <div className="md:ml-auto ml-5 flex gap-2 text-sm items-center md:text-[13px]">
          <h2>
            <span className="font-bold">{totalSum("protein", mealType)}g</span>{" "}
            {t("Navbar.Protein")}
          </h2>
          <h2>
            <span className="font-bold">{totalSum("calories", mealType)}</span>{" "}
            {t("Navbar.Calories")}
          </h2>
          <h2>
            <span className="font-bold">{totalSum("fats", mealType)}g</span>{" "}
            {t("Navbar.Fats")}
          </h2>
        </div>
      </div>

      {/* BODY */}
      <div className="w-full min-h-10 mt-1 flex">
        {Itemsloading || !dietItems ? (
          <div className="w-full h-45 p-2 overflow-y-scroll hidebar flex justify-center">
            <RowLoading />
          </div>
        ) : dietItems.filter((m) => m.foodType === mealType).length === 0 ? (
          <div className="h-45 flex justify-center w-full pt-10 text-center font-semibold">
            {t("timeTable.noItems")} {mealTime} {t("timeTable.yet")} <br />
            {t("timeTable.addItems")}
          </div>
        ) : (
          <div className="w-full h-45 p-2 overflow-y-scroll hidebar flex justify-center">
            <div className="flex flex-col w-full gap-1">
              {dietItems
                .filter((meal) => meal.foodType === mealType)
                .map((meal) => {
                  const id = `${meal.foodItemId}-${meal.foodType}`;
                  const isDeleting = pendingDeletes.has(id);

                  return (
                    <div
                      key={id}
                      className="flex border-b border-black h-max md:text-[17px] p-1"
                    >
                      <h2 className="w-[90%] pl-2 text-sm md:text-[15px]">
                        {meal.foodItem?.foodname?.split(/[,(]/)[0]} (
                        {meal.protein}g {t("Navbar.Protein")})
                      </h2>

                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            setPendingDeletes((prev) => new Set(prev).add(id));

                            setDietItems?.((prev) =>
                              (prev ?? []).filter(
                                (item) =>
                                  `${item.foodItemId}-${item.foodType}` !== id,
                              ),
                            );

                            try {
                              await handleDelete(
                                meal.foodItemId,
                                mealType as FoodType,
                              );
                            } catch (e) {
                              toast.error("Failed to remove item");

                              setDietItems?.((prev) => [...(prev ?? []), meal]);
                            } finally {
                              setPendingDeletes((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(id);
                                return newSet;
                              });
                            }
                          }}
                          className={`bg-red-500 h-6 w-6 flex justify-center items-center md:h-7 rounded-md px-2 ${
                            isDeleting ? "opacity-50" : ""
                          }`}
                        >
                          <i className="fa-solid text-[15px] fa-xmark"></i>
                        </button>

                        <button
                          onClick={() => {
                            setSelectPopup(true);
                            setSelectedItem(meal);
                          }}
                          className="bg-green-500 h-6 w-6 flex justify-center items-center md:h-7 rounded-md px-2"
                        >
                          <i className="fa-solid fa-check text-sm text-white"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {selectpopup && (
        <PlainPopUp setPopUp={setSelectPopup}>
          <QuantitySection
            selectedItem={selectedfood}
            popUpState={setSelectPopup}
          />
        </PlainPopUp>
      )}
    </div>
  );
};

export default DietCard;
