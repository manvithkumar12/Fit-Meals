"use client";
import React, { useState } from "react";
import { completeData, FilterItem } from "@/data/Filters";
import { useTranslations } from "next-intl";
import {
  HotelFilterState,
  useHotelFilters,
} from "@/src/hooks/useHotelFilters";

const HotelFilters = () => {
  const { filters, toggleFilter, clearAllFilters, totalActiveCount } =
    useHotelFilters();

  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    types: true,
    category: true,
    price: true,
    ratings: true,
    dietary: true,
  });

  const t = useTranslations("Services.filters");
  const data = completeData(t);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderFilterSection = (
    title: string,
    sectionKey: keyof typeof openSections,
    paramName: keyof HotelFilterState,
    items: FilterItem[],
    selectedItems: string[],
  ) => {
    const sectionActiveCount = selectedItems.length;

    return (
      <div className="mt-2 pl-2 border-b border-gray-200 pb-2">
        <div
          className="flex w-full items-center justify-between cursor-pointer py-1 select-none"
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-gray-800 text-sm md:text-base">
              {title}
            </h1>
            {sectionActiveCount > 0 && (
              <span className="bg-green-600 text-white text-[11px] px-1.5 py-0.5 rounded-full font-bold">
                {sectionActiveCount}
              </span>
            )}
          </div>
          <button
            type="button"
            className="mr-3 text-gray-500 hover:text-gray-800 transition-colors p-1"
            aria-label={`Toggle ${title}`}
          >
            <i
              className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                openSections[sectionKey] ? "rotate-180" : ""
              }`}
            ></i>
          </button>
        </div>

        {openSections[sectionKey] && (
          <div className="flex flex-col gap-2 mt-2 pr-2">
            {items.map((filter) => {
              const isChecked = selectedItems.includes(filter.key);
              return (
                <label
                  key={filter.key}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors duration-100 select-none ${
                    isChecked
                      ? "bg-green-50 text-green-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilter(paramName, filter.key)}
                    className="w-4 h-4 rounded text-green-600 focus:ring-green-500 accent-green-600 cursor-pointer"
                  />
                  <span className="truncate">{filter.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-max bg-white p-3 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
      <div className="font-semibold flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-filter text-green-600 text-sm"></i>
          <h2 className="font-bold text-gray-900 text-base md:text-lg">
            {t("Filters")}
          </h2>
          {totalActiveCount > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalActiveCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {totalActiveCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-gray-500 hover:text-gray-800 p-1"
            >
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="pt-1">
          {renderFilterSection(
            t("Types"),
            "types",
            "types",
            data.Types,
            filters.types,
          )}
          {renderFilterSection(
            t("Category"),
            "category",
            "category",
            data.Category,
            filters.category,
          )}
          {renderFilterSection(
            t("Price_Range"),
            "price",
            "price",
            data.Price_Range,
            filters.price,
          )}
          {renderFilterSection(
            t("Ratings"),
            "ratings",
            "ratings",
            data.Ratings,
            filters.ratings,
          )}
          {renderFilterSection(
            t("Dietary"),
            "dietary",
            "dietary",
            data.Dietary,
            filters.dietary,
          )}
        </div>
      )}
    </div>
  );
};

export default HotelFilters;


