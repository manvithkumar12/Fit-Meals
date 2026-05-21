import React from "react";
import { TimedMacrosType } from "@/src/context/dietPlan/dietPlanContext";
import { dietFoodRes } from "@/src/context/dietPlan/selectionContext";
import { useTranslations } from "next-intl";

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-30 h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-500 transition-all duration-300"
      style={{ width: `${Math.min(value, 100)}%` }}
    />
  </div>
);

const ProgressValues = ({
  dietItems,
  timedMacros,
  state,
}: {
  dietItems: dietFoodRes | undefined;
  timedMacros: TimedMacrosType | null | undefined;
  state: "Breakfast" | "Lunch" | "Dinner";
}) => {
  const t = useTranslations("DietPlan");

  const totalSum = (
    key: "protein" | "calories" | "fats" | "carbos",
    mealType: string,
  ) => {
    return (
      dietItems
        ?.filter((item) => item.foodType === mealType)
        .reduce((acc, item) => {
          return Math.round((acc + Number(item[key] ?? 0)) * 100) / 100;
        }, 0) ?? 0
    );
  };

  const compare = (reqTarget: number, loggedValue: number) => {
    if (reqTarget <= loggedValue) {
      return <i className="fa-solid fa-circle-check text-green-500"></i>;
    }
    return <i className="fa-solid fa-circle-xmark text-red-500"></i>;
  };

  return (
    <div className="mt-2 ml-1 flex text-sm font-semibold">
      <div className="flex w-full flex-wrap gap-1 text-md lg:flex-col">
        <h2>
          {t(`dailyGoal.${state.toLowerCase()}`)} {t("dailyGoal.added_goals")}
        </h2>

        {/* Calories */}
        <div className="flex w-full items-center gap-2 md:gap-5">
          <h3 className="font-semibold">
            {t("dailyGoal.calories")} {timedMacros?.[state]?.calories ?? 0} kcal
            / {totalSum("calories", state)} kcal
          </h3>

          <ProgressBar
            value={
              timedMacros?.[state]?.calories
                ? (totalSum("calories", state) / timedMacros[state].calories) *
                  100
                : 0
            }
          />

          {compare(
            timedMacros?.[state]?.calories ?? 0,
            totalSum("calories", state),
          )}
        </div>

        {/* Protein */}
        <div className="flex w-full items-center gap-2 md:gap-5">
          <h3 className="font-semibold">
            {t("dailyGoal.protein")} {timedMacros?.[state]?.protein ?? 0} g /
            {totalSum("protein", state)} g
          </h3>

          <ProgressBar
            value={
              timedMacros?.[state]?.protein
                ? (totalSum("protein", state) / timedMacros[state].protein) *
                  100
                : 0
            }
          />

          {compare(
            timedMacros?.[state]?.protein ?? 0,
            totalSum("protein", state),
          )}
        </div>

        {/* Fats */}
        <div className="flex w-full items-center gap-2 md:gap-5">
          <h3 className="font-semibold">
            {t("dailyGoal.fats")} {timedMacros?.[state]?.fats ?? 0} g /
            {totalSum("fats", state)} g
          </h3>

          <ProgressBar
            value={
              timedMacros?.[state]?.fats
                ? (totalSum("fats", state) / timedMacros[state].fats) * 100
                : 0
            }
          />

          {compare(timedMacros?.[state]?.fats ?? 0, totalSum("fats", state))}
        </div>

        {/* Carbs */}
        <div className="flex w-full items-center gap-2 md:gap-5">
          <h3 className="whitespace-nowrap font-semibold">
            {t("dailyGoal.carbs")} {timedMacros?.[state]?.carbs ?? 0} g /
            {totalSum("carbos", state)} g
          </h3>

          <ProgressBar
            value={
              timedMacros?.[state]?.carbs
                ? (totalSum("carbos", state) / timedMacros[state].carbs) * 100
                : 0
            }
          />

          {compare(timedMacros?.[state]?.carbs ?? 0, totalSum("carbos", state))}
        </div>
      </div>
    </div>
  );
};

export default ProgressValues;
