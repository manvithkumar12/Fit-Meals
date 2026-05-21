"use client";
import React, { useContext } from "react";
import PopUpButton from "../General/Button/PopUpButton";
import { useTranslations } from "next-intl";
import UpdateSection from "./UpdateSection";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { Field } from "@/src/utils/loadingField";

const DetailsCard = () => {
  const context = useContext(DietContext);
  const userData = context?.userData;
  const valuesloading = context?.valuesloading;
  const t = useTranslations("DietPlan");

  return (
    <div className="hidden lg:block bg-[#F0F0E5] min-h-30 border border-gray-200 rounded-lg w-full p-3">
      <h2 className="font-semibold text-xl text-center">
        {t("Information.title")}
      </h2>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center">
          <h2>{t("Information.Gender")}:</h2>
          <Field loading={valuesloading}>
            <h2 className="ml-auto mr-4 bg-white border w-26 h-9 flex justify-center items-center border-black/20 font-medium rounded-md p-1 pr-2 pl-2">
              {userData?.gender && userData.gender !== "N/A"
                ? t(`Details.${userData.gender}`)
                : userData?.gender || "N/A"}
            </h2>
          </Field>
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Weight")}:</h2>
          <Field loading={valuesloading}>
            <h2 className="ml-auto mr-5 bg-white border w-25 h-9 justify-center flex border-black/20 font-medium rounded-md pl-2 pr-2 p-1">
              {userData?.weight} kg
            </h2>
          </Field>
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Height")}:</h2>
          <Field loading={valuesloading}>
            <h2 className="ml-auto mr-5 bg-white border w-25 h-9 justify-center flex border-black/20 font-medium rounded-md pl-2 pr-2 p-1">
              {userData?.height} cm
            </h2>
          </Field>
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Age")}:</h2>
          <Field loading={valuesloading}>
            <h2 className="ml-auto mr-5 bg-white border w-25 h-9 justify-center flex border-black/20 font-medium rounded-md pl-2 pr-2 p-1">
              {userData?.age}
            </h2>
          </Field>
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Activity Level")}</h2>
          <Field loading={valuesloading}>
            <h2 className="ml-auto mr-5 bg-white border w-25 h-9 justify-center flex border-black/20 font-medium rounded-md pl-2 pr-2 p-1">
              {userData?.activity && userData.activity !== "N/A"
                ? t(`Details.${userData.activity}`)
                : userData?.activity || "N/A"}
            </h2>
          </Field>
        </div>
        <div className="flex w-full items-center justify-center flex-wrap">
          <h2>{t("Information.goal")}:</h2>
          <div className="flex gap-2 ml-auto">
            <Field loading={valuesloading}>
              <h2 className="ml-auto bg-white border w-max h-9 justify-center flex border-black/20 font-md rounded-md p-1.5">
                {userData?.goal && userData.goal !== "N/A"
                  ? t(`Details.${userData.goal.replace(" ", "_")}`)
                  : userData?.goal || "N/A"}
              </h2>
            </Field>
            <Field loading={valuesloading}>
              <h2 className="ml-auto mr-5 bg-white border border-black/20 font-medium rounded-md pl-2 pr-2 p-1">
                {userData?.target_weight}
              </h2>
            </Field>
          </div>
        </div>
        <PopUpButton btnTxt={t("Information.updatebtn")}>
          <UpdateSection />
        </PopUpButton>
      </div>
    </div>
  );
};

export default DetailsCard;
