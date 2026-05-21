import React from "react";
import { FoodPrediction } from "@/src/types/recognition/recognition.types";
import { nutritionData } from "@/app/api/actions/Recognize/foodData";
import { useTranslations } from "next-intl";

interface NutritionCardProps {
  predictions: FoodPrediction[];
  quantity: number;
  setQuantity: (q: number) => void;
}

function getMacrosForFood(foodName: string) {
  const normalizedFood = foodName.toLowerCase().replaceAll('_', " ");

  for (const [key, value] of Object.entries(nutritionData)) {
    if (key.toLowerCase().replaceAll('_', " ") === normalizedFood) {
      return value;
    }
  }

  return { calories: 0, protein: 0, carbs: 0, fat: 0 };
}

export default function NutritionCard({
  predictions,
  quantity,
  setQuantity,
}: Readonly<NutritionCardProps>) {
  const t = useTranslations("Recognition.nutritionCard");
  const tCategories = useTranslations("Recognition.categories");

  if (!predictions || predictions.length === 0) return null;

  // Only use the top prediction
  const topPredictionName = predictions[0]?.food || "Unknown";
  const baseMacros = getMacrosForFood(topPredictionName);
  const multiplier = quantity / 100;

  const currentMacros = {
    calories: Math.round(baseMacros.calories * multiplier),
    protein: (baseMacros.protein * multiplier).toFixed(1),
    carbs: (baseMacros.carbs * multiplier).toFixed(1),
    fat: (baseMacros.fat * multiplier).toFixed(1),
  };

  const displayName = topPredictionName
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // @ts-ignore
  const translatedName = tCategories(displayName);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col shrink-0 mb-4">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{t("title")}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {t("forTopMatch")}{" "}
            <span className="font-medium text-slate-700">{translatedName}</span>
          </p>
        </div>

        <div className="flex flex-col bg-slate-50 p-3 rounded-2xl border border-slate-100 w-full mt-2">
          <label
            htmlFor="quantitySidebar"
            className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-1"
          >
            {t("portionSize")}
          </label>
          <div className="relative flex items-center">
            <input
              id="quantitySidebar"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              className="w-full pl-4 pr-2 py-2 border-2 border-slate-200 rounded-xl text-base font-bold text-slate-800 bg-white shadow-sm hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:appearance-auto"
            />
            <span className="absolute right-8 text-sm font-semibold text-slate-400 pointer-events-none">
              {t("g")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-xs text-slate-500 mb-1 font-medium">
            {t("calories")}
          </span>
          <span className="text-2xl font-bold text-slate-800">
            {currentMacros.calories}{" "}
            <span className="text-sm font-normal text-slate-500">
              {t("kcal")}
            </span>
          </span>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-xs text-slate-500 mb-1 font-medium">
            {t("protein")}
          </span>
          <span className="text-2xl font-bold text-slate-800">
            {currentMacros.protein}{" "}
            <span className="text-sm font-normal text-slate-500">{t("g")}</span>
          </span>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-xs text-slate-500 mb-1 font-medium">
            {t("carbs")}
          </span>
          <span className="text-2xl font-bold text-slate-800">
            {currentMacros.carbs}{" "}
            <span className="text-sm font-normal text-slate-500">{t("g")}</span>
          </span>
        </div>
        <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex flex-col justify-center">
          <span className="text-xs text-slate-500 mb-1 font-medium">
            {t("fats")}
          </span>
          <span className="text-2xl font-bold text-slate-800">
            {currentMacros.fat}{" "}
            <span className="text-sm font-normal text-slate-500">{t("g")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
