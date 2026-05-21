"use client";
import React, { useState } from "react";
import PastCard from "./PastCard";
import { usePastOrders } from "@/src/query/usePastOrders";
import { useUser } from "@/src/context/UserContext";
import { redirect } from "next/navigation";
import PastCardLoading from "./PastCardLoading";
import { usePastReservations } from "@/src/query/usePastReservations";
import ErrorComponent from "../errorComponent/ErrorComponent";
import PastReservation from "./PastReservation";
import PastReservationLoading from "./PastReservationLoading";
import { useTranslations } from "next-intl";

const PastOrders = () => {
  const user = useUser();
  const t = useTranslations("MyOrders");
  if (!user?.id) redirect("/login/Customer");
  const [field, setField] = useState<"orders" | "reservations">("orders");
  const [orderPage, setOrderPage] = useState<number>(1);
  const [reservationPage, setReservationPage] = useState<number>(1);
  const isFirstPage = (pageNo: number) => {
    if (pageNo == 1) {
      return true;
    }
  };
  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = usePastOrders(user.id, orderPage);
  const {
    data: reservationData,
    isLoading: reservationLoading,
    isError: reservationError,
  } = usePastReservations(user.id, 1);
  const isOrdersReady = !orderLoading && !orderError;
  const isReservationReady = !reservationLoading && !reservationError;
  return (
    <div>
      <div className="w-max relative mt-3 flex shadow-md border justify-center items-center h-10 rounded-full border-gray-200">
        <div
          className={`border-r px-2 border-gray-300 shadow-md h-full cursor-pointer rounded-tl-full rounded-bl-full flex font-semibold pl-4 w-max items-center transition-all duration-200 ease-in-out active:scale-95 ${field === "orders" ? "bg-green-600 text-white" : "text-black hover:bg-green-100"}`}
          onClick={() => setField("orders")}
        >
          {t("orders")}
        </div>
        <div
          className={`pl-2 pr-2 font-semibold w-full shadow-md h-full cursor-pointer rounded-tr-full rounded-br-full flex items-center transition-all duration-200 ease-in-out active:scale-95 ${field === "reservations" ? "bg-green-600 text-white" : "text-black hover:bg-green-100"}`}
          onClick={() => setField("reservations")}
        >
          {t("reservations")}
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 p-3 mt-5">
        {field === "orders" && (
          <>
            {orderLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <PastCardLoading key={index + 1} />
              ))}
            {orderError && <div>{t("error_loading_orders")}</div>}
            {isOrdersReady && (
              <>
                {orderData?.data?.map((item: any) => (
                  <PastCard key={item.orderNo} order={item} />
                ))}
              </>
            )}
            {isOrdersReady && orderData && orderData.data?.length === 0 && (
              <div className="md:w-120 ml-auto mr-auto h-90 w-90 md:h-120 ">
                <ErrorComponent
                  label={t("no_orders")}
                  whiteBg
                  btnTxt={t("search_restaurants")}
                  navUrl={"/services/order/1"}
                />
              </div>
            )}
            <div className="ml-auto flex gap-2">
              <button
                disabled={isFirstPage(orderPage)}
                onClick={() => {
                  setOrderPage(orderPage - 1);
                }}
                className={`p-2 h-10 w-20 font-semibold text-white rounded-full  bg-green-600 ${isFirstPage(orderPage) && "opacity-30 cursor-not-allowed"}`}
              >
                {t("prev")}
              </button>
              <button
                disabled={!orderData?.hasMore}
                onClick={() => {
                  setOrderPage(orderPage + 1);
                }}
                className={`p-2 bg-green-600 h-10 w-20 rounded-full font-semibold text-white ${!orderData?.hasMore && "opacity-30 cursor-not-allowed"} `}
              >
                {t("next")}
              </button>
            </div>
          </>
        )}
        {field === "reservations" && (
          <>
            {reservationLoading && <PastReservationLoading />}
            {reservationError && <div>{t("error_loading_reservations")}</div>}
            {isReservationReady && reservationData?.data?.length === 0 && (
              <div className="md:w-120 ml-auto mr-auto h-90 w-90 md:h-120 ">
                <ErrorComponent
                  label={t("no_reservations")}
                  whiteBg
                  btnTxt={t("search_restaurants")}
                  navUrl={"/services/reservation/1"}
                />
              </div>
            )}
            {isReservationReady && (
              <>
                {reservationData?.data.map((item: any) => (
                  <PastReservation reservation={item} key={item.id} />
                ))}
                <div className="ml-auto flex gap-2">
                  <button
                    disabled={isFirstPage(reservationPage)}
                    onClick={() => {
                      setReservationPage(reservationPage - 1);
                    }}
                    className={`p-2 h-10 w-20 font-semibold text-white rounded-full  bg-green-600 ${isFirstPage(reservationPage) && "opacity-30 cursor-not-allowed"}`}
                  >
                    {t("prev")}
                  </button>
                  <button
                    disabled={!reservationData?.hasMore}
                    onClick={() => {
                      setReservationPage(reservationPage + 1);
                    }}
                    className={`p-2 bg-green-600 h-10 w-20 rounded-full font-semibold text-white ${!reservationData?.hasMore && "opacity-30 cursor-not-allowed"} `}
                  >
                    {t("next")}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PastOrders;
