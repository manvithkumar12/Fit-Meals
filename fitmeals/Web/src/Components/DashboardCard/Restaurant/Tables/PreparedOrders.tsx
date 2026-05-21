"use client";

import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import Skeleton from "@mui/material/Skeleton";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import AssignPopup from "../../DeliveryPartner/AssignPopup";
import { PlainPopUp } from "@/src/Components/PopUp/Popup";

const PreparedOrders = () => {
  const t = useTranslations("Dashboard");

  const [assignPopup, setAssignPopup] = React.useState<number | null>(null);

  const context = useContext(RestaurantContext);

  const isLoading = context?.loading;

  const data = context?.restaurantData?.preparedOrders;

  return (
    <table>
      <thead>
        <tr className="text-xs lg:text-lg">
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.PreparedOrders")}
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
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index}>
                <td colSpan={7} className="p-2">
                  <Skeleton variant="rectangular" width="100%" height={50} />
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {data?.map((item) => (
              <tr
                key={item.orderNo}
                className="text-xs h-10 max-h-20 overflow-hidden lg:text-lg"
              >
                <td className="border border-black/30 h-10 max-h-20 p-2 w-10">
                  <div className="h-full w-50 md:w-80 overflow-y-auto">
                    {item.items.map((item2, index) => (
                      <div key={index + item2.foodItem.title}>
                        {item2.foodItem.title} X {item2.quantity}
                      </div>
                    ))}
                  </div>
                </td>

                <td className="border border-black/30 h-10 max-h-20 p-1">
                  <div className="h-full w-20 overflow-x-auto whitespace-nowrap">
                    {item.orderNo}
                  </div>
                </td>

                <td className="border border-black/30 text-sm font-semibold h-10 max-h-20 p-1">
                  <div className="h-full w-15">{item.OrderType}</div>
                </td>

                <td className="border border-black/30 p-1 flex items-start h-max justify-start">
                  <button
                    className="bg-yellow-300 shadow-md active:shadow rounded-md cursor-pointer font-semibold text-black h-max text-xs p-2 flex w-max"
                    onClick={() => {
                      setAssignPopup(item.orderNo);
                    }}
                  >
                    {t("Restaurant.AssignPartner")}
                  </button>

                  {assignPopup === item.orderNo && (
                    <PlainPopUp setPopUp={() => setAssignPopup(null)}>
                      <AssignPopup restaurantId={1} OrderId={item.orderNo} />
                    </PlainPopUp>
                  )}
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default PreparedOrders;
