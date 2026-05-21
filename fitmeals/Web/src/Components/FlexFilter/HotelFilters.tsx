"use client";
import React, { useState } from "react";
import { completeData } from "@/data/Filters";
import { useTranslations } from "next-intl";
const HotelFilters = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [openSections, setOpenSections] = useState({
    types: true,
    category: true,
    price: true,
    ratings: true,
    dietary: true,
  });
  const openFilter = () => (isOpen ? setIsOpen(false) : setIsOpen(true));
  const t = useTranslations("Services.filters");
  const data = completeData(t);
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full h-max bg-white p-2 rounded-md border border-gray-200 shadow-xl hover:shadow-2xl">
      <div className="font-semibold flex items-center justify-center text-lg">
        <h2 className="font-bold mr-auto">{t("Filters")}</h2>
        <div className="w-max lg:hidden ml-auto">
          <i
            className="fa-solid fa-caret-down ml-auto mr-5"
            onClick={() => openFilter()}
          ></i>
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="mt-2 pl-2  border-b border-gray-200">
            <div className="flex w-full items-center justify-center">
              <h1 className="font-semibold mt-2">{t("Types")}</h1>
              <button className="ml-auto mr-5">
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() => toggleSection("types")}
                ></i>
              </button>
            </div>
            {openSections.types && (
              <div className="flex lg:flex-col lg:gap-2 gap-4 border-b flex-wrap  border-gray-200 pb-2 mt-1">
                {data.Types.map((filter, index) => (
                  <div className="flex gap-1" key={filter}>
                    <input type="checkbox" />
                    <h3>{filter}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2 pl-2 border-b border-gray-200">
            <div className="flex w-full items-center justify-center">
              <h1 className="font-semibold">{t("Category")}</h1>
              <button className="ml-auto mr-5">
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() => toggleSection("category")}
                ></i>
              </button>
            </div>
            {openSections.category && (
              <div className="flex gap-4 h-max lg:flex-col lg:gap-2 flex-wrap  pb-2 mt-1">
                {data.Category.map((filter, index) => (
                  <div className="flex gap-1" key={filter}>
                    <input type="checkbox" />
                    <h3>{filter}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2 pl-2 border-b border-gray-200">
            <div className="flex w-full items-center justify-center">
              <h1 className="font-semibold">{t("Price_Range")}</h1>
              <button className="ml-auto mr-5">
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() => toggleSection("price")}
                ></i>
              </button>
            </div>
            {openSections.price && (
              <div className="flex gap-4 h-max lg:flex-col lg:gap-2 flex-wrap  pb-2 mt-1">
                {data.Price_Range.map((filter, index) => (
                  <div className="flex gap-1" key={filter}>
                    <input type="checkbox" />
                    <h3>{filter}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2 pl-2 border-b border-gray-200">
            <div className="flex w-full items-center justify-center">
              <h1 className="font-semibold">{t("Ratings")}</h1>
              <button className=" ml-auto mr-5">
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() => toggleSection("ratings")}
                ></i>
              </button>
            </div>
            {openSections.ratings && (
              <div className="flex gap-4 h-max  lg:gap-2 flex-wrap  pb-2 mt-1">
                {data.Ratings.map((filter, index) => (
                  <div className="flex gap-1" key={filter}>
                    <input type="checkbox" />
                    <h3>{filter}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2 pl-2">
            <div className="flex w-full items-center justify-center">
              <h1 className="font-semibold">{t("Dietary")}</h1>
              <button className=" ml-auto mr-5">
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() => toggleSection("dietary")}
                ></i>
              </button>
            </div>
            {openSections.dietary && (
              <div className="flex gap-3 h-max flex-wrap  pb-2 mt-1">
                {data.Dietary.map((filter, index) => (
                  <div className="flex gap-1" key={filter}>
                    <input type="checkbox" />
                    <h3>{filter}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelFilters;
