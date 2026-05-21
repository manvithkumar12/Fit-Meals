"use client";
import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";

const TargetBar = () => {
  const t = useTranslations("DietPlan");
  const context = useContext(DietContext);
  const macros = context?.macros;
  return (
    <div className=" h-10 w-full flex justify-center text-center  border border-gray-200 rounded-lg items-center text-[11px] lg:text-[16px] gap-1 bg-[#F0F0E5] p-2 lg:">
      <div className="border-r border-black flex justify-center items-center gap-1 pr-1">
        <i className="fa-solid fa-fire text-orange-400"></i>
        <h3>
          {t("Navbar.Calories")} :
          <span className="font-semibold">{macros?.dailyCalories}g</span>
        </h3>
      </div>
      <div className="border-r border-black flex pr-1 justify-center items-center gap-1 ">
        <i className="fa-solid fa-dna text-green-600"></i>
        <h3>
          {t("Navbar.Protein")} :
          <span className="font-semibold">{macros?.dailyprotein}g</span>
        </h3>
      </div>
      <div className="border-r border-black flex pr-1 justify-center items-center  gap-1">
        <i className="fa-solid fa-wheat-awn text-amber-500 "></i>
        <h3>
          {t("Navbar.Carbo")} :
          <span className="font-semibold">{macros?.dailycarb}g</span>
        </h3>
      </div>
      <div className="whitespace-nowrap flex justify-center items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          fill="#D97706"
        >
          <path d="M840-320h-40v119q0 23-10.5 40T762-133q-17 11-37.5 12t-40.5-9L124-408q-23-11-33.5-30.5T80-479q0-21 10.5-41t33.5-31l560-280q20-10 40.5-8.5T762-827q17 11 27.5 28t10.5 40v119h40v80H680v-80h40v-117l-176 87q27 43 41.5 91t14.5 99q0 51-14.5 100T543-288l176 87v-119h-39v-80h160v80Zm-370-5q24-34 37-73.5t13-81.5q0-42-13-80.5T471-634L160-480l310 155Z" />
        </svg>
        <h3 className="ml-1">
          {t("Navbar.Fats")}:
          <span className="font-semibold">{macros?.dailyfat}g</span>
        </h3>
      </div>
    </div>
  );
};

export default TargetBar;
