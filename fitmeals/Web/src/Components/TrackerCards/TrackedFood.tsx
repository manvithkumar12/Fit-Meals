"use client";
import React, { useContext } from "react";
import FoodCard from "./FoodCard";
import { useTranslations } from "next-intl";
import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";
import FoodCardLoading from "./loadings/FoodCardLoading";
import { useLoggedFoods } from "@/src/query/useLoggedFood";

const LoggedMeals = () => {
  const t = useTranslations("Fit_tracker");
  const t2 = useTranslations("Fit_tracker.logged");
  const context = useContext(TrackGoalContext);
  const targetId = context?.targetId;
  const {
    data: loggedData,
    isLoading,
    isError,
    status,
  } = useLoggedFoods(targetId || 0);
  return (
    <div className="h-max p-3 bg-[#fbf8f2] w-90 md:w-full shadow-lg border border-black/20 rounded-md">
      <div className="flex flex-col">
        <h2 className="font-semibold">{t("section-3.title")}</h2>
        <h3 className="text-sm opacity-65">{t("section-3.description")}</h3>
      </div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full overflow-scroll gap-3">
        {isError ? (
          <div className="text-center text-sm  opacity-60 h-30 border bg-red-50 rounded-md border-red-500 text-red-500 p-2 flex justify-center items-center ">
            <p>{t2("error")}</p>
          </div>
        ) : isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <FoodCardLoading type={"logged"} key={index + 1} />
          ))
        ) : !loggedData || loggedData.length === 0 ? (
          <p className="text-center text-sm  opacity-60 h-30 border bg-white rounded-md border-gray-200 flex justify-center items-center ">
            {t2("empty")}
          </p>
        ) : (
          loggedData?.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              blsCode={food.fooditem.bls_code!}
              bg="bg-white"
              title={food.fooditem.foodname!}
              calories={food.loggedCalories}
              protein={food.loggedProtein}
              carbs={food.loggedCarbos}
              fats={food.loggedFat}
              status="logged"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LoggedMeals;
