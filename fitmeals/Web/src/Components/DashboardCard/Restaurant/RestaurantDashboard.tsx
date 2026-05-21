"use client";
import React, { useContext, useState } from "react";
import OngoingOrders from "./OngoingOrders";
import { useTranslations } from "next-intl";
import {
  RestaurantContext,
  RestaurantProvider,
} from "@/src/context/Dashboard/RestaurantContext";
import AllOrders from "./CompletedOrders";
import StatusBtn from "./StatusBtn";

const RestaurantDashboard = () => {
  const t = useTranslations("Dashboard");
  const [filter, setFilter] = useState("ongoing");
  const context = useContext(RestaurantContext);
  const status = context?.restaurantData?.status;
  return (
    <RestaurantProvider>
      <div className="flex bg-[#F6F7F9] flex-col gap-3 w-full overflow-x-scroll justify-center items-center md:items-start md:justify-start">
        <nav className="flex w-full pl-4 pr-4 gap-2 mt-5">
          {[
            { key: "ongoing", label: t("Restaurant.ongoing") },
            { key: "All orders", label: t("Restaurant.completeOrders") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`border font-semibold p-2.5 text-sm border-black/30 hover:text-black cursor-pointer ${
                filter === item.key ? "text-black" : "text-black/50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <StatusBtn />
        </nav>
        {filter === "ongoing" && <OngoingOrders />}
        {filter === "All orders" && <AllOrders />}
      </div>
    </RestaurantProvider>
  );
};

export default RestaurantDashboard;
