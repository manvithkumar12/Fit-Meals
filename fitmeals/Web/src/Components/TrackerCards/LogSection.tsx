"use client";

import React, { useState } from "react";
import FoodCard from "./FoodCard";
import "@/app/[locale]/(public)/page.css";
import FoodCardLoading from "./loadings/FoodCardLoading";
import ErrorComponent from "../errorComponent/ErrorComponent";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useAllFoodSearch } from "@/src/query/useAllFoodsSearch";
import { useAllFood } from "@/src/query/useAllFoods";
import { useTranslations } from "next-intl";

const LogSection = () => {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const t = useTranslations("Fit_tracker.hero-section");
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching, isError } = useAllFood(page, 6);

  const {
    data: searchedData,
    isLoading: searchLoading,
    isError: searchError,
  } = useAllFoodSearch(debouncedSearch);

  const fooddata =
    debouncedSearch.trim().length > 0 ? searchedData : data?.foodData;

  const loadingState =
    debouncedSearch.trim().length > 0 ? searchLoading : isLoading || isFetching;

  const hasMore = data?.hasMore;

  return (
    <>
      <div className="relative flex  w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-10 p-2 w-[85%] ml-auto mr-auto md:w-[30%] lg:w-60 border-black/30 border rounded-md pl-7 md:mr-auto md:ml-2 lg:ml-0"
          placeholder={t("search")}
        />

        <i className="fa-solid fa-magnifying-glass absolute left-9 md:left-4 lg:left-2 top-3"></i>
      </div>

      <div className="flex w-full flex-col">
        {(isError || searchError) && (
          <ErrorComponent
            label={"Something went wrong unable to fetch data"}
            btnTxt={"Try again"}
            onClick={() => router.refresh()}
            whiteBg
          />
        )}

        {!loadingState && fooddata?.length === 0 && (
          <div className="w-70 h-70 mr-auto ml-auto">
            <ErrorComponent
              label={"No food items found"}
              btnTxt={"Refresh"}
              onClick={() => router.refresh()}
              whiteBg
            />
          </div>
        )}

        <div className="mt-2 grid md:grid-cols-2 hidebar lg:grid-cols-3 place-items-center justify-center items-center gap-2 max-h-100 overflow-y-scroll">
          {loadingState
            ? Array.from({ length: 6 }).map((_, index) => (
                <FoodCardLoading key={index + 1} type={"searched"} />
              ))
            : fooddata?.map((foodItem) => {
                if (!foodItem || !foodItem.foodname) {
                  return null;
                }

                return (
                  <FoodCard
                    key={foodItem.id}
                    id={foodItem.id}
                    title={foodItem.foodname}
                    calories={foodItem.energy ?? 0}
                    protein={foodItem.protein ?? 0}
                    carbs={foodItem.carbohydrate ?? 0}
                    fats={foodItem.fat ?? 0}
                    blsCode={foodItem.bls_code ?? undefined}
                    status="notlogged"
                  />
                );
              })}
        </div>

        {!searchValue && (
          <div className="flex w-[80%] md:w-full ml-auto mr-auto mt-2 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`ml-auto w-max p-2 ${
                page === 1 ? "opacity-50" : "cursor-pointer active:shadow"
              } text-md font-semibold rounded-md shadow-lg bg-green-700 text-white ${
                isFetching ? "opacity-50" : ""
              }`}
            >
              {t("prev")}
            </button>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMore}
              className={`w-max p-2 text-md ${
                !hasMore ? "opacity-50" : "cursor-pointer active:shadow"
              } font-semibold rounded-md shadow-lg bg-green-700 text-white`}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LogSection;
