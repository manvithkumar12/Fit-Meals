"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import CBFilters from "@/src/Components/FlexFilter/FlexFilters";
import { useTranslations } from "next-intl";
import { userCoords } from "@/src/context/UseCoords";
import RestaurantCard from "../../RestaurantCard/RestaurantCard";
import { toast } from "react-toastify";
import RestaurantCardLoading from "../../RestaurantCard/RestaurandCardLoading";
import Link from "next/link";
import { useRestaurants } from "@/src/query/useRestaurant";
import SearchBar from "../../SearchBar/SearchBar";

import { Restaurant } from "@/app/api/actions/orders/searchRes";
import ErrorComponent from "../../errorComponent/ErrorComponent";

interface LocaleProps {
  locale: string;
  pageNo: number;
}

const Restaurants = ({ locale, pageNo }: LocaleProps) => {
  const t = useTranslations("Services.orders");
  const [cityName, setCityName] = useState("Berlin");
  const [cityinput, setCityInput] = useState("");
  const [searchloading, setSearchLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchData, setSearchData] = useState<Restaurant[] | null>(null);
  const coordsContext = useContext(userCoords);
  const coords = coordsContext?.coords;
  const { isLoading, error, data } = useRestaurants(
    coords,
    cityName,
    pageNo,
    filters,
  );
  const restaurants: Restaurant[] = data?.data || [];
  const prevHref = pageNo > 1 ? `/services/order/${pageNo - 1}` : "#";

  useEffect(() => {
    const timer = setTimeout(() => {
      setCityName(cityinput);
    }, 400);

    return () => clearTimeout(timer);
  }, [cityinput]);
  useEffect(() => {
    if (error) {
      toast.error(t("failed_fetch"));
    }
  }, [error, t]);
  const handleSearchData = useCallback((data: Restaurant[] | null) => {
    setSearchData(data);
  }, []);
  return (
    <>
      <div className="w-[90%] mr-auto">
        <SearchBar
          Placeholder={t("search_placeholder")}
          type="order"
          setSearchLoading={setSearchLoading}
          onData={handleSearchData}
        />
      </div>

      <div className="w-[90%]">
        <div className="w-full mt-5 flex md:items-center  flex-wrap flex-col gap-3 md:gap-0 md:flex-row relative z-10">
          <div className="w-full max-w-full h-max md:max-w-[70%] overflow-visible">
            <CBFilters setFilters={setFilters} />

            <div className="mt-3">
              {cityName || !coords ? (
                <h3>
                  {t("in_city")} {cityName || "Berlin"}
                  <i className="fa-solid ml-2 fa-location-dot"></i>
                </h3>
              ) : (
                <h3>
                  {t("near_you")}
                  <i className="fa-solid ml-2 fa-location-dot"></i>
                </h3>
              )}
            </div>
          </div>

          <div className="w-[70%] md:w-[30%] relative">
            <i className="fa-solid fa-location-dot absolute left-3 top-3"></i>

            <input
              type="text"
              className="h-10 w-full p-2 border border-black rounded-md pl-7"
              onChange={(e) => setCityInput(e.target.value)}
              placeholder={t("city_search_placeholder")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 w-full gap-6 pt-5">
          {isLoading || searchloading ? (
            Array.from({
              length: 3,
            }).map((_, index) => <RestaurantCardLoading key={index + 1} />)
          ) : searchData && searchData.length > 0 ? (
            searchData?.map((item, index) => (
              <RestaurantCard
                pageNo={pageNo}
                CardType={"order"}
                hotelData={item}
                key={item.id || index}
              />
            ))
          ) : searchData?.length === 0 ? (
            <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100">
              <ErrorComponent label={t("no_restaurants")} whiteBg />
            </div>
          ) : !searchData &&
            restaurants.length === 0 &&
            !isLoading &&
            !error ? (
            <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100">
              <ErrorComponent label={t("no_restaurants")} whiteBg />
            </div>
          ) : (
            restaurants.map((item, index) => (
              <RestaurantCard
                pageNo={pageNo}
                CardType={"order"}
                hotelData={item}
                key={item.id || index}
              />
            ))
          )}
        </div>

        {error && (
          <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100">
            <ErrorComponent
              label={t("failed_fetch")}
              whiteBg
              refreshBtn
              btnTxt={t("try_again")}
            />
          </div>
        )}

        <div className="w-max flex gap-2 mt-5 ml-auto md:mr-5">
          <Link href={prevHref}>
            <button
              className={`bg-green-700 font-semibold text-white rounded-full py-1 px-3 md:py-2 md:px-5 hover:bg-green-800 transition group ${
                pageNo === 1 ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <i className="fa-solid fa-angle-left"></i>

              {t("prev")}
            </button>
          </Link>

          <Link href={data?.hasMore ? `/services/order/${pageNo + 1}` : "#"}>
            <button
              disabled={!data?.hasMore}
              className={`bg-green-700 font-semibold  rounded-full py-1 px-3 md:py-2 md:px-5 text-white transition group ${
                data?.hasMore ? "" : "opacity-30 cursor-not-allowed"
              }`}
            >
              {t("next")}

              <i className="fa-solid fa-angle-right transition-transform group-hover:translate-x-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
