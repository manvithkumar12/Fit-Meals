"use client";
import React from "react";
import Dineoutsection from "../DineoutComponents/Dineout-section";
import MenuComponents from "../MenuSection/GridComponents";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [category, setCategory] = React.useState<"Dineout" | "Menu" | "Photos">(
    "Dineout",
  );
  const t = useTranslations("Services");

  return (
    <div className="w-full flex flex-col pb-5 mt-3 items-center justify-center ">
      <div className="mini-nav w-full flex flex-col gap-5 border-b border-black h-max">
        <div className="flex gap-5 mb-1">
          <button
            className={`font-bold font-montserrat cursor-pointer ${category === "Dineout" ? "underline decoration-green-600 decoration-7" : null} `}
            onClick={() => {
              setCategory("Dineout");
            }}
          >
            {t("reservation.Dineout")}
          </button>
          <button
            className={`font-bold font-montserrat cursor-pointer ${category === "Menu" ? "underline decoration-green-600 decoration-7" : null} `}
            onClick={() => {
              setCategory("Menu");
            }}
          >
            {t("reservation.Menu")}
          </button>
          <button
            className={`font-bold font-montserrat cursor-pointer ${category === "Photos" ? "underline decoration-green-600 decoration-7" : null} `}
            onClick={() => {
              setCategory("Photos");
            }}
          >
            {t("reservation.Photos")}
          </button>
        </div>
      </div>
      {category === "Dineout" && <Dineoutsection />}
      {category === "Menu" && <MenuComponents />}
      {category === "Photos" && <MenuComponents />}
    </div>
  );
};

export default Navbar;
