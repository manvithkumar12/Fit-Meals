"use client";
import React, { useState } from "react";
import Table from "./Table";
import { useAllDeliverys } from "@/src/query/Dashboard/Partner/useAllDelivery";
import { useTranslations } from "next-intl";

const Dpdashboard = ({ partnerId }: { partnerId: number }) => {
  const [filter, setFilter] = useState("MyOrders");
  const t = useTranslations("DeliveryPartner");
  const { data: AllData, isLoading, isError } = useAllDeliverys(partnerId);
  return (
    <div className="flex bg-[#F6F7F9] h-screen  overflow-x-scroll flex-col gap-3 w-full justify-center items-center md:items-start md:justify-start">
      <nav className="flex md:w-max w-[90%] md:ml-5 mt-5">
        {[{ key: "MyOrders", label: t("navbar.MyOrders") }].map((item) => (
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
      </nav>
      {filter === "MyOrders" && (
        <Table
          isLoading={isLoading}
          isError={isError}
          labels={[
            t("navbar.OrderId"),
            t("navbar.RestaurantName"),
            t("navbar.ReceivedTime"),
            t("navbar.DeliveredTime"),
            t("navbar.Status"),
            t("navbar.Earnings"),
            t("navbar.action"),
          ]}
          Data={AllData}
          Type="MyOrders"
        />
      )}
    </div>
  );
};

export default Dpdashboard;
