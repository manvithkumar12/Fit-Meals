"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import DetailsPopup from "./DetailsPopup";
import { PlainPopUp } from "../PopUp/Popup";
import { useRecommendation } from "@/src/query/useRecommendation";

const HealthCard = () => {
  const t = useTranslations("Fit_tracker");
  const query = useRecommendation();
  const [features, setFeatures] = useState({
    high_protein: false,
    low_fat: false,
    low_calories: false,
    high_carbs: false,
    low_salt: false,
  });
  const onChange = (key: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const FeaturesData = [
    {
      id: "high_protein",
      en_name: "High Protein",
      de_name: "Proteinreich",
    },
    {
      id: "low_fat",
      en_name: "Low Fat",
      de_name: "Fettarm",
    },
    {
      id: "low_calories",
      en_name: "Low Calories",
      de_name: "Kalorienarm",
    },
    {
      id: "high_carbs",
      en_name: "High Carbs",
      de_name: "Kohlenhydratreich",
    },
    {
      id: "low_salt",
      en_name: "Low Salt",
      de_name: "Salzarm",
    },
  ];
  const locale = useLocale();
  const [popup, setPopUp] = useState(false);
  query.isSuccess && setPopUp(false);
  return (
    <div className="h-max p-3 bg-[#fbf8f2] w-90 md:w-full shadow-lg border border-black/20 rounded-md">
      <h1 className="font-semibold">{t("section-2.title")}</h1>
      <h4 className="text-sm opacity-65 lg:w-[60%]">
        {t("section-2.description")}
      </h4>
      <div className="h-max p-2 flex gap-2 mt-2 flex-wrap">
        {FeaturesData.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onChange(item.id as keyof typeof features)}
            className={`p-2 border border-gray-200 cursor-pointer rounded-md  min-w-30 w-max text-center ${(features[item.id as keyof typeof features] as boolean) ? "bg-green-600 text-white shadow-lg border-green-600" : "border-gray-200 hover:bg-green-100"}`}
          >
            {locale === "en" ? item.en_name : item.de_name}
          </div>
        ))}
      </div>
      <div className="flex mt-2 pb-2">
        <button
          onClick={() => {
            setPopUp(true);
          }}
          className="ml-auto whitespace-nowrap w-max cursor-pointer text-white font-semibold rounded-md p-2 bg-green-700 shadow-lg active:shadow"
        >
          {t("section-2.btn-txt")}
        </button>
      </div>
      {popup && (
        <PlainPopUp setPopUp={setPopUp}>
          <DetailsPopup Preferences={features} setPopUp={setPopUp} />
        </PlainPopUp>
      )}
    </div>
  );
};

export default HealthCard;
