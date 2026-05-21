"use client";
import React, { useContext, useEffect, useState } from "react";
import ProgressRing from "./ProgressCard";
import { useTranslations } from "next-intl";
import GoalEdits from "./GoalEdits";
import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";

const HealthProgressCard = () => {
  const t = useTranslations("Fit_tracker");
  const context = useContext(TrackGoalContext);
  const [popup, setShowPopup] = useState(false);
  const setTargetId = context?.setTargetId;
  const targetsData = context?.targetData;
  const loggedData = context?.loggedData;
  useEffect(() => {
    if (targetsData?.id) {
      setTargetId?.(targetsData.id);
    }
  }, [targetsData?.id, setTargetId]);
  return (
    <div className="h-max p-2 w-90 md:w-full md:flex md:justify-center md:items-center flex-col">
      <div className="font-semibold  text-center md:mr-auto flex justify-center items-center gap-3">
        <h1 className="text-lg md:text-3xl">{t("hero-section.title")}</h1>
        <button
          className="bg-black text-white rounded-md mt-1 px-2 py-1"
          onClick={() => setShowPopup(true)}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <h3 className="mr-auto mt-2 text-center ml-1">
        <span className="font-semibold uppercase underline-offset-2 underline">
          {t("hero-section.goal")}
        </span>
        : {targetsData?.calories ?? 0} Kcal {t("hero-section.calories")} •{" "}
        {targetsData?.protein ?? 0} g {t("hero-section.Protein")} •{" "}
        {targetsData?.carbs ?? 0} g {t("hero-section.Carbs")} •{" "}
        {targetsData?.fats ?? 0} g {t("hero-section.Fats")}{" "}
      </h3>
      <div className="grid grid-cols-2  gap-1.5 h-100 md:h-max mt-2 md:grid-cols-4 md:mt-10">
        <div className="max-w-43 max-h-43 ">
          <ProgressRing
            Tracker={true}
            value={Math.round(loggedData?.loggedCalories ?? 0)}
            max={targetsData?.calories ?? 0}
            label={t("hero-section.calories")}
            unit="kcal"
            radiusLG={100}
            radiusSM={60}
            textSize="text-[20px]"
          />
        </div>
        <div className="max-w-43 max-h-43">
          <ProgressRing
            Tracker={true}
            value={Math.round(loggedData?.loggedProtein ?? 0)}
            max={targetsData?.protein ?? 0}
            label={t("hero-section.Protein")}
            unit="g"
            radiusLG={100}
            radiusSM={60}
            strokeclr="#3b82f6"
            textSize="text-[20px]"
          />
        </div>
        <div className="max-w-43 max-h-43">
          <ProgressRing
            Tracker={true}
            value={Math.round(loggedData?.loggedCarbos ?? 0)}
            max={targetsData?.carbs ?? 0}
            label={t("hero-section.Carbs")}
            unit="g"
            radiusLG={100}
            radiusSM={60}
            strokeclr="#f59e0b"
            textSize="text-[20px]"
          />
        </div>
        <div className="max-w-43 max-h-43">
          <ProgressRing
            value={Math.round(loggedData?.loggedFat ?? 0)}
            max={targetsData?.fats ?? 0}
            label={t("hero-section.Fats")}
            unit="g"
            radiusLG={100}
            Tracker={true}
            radiusSM={60}
            strokeclr="#ef4444"
            textSize="text-[20px]"
          />
        </div>
      </div>
      <div
        className="bg-green-700 mt-5 w-max px-3 ml-auto mr-auto font-semibold p-2 rounded-md text-white cursor-pointer shadow-lg hover:shadow"
        onClick={() => {
          window.scrollTo({
            top: 9999999,
            behavior: "smooth",
          });
        }}
      >
        {t("Goals.view_logged")}
      </div>

      {popup && <GoalEdits setPopUp={setShowPopup} />}
    </div>
  );
};

export default HealthProgressCard;
