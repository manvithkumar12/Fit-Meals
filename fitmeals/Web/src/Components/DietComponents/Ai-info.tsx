"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import UpdateSection from "./UpdateSection";
import { PlainPopUp } from "../PopUp/Popup";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";

const AiComponent = () => {
  const t = useTranslations("DietPlan");
  const context = useContext(DietContext);
  const macros = context?.macros;
  const userData = context?.userData;
  const [showpopup, setShowPopup] = useState<boolean>(false);
  return (
    <div className="h-max flex flex-col w-full bg-[#F0F0E5] pb-1  border border-gray-200 rounded-lg ">
      <div className="flex  bg-[#DBE5E0] p-2 rounded-tl-md rounded-tr-md">
        <div className="h-20 w-20 relative">
          <Image
            src="https://img.icons8.com/3d-stickle/200/happy-retro-robot.png"
            className="object-contain"
            fill
            sizes="80px"
            alt="robot"
            loading="lazy"
            blurDataURL="/blur.jpeg"
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col w-[70%] md:w-full text-center ml-3">
          <div className="ml-2 text-sm ">
            <h2 className="md:text-[17px]">
              <span className="font-semibold text-green-800">
                {t("Suggestions.title")}:
              </span>
              {t("Suggestions.description")} {t("Suggestions.weight")} :
              <span className="font-semibold"> {userData?.weight ?? 0} Kg</span>
              , {t("Suggestions.height")}:
              <span className="font-semibold"> {userData?.height ?? 0} Cm</span>
              ,{t("Suggestions.age")}:
              <span className="font-semibold"> {userData?.age ?? 0},</span>{" "}
              {t("Suggestions.activity level")}:
              <span className="font-semibold">
                {" "}
                {userData?.activity && userData.activity !== "N/A"
                  ? t(`Details.${userData.activity}`).toUpperCase()
                  : userData?.activity?.toUpperCase() || "N/A"}
              </span>{" "}
              ,{t("Suggestions.goal")} :{" "}
              <span className="font-semibold">
                {userData?.goal && userData.goal !== "N/A"
                  ? t(
                      `Details.${userData.goal.replace(" ", "_")}`,
                    ).toUpperCase()
                  : userData?.goal?.toUpperCase() || "N/A"}
                ,
              </span>
              {t("Suggestions.targetWeight")} :{" "}
              <span className="font-semibold">
                {" "}
                {userData?.target_weight ?? 0} Kg
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex border-b border-black/20 pb-1 justify-center items-center">
          <h2 className="text-md font-semibold md:text-[17px] mr-auto">
            {t("Suggestions.goals")}
          </h2>
          <div className="">
            <button
              onClick={() => setShowPopup(true)}
              className="text-xs p-2 lg:hidden  bg-green-700 text-white font-semibold rounded-md"
            >
              {t("Details.update")}
            </button>
            {showpopup && (
              <PlainPopUp setPopUp={setShowPopup}>
                <UpdateSection />
              </PlainPopUp>
            )}
          </div>
        </div>
        <div className="text-sm mt-1   md:text-[17px]">
          <div className="">
            {t("Suggestions.sh-1")}{" "}
            <span className="mx-1.5 font-semibold">{macros?.days ?? 0}</span>
            {t("Suggestions.sh-2")} {t("Suggestions.Calories")}:
            <span className="mx-1.5 font-semibold">
              {macros?.dailyCalories ?? 0}
              🔥•
            </span>
            {t("Suggestions.Protein")}:
            <span className="mx-1.5 font-semibold">
              {macros?.dailyprotein ?? 0}
              💪•
            </span>
            {t("Suggestions.Carbo")}:
            <span className="mx-1.5 font-semibold">
              {macros?.dailycarb ?? 0}
              🍚•
            </span>
            {t("Suggestions.Fats")}:
            <span className="mx-1.5 font-semibold">
              {macros?.dailyfat ?? 0}
              🥑
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiComponent;
