"use client";

import React, { useContext, useState } from "react";
import CBFilters from "@/src/Components/FlexFilter/FlexFilters";
import RestaurantCard from "../../RestaurantCard/RestaurantCard";
import SearchBar from "../../SearchBar/SearchBar";
import { useTranslations } from "next-intl";
import ErrorComponent from "../../errorComponent/ErrorComponent";
import RestaurantCardLoading from "../../RestaurantCard/RestaurandCardLoading";
import { useReservations } from "@/src/query/useReservations";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { userCoords } from "@/src/context/UseCoords";

const Restaurants = () => {
  const params = useParams();
  const pageNo = Number(params.page);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Services.reservation");
  const t2 = useTranslations("Services.orders");
  const [searchdata, setSearchData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [cityname, setCityName] = useState("");
  const [debouncedName] = useDebounce(cityname, 300);
  const coordsContext = useContext(userCoords);
  const coords = coordsContext?.coords;
  const { data, isError, isLoading } = useReservations(
    pageNo,
    filters,
    debouncedName,
    coords,
  );
  const changePage = (page: number) => {
    const newPath = pathname.replace(`/${pageNo}`, `/${page}`);
    router.push(newPath);
  };
  return (
    <>
      <SearchBar
        type={"reservation"}
        Placeholder={t("search_placeholder")}
        onData={setSearchData}
        setSearchLoading={setLoading}
      />

      <div className="w-[90%] relative">
        <div className="w-full mt-5 flex md:items-center flex-wrap flex-col gap-3 md:gap-0 md:flex-row relative z-10">
          <div className="w-full max-w-full md:max-w-[70%] overflow-visible">
            <CBFilters setFilters={setFilters} />
          </div>

          <div className="w-[70%] md:w-[30%] relative">
            <i className="fa-solid fa-location-dot absolute left-3 top-3"></i>

            <input
              type="text"
              className="h-10 w-full p-2 border border-black rounded-md pl-7"
              onChange={(e) => setCityName(e.target.value)}
              placeholder={t2("city_search_placeholder")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full gap-10 pt-5">
          {loading || isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <RestaurantCardLoading key={i + 1} />
              ))}
            </>
          ) : searchdata && searchdata?.length > 0 ? (
            searchdata?.map((item) => (
              <RestaurantCard
                key={item.id}
                CardType={"reservation"}
                hotelData={item}
                pageNoReservation={pageNo}
              />
            ))
          ) : data?.data?.length === 0 || searchdata?.length === 0 ? (
            <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100">
              <ErrorComponent label={t("no_restaurants")} whiteBg />
            </div>
          ) : (
            data?.data?.map((item: any) => (
              <RestaurantCard
                key={item.id}
                CardType={"reservation"}
                hotelData={item}
                pageNoReservation={pageNo}
              />
            ))
          )}
        </div>

        {isError && (
          <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100">
            <ErrorComponent
              label={t("failed_fetch")}
              whiteBg
              refreshBtn
              btnTxt={t("try_again")}
            />
          </div>
        )}

        {!loading && !isLoading && !searchdata && (
          <div className="flex items-center justify-center gap-4 mt-10 mb-5">
            <button
              disabled={pageNo === 1}
              onClick={() => changePage(pageNo - 1)}
              className="px-5 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("prev")}
            </button>

            <span className="font-medium">
              {t("page")} {pageNo}
            </span>

            <button
              disabled={!data?.hasMore}
              onClick={() => changePage(pageNo + 1)}
              className="px-5 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Restaurants;
