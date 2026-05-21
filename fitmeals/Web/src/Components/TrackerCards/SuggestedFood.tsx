"use client";

import React, { useContext, useState } from "react";
import FoodCard from "./FoodCard";
import { useTranslations } from "next-intl";
import FoodCardLoading from "./loadings/FoodCardLoading";
import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";
const SuggestedFood = () => {
  const t = useTranslations("Fit_tracker");
  const t2 = useTranslations("Fit_tracker.suggested");
  const context = useContext(TrackGoalContext);
  const data = context?.Response;
  const isPending = context?.recommendationLoading;
  const error = context?.recommendationError;
  const [max, setmax] = useState<number>(4);
  const foods =
    globalThis.window !== undefined && window.innerWidth < 768
      ? data?.slice(0, max)
      : data;
  return (
    <div className="h-max p-3 bg-[#fbf8f2] w-90 md:w-full shadow-lg border border-black/20 rounded-md">
      <h2 className="font-semibold">{t("section-1.title")}</h2>

      <h3 className="text-sm opacity-65">{t("section-1.description")}</h3>

      <div className="mt-3 grid md:grid-cols-2 w-full place-items-center lg:grid-cols-3 flex-wrap gap-3">
        {isPending ? (
          Array.from({ length: 6 }, (_, index) => (
            <FoodCardLoading type="suggestion" key={index} />
          ))
        ) : error ? (
          <p className="text-center text-sm w-full opacity-60 h-30 mr-auto border bg-red-50 rounded-md border-red-500 text-red-500 p-2 flex justify-center items-center">
            {t2("error")}
          </p>
        ) : data ? data.length === 0 ? (
          <div className="text-center text-sm w-full mr-auto opacity-60 h-30 border bg-white rounded-md border-gray-300 p-2 flex justify-center items-center">
            <p>{t2("empty")}</p>
          </div>
        ) : (
          foods?.map((item, index) => (
            <FoodCard
              key={item.foodname}
              id={index + 1}
              bg="bg-white"
              title={item.foodname}
              calories={item.calories}
              protein={item.protein}
              carbs={item.carbs}
              fats={item.fat}
              score={item.match_percent}
              status="suggestion"
            />
          ))
        ) : (
          <div className="text-center text-sm w-full opacity-60 mr-auto h-30 border bg-white rounded-md border-gray-300 p-2 flex justify-center items-center">
            <p>{t2("prefer")}</p>
          </div>
        )}
      </div>
      {data && data.length > max ? (
        <button
          onClick={() => {
            setmax((prev) => prev + 2);
          }}
          className={`mt-4 ml-auto bg-green-700 text-white px-4 py-2 rounded-md shadow-lg active:shadow cursor-pointer md:hidden`}
        >
          {t2("more")}
        </button>
      ) : (
        <button
          onClick={() => {
            setmax((prev) => 4);
          }}
          className={`mt-4 ml-auto bg-green-700 text-white px-4 py-2 rounded-md shadow-lg active:shadow cursor-pointe md:hiddenr ${max === 4 ? "hidden" : ""}`}
        >
          {t2("less")}
        </button>
      )}
    </div>
  );
};

export default SuggestedFood;
