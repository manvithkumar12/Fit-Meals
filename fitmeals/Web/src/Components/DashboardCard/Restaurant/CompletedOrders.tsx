"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import DeliveryStatus from "@/src/utils/StatusButton";
import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import { useAllOrders } from "@/src/query/Dashboard/useAllOrders";
import Skeleton from "@mui/material/Skeleton";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";

const AllOrders = () => {
  const t = useTranslations("Dashboard");
  const context = useContext(RestaurantContext);
  const [pageNo, setPageNo] = useState(1);
  const restaurantId = context?.id!;
  const {
    data: todayOrders,
    isLoading,
  } = useAllOrders(restaurantId, pageNo);
  const hasMore = todayOrders?.hasMore;

  if (!isLoading && (!todayOrders?.orders || todayOrders.orders.length === 0)) {
    return (
      <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100 ml-auto mr-auto">
        <ErrorComponent label={"No Data Available"} whiteBg />
      </div>
    );
  }

  return (
    <div className="w-screen h-max pb-10 flex-col flex justify-center items-center">
      <div className="w-[95%] p-2 flex  flex-col overflow-x-scroll">
        <table className="w-full  mr-3  md:mr-0 md:ml-0  mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black/60 p-2 text-left ">
                {t("TodayOrders.OrderID")}
              </th>
              <th className="border border-black/60  p-2 text-left w-100">
                {t("TodayOrders.Items")}
              </th>
              <th className="border border-black/60  p-2 text-left">
                {t("TodayOrders.Amount")}
              </th>
              <th className="border border-black/60  p-2 text-left">
                {t("TodayOrders.DeliveredTime")}
              </th>
              <th className="border border-black/60  p-2 text-left">
                {t("TodayOrders.Rider_Name")}
              </th>
              <th className="border border-black/60  p-2 text-left">
                {t("TodayOrders.Rider_Contact")}
              </th>
              <th className="border border-black/60  p-2 text-left">
                {t("TodayOrders.Status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((item, index) => (
                  <tr key={index + 1}>
                    <td colSpan={7} className="p-2">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={45}
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {todayOrders?.orders.map((items, index) => (
                  <tr className="border" key={items.orderNo}>
                    <td className="border p-2 text-left border-black/20 ">
                      #{items.orderNo}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      {items.Items.map((item, index) => (
                        <div key={index + item} className="flex mt-1">
                          <h2 className="w-max ">{item}</h2>
                        </div>
                      ))}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      {items.Amount}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      {items.DeliveredTime !== "N/A"
                        ? new Date(
                            items.DeliveredTime as string,
                          ).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      {items.riderName}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      {items.riderContact}
                    </td>
                    <td className="border p-2 text-left border-black/20 ">
                      <DeliveryStatus status={items.Status} />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {hasMore && (
          <div className="flex gap-2 w-max ml-auto">
            <button
              onClick={() => {
                setPageNo((prev) => prev - 1);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setPageNo((prev) => prev + 1);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
