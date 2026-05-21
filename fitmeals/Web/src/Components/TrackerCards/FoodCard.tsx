"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import QuantityPopup from "./QuantityPopup";
import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";
import { useUser } from "@/src/context/UserContext";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import "@/app/[locale]/(public)/page.css";
interface Data {
  ImgUrl?: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  blsCode?: string;
  bg?: string;
  score?: number;
  id: number;
  status: "logged" | "notlogged" | "suggestion";
}
const FoodCard = ({
  ImgUrl,
  title,
  calories,
  id,
  protein,
  carbs,
  fats,
  bg,
  blsCode,
  status,
  score,
}: Data) => {
  const t = useTranslations("DietPlan");
  const t2 = useTranslations("Fit_tracker");
  const context = useContext(TrackGoalContext);
  const [quantitypopup, setQuantityPopup] = useState(false);
  const good = score && score >= 80 && score <= 100;
  const ok = score && score >= 60 && score < 80;
  const bad = score && score < 60;

  return (
    <div
      className={`h-max w-[98%] hidebar ${status === "suggestion" ? "overflow-hidden" : "overflow-scroll"} border border-gray-300 text-sm max-w-full md:w-70 lg:w-full md:max-h-35 flex p-2 rounded-md ${bg ?? "bg-[#fbf8f2]"}`}
    >
      <div
        className={`w-full hidebar ${status === "suggestion" ? "overflow-hidden" : "overflow-scroll"} text-left md:p-1 text-[16px] md:text-xs`}
      >
        <h1 className="font-semibold text-[17px] w-[70%] hidebar  overflow-x-scroll whitespace-nowrap">
          {title}
        </h1>
        <div className="w-[90%] mt-1">
          <h2 className="whitespace-nowrap">
            {t("Navbar.Calories")}:
            <span className="font-bold">{calories}kcal</span> |{" "}
            {t("Navbar.Carbo")}: <span className="font-bold">{carbs}g</span>
          </h2>
          <h2 className="md:whitespace-nowrap">
            {t("Navbar.Protein")}: <span className="font-bold">{protein}g</span>{" "}
            | {t("Navbar.Fats")}: <span className="font-bold">{fats}g</span>
          </h2>
        </div>
        <div className="flex mt-2">
          {(() => {
            let content = null;
            const cookbookHref = title
              ? `/services/cookbook/${title}`
              : undefined;

            if (status === "logged") {
              content = (
                <div className="w-full py-1 gap-2 flex">
                  <div className="bg-white border border-gray-400 px-2 p-1 rounded-md">
                    <span className="text-sm font-semibold">BlsCode:</span>{" "}
                    {blsCode ? blsCode : "N/A"}
                  </div>
                  <button
                    onClick={() => setQuantityPopup(true)}
                    className="w-max ml-auto p-1.5 bg-red-500 cursor-pointer  text-white font-semibold text-md rounded-md shadow-lg active:shadow"
                  >
                    {t2("foodCard.remove")}
                  </button>
                </div>
              );
            } else if (status === "notlogged") {
              content = (
                <div className="w-full p-1 gap-2 flex">
                  <div className="bg-white border border-gray-200 p-1 rounded-md">
                    <span className="text-sm font-semibold">BlsCode:</span>{" "}
                    {blsCode ? blsCode : "N/A"}
                  </div>
                  <button
                    onClick={() => setQuantityPopup(true)}
                    className="w-max ml-auto p-1.5 bg-green-700 cursor-pointer  text-white font-semibold text-md rounded-md shadow-lg active:shadow"
                  >
                    {t("main.log_meal")}
                  </button>
                </div>
              );
            } else if (status === "suggestion") {
              content = (
                <div className="w-full p-1 gap-2 flex">
                  <Tooltip describeChild title={t2("foodCard.score_tooltip")}>
                    <Button
                      sx={{
                        m: 1,
                        ml: "auto",
                        px: 2,
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        backgroundColor: good
                          ? "#bbf7d0"
                          : ok
                            ? "#fef08a"
                            : bad
                              ? "#fecaca"
                              : "#e5e7eb",
                        color: "black",
                      }}
                    >
                      {t2("foodCard.score")} : {score ? score : "N/A"}
                    </Button>
                  </Tooltip>
                </div>
              );
            }
            return content;
          })()}
        </div>
      </div>
      {quantitypopup && (
        <QuantityPopup
          foodData={{ title, calories, protein, carbs, fats, id }}
          onClose={() => setQuantityPopup(false)}
        />
      )}
    </div>
  );
};

export default FoodCard;
