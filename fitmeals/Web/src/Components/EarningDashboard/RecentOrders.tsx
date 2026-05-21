"use client";
import React, { useContext, useState } from "react";
import OrderRow from "./OrderRow";
import { useTranslations } from "next-intl";
import { EarningContext } from "@/src/context/Earnings/EarningContext";

const RecentOrdersComponent = () => {
  const t = useTranslations("Earnings");
  const context = useContext(EarningContext);
  const recentOrders = context?.EarningsData?.recentOrders || [];
  const [orderSize, setOrderSize] = useState(4);
  const isExpandable = recentOrders.length < 4;
  const isMaxLength = recentOrders.length;
  return (
    <>
      <div className="space-y-3">
        <div className="w-full flex justify-end"></div>
        {recentOrders.slice(0, orderSize).map((items, index) => (
          <OrderRow
            key={index + 1}
            orderId={items.orderNo}
            date={items.OrderedTime}
            amount={items.Amount}
          />
        ))}
      </div>
      <div className="flex w-full justify-end">
        {!isExpandable &&
          (isMaxLength <= orderSize ? (
            <button
              onClick={() => setOrderSize(4)}
              className="bg-green-700 mt-2 rounded-lg cursor-pointer shadow-lg active:shadow text-white font-semibold p-2 ml-auto w-max"
            >
              {t("more.showlessbtn")}
            </button>
          ) : (
            <button
              className="bg-green-700 mt-2 font-semibold rounded-lg shadow-lg active:shadow cursor-pointer text-white p-2"
              onClick={() => setOrderSize(orderSize + 4)}
            >
              {t("more.loadmorebtn")}
            </button>
          ))}
      </div>
    </>
  );
};

export default RecentOrdersComponent;
