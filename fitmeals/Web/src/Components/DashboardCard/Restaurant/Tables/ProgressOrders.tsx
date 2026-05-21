"use client";
import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import { useStartPacking } from "@/src/mutations/Dashboard/Restuarnt/toPacking";
import Skeleton from "@mui/material/Skeleton";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

const ProgressOrders = () => {
  const t = useTranslations("Dashboard");
  const context = useContext(RestaurantContext);
  const data = context?.restaurantData?.inProgressOrders;
  const mutation = useStartPacking(context?.id!);
  const isLoading = context?.loading;
  const handlePacking = (orderNo: number) => {
    mutation.mutate(orderNo);
  };
  return (
    <table>
      <thead>
        <tr className="text-sm lg:text-lg">
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.InProgress")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.OrderNo")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.Type")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.Action")}
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((item, index) => (
              <tr key={index + 1}>
                <td colSpan={7} className="p-2">
                  <Skeleton variant="rectangular" width="100%" height={50} />
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {data?.map((item, index) => (
              <tr key={item.orderNo} className="text-xs lg:text-lg">
                <td className="border border-black/30 h-10 max-h-20 p-2  w-10">
                  <div className="h-full w-50 md:w-80 overflow-y-auto">
                    {item.items.map((item, index) => (
                      <div key={index + item.foodItem.title} className="flex items-center gap-2">
                        <h3 className="text-xs md:text-md lg:text-xl">
                          {item.foodItem.title} X {item.quantity}
                        </h3>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  <div className="h-full w-20 overflow-x-auto whitespace-nowrap">
                    {item.orderNo}
                  </div>
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  <div className="h-full w-20 overflow-x-auto whitespace-nowrap">
                    {item.OrderType}
                  </div>
                </td>
                <td className="border border-black/30 p-2">
                  <button
                    onClick={() => {
                      handlePacking(item.orderNo);
                    }}
                    className="bg-yellow-500 shadow-md cursor-pointer active:shadow text-white font-semibold pl-2 pr-2 p-1 rounded-md text-xs "
                  >
                    In Packing
                  </button>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default ProgressOrders;
