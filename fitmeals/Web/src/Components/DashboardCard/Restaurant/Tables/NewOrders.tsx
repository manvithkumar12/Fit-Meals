"use client";

import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import { useStartCooking } from "@/src/mutations/Dashboard/Restuarnt/toCooking";
import Skeleton from "@mui/material/Skeleton";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

const NewOrders = () => {
  const t = useTranslations("Dashboard");
  const context = useContext(RestaurantContext);
  const data = context?.restaurantData?.newOrders;
  const isLoading = context?.loading;
  const id = context?.id;
  const mutation = useStartCooking(id!);
  const handleStartCooking = (orderNo: number) => {
    mutation.mutate(orderNo);
  };
  return (
    <div className="border border-black/40 rounded-md">
      <div className="h-max overflow-y-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-xs lg:text-lg">
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.NewOrders")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.OrderNo")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.Type")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.Quantity")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.OrderTime")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
                {t("Restaurant.Amount")}
              </th>
              <th className="sticky top-0 bg-white z-5 border border-black/60 p-2 text-left">
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
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={50}
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              data?.map((item, index) => (
                <tr key={item.orderNo} className="text-xs lg:text-lg align-top">
                  <td className="border border-black/30 p-2">
                    <div className="max-h-20 overflow-y-auto">
                      {item.items.map((item2, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <h3 className="text-xs md:text-md lg:text-xl">
                            {item2.foodItem.title} X {item2.quantity}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="border border-black/30 p-2 whitespace-nowrap">
                    #{item.orderNo}
                  </td>

                  <td className="border border-black/30 p-2">
                    {item.OrderType}
                  </td>

                  <td className="border border-black/30 p-2">
                    {item.items.length} items
                  </td>
                  <td className="border border-black/30 p-2">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(item.OrderedTime).getTime()) /
                        (1000 * 60),
                    )}{" "}
                    min
                  </td>
                  <td className="border border-black/30 p-2">
                    {item.Amount} <span className="font-bold">€</span>
                  </td>

                  <td className="border border-black/30 p-2">
                    <button
                      onClick={() => handleStartCooking(item.orderNo)}
                      className="text-sm shadow-md cursor-pointer active:shadow bg-green-700 font-semibold text-white px-3 py-1 rounded-md"
                    >
                      Start cooking
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewOrders;
