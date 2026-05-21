"use client";

import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import { useInDelivery } from "@/src/query/Dashboard/useInDelivery";
import Skeleton from "@mui/material/Skeleton";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

const CompletedOrders = () => {
  const t = useTranslations("Dashboard");
  const context = useContext(RestaurantContext);
  const id = context?.id;
  const { data, isLoading } = useInDelivery(id!);
  return (
    <table>
      <thead>
        <tr className="text-xs lg:text-lg">
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.OrderNo")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.Type")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.PartnerName")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.PartnerNumber")}
          </th>
          <th className="border border-black/60 p-2 text-left">
            {t("Restaurant.DeliveryStatus")}
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((item, index) => (
              <tr key={index + 1}>
                <td colSpan={7} className="p-2">
                  <Skeleton variant="rectangular" width="100%" height={45} />
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {data?.map((item, index) => (
              <tr key={item.orderNo}>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  {item.orderNo}
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  {item.OrderType}
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  {item.deliveryPartner?.user.name}
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  {item.deliveryPartner?.user.phoneNumber}
                </td>
                <td className="border border-black/30 h-10 max-h-20 p-1">
                  In Delivery
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default CompletedOrders;
