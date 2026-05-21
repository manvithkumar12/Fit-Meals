"use client";

import { CUISINE_TYPES } from "@/src/types/enums/cuisine.types";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface CookBookFeatures {
  setFilters?: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const FlexFilters = ({ setFilters }: CookBookFeatures) => {
  const t = useTranslations("Services.flex_filters");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [expandFilter, setExpandFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setFilters) {
      setFilters(selectedFilters);
    }
  }, [selectedFilters, setFilters]);

  const PriceValues = ["15", "25", "40", "60", "80", "100", "100+"];
  const filtersList: Record<string, string[]> = {
    Cuisine: CUISINE_TYPES,
    FoodPrice: PriceValues,
    Ratings: ["5", "4", "3", "2", "1"],
    Dietary: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    Capacity: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpandFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelection = (category: string, item: string) => {
    setSelectedFilters((prev) => {
      const categorySelected = prev[category] || [];
      if (categorySelected.includes(item)) {
        return {
          ...prev,
          [category]: categorySelected.filter((i) => i !== item),
        };
      } else {
        return { ...prev, [category]: [...categorySelected, item] };
      }
    });
  };

  const clearFilter = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[category];
      return newFilters;
    });
  };

  return (
    <div
      className="flex gap-2 md:gap-3 h-max w-full flex-wrap overflow-visible relative"
      ref={containerRef}
    >
      {Object.values(selectedFilters).some((arr) => arr.length > 0) && (
        <button
          onClick={() => setSelectedFilters({})}
          className="px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors shadow-sm"
        >
          {t("clear_all")}
        </button>
      )}

      {Object.entries(filtersList).map(([title, values], index) => {
        const isExpanded = expandFilter === title;
        const selectedCount = selectedFilters[title]?.length || 0;
        const hasSelection = selectedCount > 0;

        return (
          <div key={index + 1} className="relative">
            <div
              className={`flex gap-2 items-center px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer text-sm font-medium shadow-sm
                ${isExpanded ? "border-green-600 ring-2 ring-green-100 bg-white" : ""}
                ${hasSelection && !isExpanded ? "border-green-500 bg-green-50 text-green-800" : ""}
                ${!isExpanded && !hasSelection ? "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md" : ""}
              `}
              onClick={() => setExpandFilter(isExpanded ? null : title)}
            >
              <h2>
                {typeof t.has === "function" && t.has(`categories.${title}`)
                  ? t(`categories.${title}`)
                  : title}
              </h2>
              {hasSelection && (
                <span className="bg-green-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {selectedCount}
                </span>
              )}
              <i
                className={`fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-300 text-gray-400 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              ></i>

              {hasSelection && (
                <div
                  className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-100 group"
                  onClick={(e) => clearFilter(title, e)}
                >
                  <i className="fa-solid fa-xmark text-[10px] text-gray-400 group-hover:text-red-500 transition-colors"></i>
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-50 min-w-70 max-w-[320px] md:max-w-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800">
                    {typeof t.has === "function" && t.has(`categories.${title}`)
                      ? t(`categories.${title}`)
                      : title}
                  </h3>
                  {hasSelection && (
                    <button
                      onClick={(e) => clearFilter(title, e)}
                      className="text-xs text-green-600 hover:text-green-800 font-semibold"
                    >
                      {t("reset")}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 max-h-62.5 overflow-y-auto pr-1">
                  {values.map((item, idx) => {
                    const isSelected = selectedFilters[title]?.includes(item);
                    return (
                      <button
                        key={idx+1}
                        onClick={() => toggleSelection(title, item)}
                        className={`px-3 py-1.5 rounded-lg border text-sm transition-all duration-200
                          ${
                            isSelected
                              ? "bg-green-600 text-white border-green-600 shadow-md transform scale-[1.02]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50"
                          }
                        `}
                      >
                        {typeof t.has === "function" && t.has(`values.${item}`)
                          ? t(`values.${item}`)
                          : item}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlexFilters;
