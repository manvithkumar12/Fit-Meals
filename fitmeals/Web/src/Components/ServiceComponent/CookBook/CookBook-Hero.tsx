"use client";

import React, { useState } from "react";
import ProductCard from "@/src/Components/ProductCard/ProductCard";
import { FiltersDropDown } from "./FiltersDropDown";
import Link from "@/src/Components/LocalizedLink";
import { isSupportTeam } from "@/lib/userRole";
import SearchBar from "../../SearchBar/SearchBar";
import { useTranslations } from "next-intl";
import { useUser } from "@/src/context/UserContext";
import { CookbookDataProps } from "@/src/query/search/useCookbookSearch";
import ProductCardLoading from "../../ProductCard/ProductCardLoading";
import ErrorComponent from "../../errorComponent/ErrorComponent";

interface LocaleProps {
  locale: string;
  data: {
    id: number;
    title: string;
    calories: number;
    description: string[];
    imgUrl: string[];
    weight: number;
    time: number;
    nutritionalValue: number;
    proteinPer100gm: number;
    caloriesPer100gm: number;
    fatsPer100gm: number;
    carboHydratePer100gm: number;
    mainurl: string;
    foodType: string;
  }[];
  error?: boolean;
}

const getDifficulty = (time: number, locale?: string) => {
  if (locale === "de") {
    if (time <= 20) return "einfach";
    if (time <= 40) return "mittel";
    return "schwer";
  }
  if (time <= 20) return "easy";
  if (time <= 40) return "medium";
  return "hard";
};

const CookBookHero = ({ locale, data, error }: LocaleProps) => {
  const user = useUser();

  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState<CookbookDataProps[] | null>(
    null,
  );

  const t = useTranslations("Services.cookbook");

  return (
    <>
      <SearchBar
        Placeholder={t("search_placeholder")}
        type="cookbook"
        onData={setSearchData}
        setSearchLoading={setLoading}
      />

      <div className="mt-7 overflow-z md:w-[90%] pl-2 pr-2">
        <div className="ml-3 md:ml-0 pr-4">
          <h1 className="text-2xl md:text-4xl font-bold font-montserrat">
            {t("title")}
          </h1>

          <h4 className="mt-3 text-md md:text-lg text-black/60">
            {t("description")}
          </h4>
        </div>

        {isSupportTeam(user) && (
          <div className="w-full flex">
            <Link href={"/support/cookbook/addItem"} className="ml-auto w-max">
              <button className="p-2 bg-green-700 w-30 font-semibold text-white rounded-md">
                Add Item
              </button>
            </Link>
          </div>
        )}

        <FiltersDropDown />

        <div className="hidden md:flex overflow-y-visible mr-2 ml-2 mt-3"></div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-5 pb-10 gap-3 place-items-center w-[98%] md:gap-7">
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <ProductCardLoading key={index + 1} />
              ))}
            </>
          ) : searchData ? (
            searchData.length > 0 ? (
              searchData.map((item) => (
                <ProductCard
                  id={item.id}
                  key={item.id}
                  imageUrl={item.mainurl}
                  difficulity={getDifficulty(item.time, locale)}
                  time={item.time}
                  calories={item.calories}
                  protein={item.proteinPer100gm}
                  title={item.title}
                  type={item.foodType}
                  fats={item.fatsPer100gm}
                  carbs={item.carboHydratePer100gm}
                  Getlocale={locale}
                />
              ))
            ) : (
              <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100 ml-auto mr-auto">
                <ErrorComponent label={t("no_recipes")} whiteBg />
              </div>
            )
          ) : error ? (
            <div className="w-90 h-90 md:w-120 md:h-120 lg:w-120 lg:h-120 ml-auto mr-auto">
              <ErrorComponent
                label={t("failed_fetch")}
                whiteBg
                refreshBtn
                btnTxt={t("try_again")}
              />
            </div>
          ) : data.length === 0 ? (
            <div className="w-90 h-90 md:w-120 md:h-120 lg:w-120 lg:h-120 ml-auto mr-auto">
              <ErrorComponent label={t("no_recipes")} whiteBg />
            </div>
          ) : (
            data.map((item) => (
              <ProductCard
                id={item.id}
                key={item.id}
                imageUrl={item.mainurl}
                difficulity={getDifficulty(item.time, locale)}
                time={item.time}
                calories={item.calories}
                protein={item.proteinPer100gm}
                title={item.title}
                type={item.foodType}
                fats={item.fatsPer100gm}
                carbs={item.carboHydratePer100gm}
                Getlocale={locale}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CookBookHero;
