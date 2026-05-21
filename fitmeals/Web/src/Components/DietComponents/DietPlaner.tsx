import {
  addFoodtoDiet,
  FoodItemProps,
  FoodType,
} from "@/app/api/actions/getDiet/addFood";
import { removeDietItem } from "@/app/api/actions/getDiet/removeFood";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import {
  dietFoodRes,
  SelectionContext,
} from "@/src/context/dietPlan/selectionContext";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import DietFoodCard from "./DietFoodCard";
import ProgressValues from "./ProgressValues";
import { useTranslations } from "next-intl";

const DietPlaner = () => {
  const context = useContext(DietContext);
  const context2 = useContext(SelectionContext);
  const macros = context?.macros;
  const t = useTranslations("DietPlan");
  const timedMacros = context?.timedMacros;
  const addedItems = context2?.addedItems;
  const dietItems = context2?.dietItems;
  const setAddedItems = context2?.setAddedItems;
  const setDietItems = context2?.setDietItems;
  const userDietId = context?.userdietid;
  const [state, setState] = useState<"Breakfast" | "Lunch" | "Dinner">(
    "Breakfast",
  );
  const handleSubmit = async (item: FoodItemProps, foodType: FoodType) => {
    if (!userDietId) throw new Error("No diet ID");
    await addFoodtoDiet(userDietId, item, foodType);
  };
  const handleDelete = async (itemId: number, mealType: FoodType) => {
    if (!userDietId) return null;
    await removeDietItem(userDietId, itemId, mealType);
  };
  const handleAddSubmit = async (item: FoodItemProps) => {
    const key = `${item.id}-${state}`;
    setAddedItems?.((prev) => ({
      ...prev,
      [key]: true,
    }));
    const snapShot = dietItems;
    try {
      setDietItems?.(
        (prev) =>
          [
            ...prev,
            {
              foodItemId: item.id,
              foodType: state,
              quantity: 1,
              protein: item.protein,
              carbos: item.carbohydrate,
              calories: item.energy,
              fats: item.fat,
              foodItem: { foodname: item.foodname },
            },
          ] as dietFoodRes,
      );
      await handleSubmit(item as FoodItemProps, state as FoodType);
    } catch (error: any) {
      setDietItems?.(snapShot as dietFoodRes);
      setAddedItems?.((prev) => ({
        ...prev,
        [key]: false,
      }));
      toast.error(error?.message || "An error occurred");
    }
  };
  const handledeleteSubmit = async (item: FoodItemProps) => {
    setAddedItems?.((prev) => ({
      ...prev,
      [`${item.id}-${state}`]: false,
    }));
    const snapShot = dietItems;
    try {
      setDietItems?.((prev) => prev?.filter((i) => i.foodItemId !== item.id));
      await handleDelete(item.id, state);
    } catch (error: any) {
      setDietItems?.(snapShot as dietFoodRes);
      setAddedItems?.((prev) => ({
        ...prev,
        [`${item.id}-${state}`]: true,
      }));
      toast.error(error?.message || "An error occurred");
      setAddedItems?.((prev) => ({
        ...prev,
        [`${item.id}-${state}`]: true,
      }));
    }
  };
  return (
    <div className="h-100 w-90 md:w-120 lg:w-200 lg:h-150 flex pl-3 flex-col">
      <div className="flex text-sm md:text-md w-[90%] flex-col">
        <h2 className="font-semibold text-md lg:text-lg underline">
          {t("dailyGoal.title")}
        </h2>
        <div className="flex gap-1 text-md flex-wrap w-full">
          <h3 className="font-semibold">
            {t("dailyGoal.calories")} {macros?.dailyCalories ?? 0} kcal 🔥
          </h3>
          •
          <h3 className="font-semibold">
            {t("dailyGoal.protein")} {macros?.dailyprotein ?? 0} g 💪{" "}
          </h3>
          •
          <h3 className="font-semibold">
            {t("dailyGoal.fats")} {macros?.dailyfat ?? 0} g 🥑{" "}
          </h3>
          •
          <h3 className="font-semibold">
            {t("dailyGoal.carbs")} {macros?.dailycarb ?? 0} g 🍚{" "}
          </h3>
        </div>
        <h2 className="text-md font-semibold mt-1">
          {t("dailyGoal.achieve1")}
          {macros?.days ?? 0}
          {t("dailyGoal.achieve2")}
        </h2>

        <h2 className="text-sm text-gray-600 font-semibold">
          {t("dailyGoal.selectFood")}
        </h2>
      </div>
      <div className="flex mt-2 text-sm md:text-md items-center">
        <button
          onClick={() => setState("Breakfast")}
          className="p-2 bg-white border border-gray-200 w-25 hover:bg-green-200"
        >
          {t("dailyGoal.breakfast")}
        </button>
        <button
          onClick={() => setState("Lunch")}
          className="p-2 bg-white border border-gray-200 w-25 hover:bg-green-200"
        >
          {t("dailyGoal.lunch")}
        </button>
        <button
          onClick={() => setState("Dinner")}
          className="p-2 bg-white border border-gray-200 w-25 hover:bg-green-200"
        >
          {t("dailyGoal.dinner")}
        </button>
      </div>
      <ProgressValues
        timedMacros={timedMacros}
        dietItems={dietItems}
        state={state}
      />
      <DietFoodCard
        state={state}
        addedItems={addedItems}
        handleAddSubmit={handleAddSubmit}
        handledeleteSubmit={handledeleteSubmit}
      />
    </div>
  );
};

export default DietPlaner;
