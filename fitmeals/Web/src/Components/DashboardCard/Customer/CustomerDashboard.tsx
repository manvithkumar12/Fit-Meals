"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import RequestsTable from "./OrdersTable";

const CustomerDashboard = () => {
  const [filter, setFilter] = useState("myRequest");
  const t = useTranslations("Customer");
  return (
    <div className="flex bg-[#F6F7F9] overflow-x-scroll flex-col gap-3 w-full justify-center items-center md:items-start md:justify-start">
      <nav className="flex md:w-max w-[90%] md:ml-5 mt-5">
        {[{ key: "myRequest", label: t("navbar.My_Request") }].map((item) => (
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
      {filter === "myRequest" && (
        <RequestsTable
          labels={[
            t("myRequest.Request_Id"),
            t("myRequest.Items"),
            t("myRequest.Information"),
            t("myRequest.Amount"),
            t("myRequest.Created-At"),
          ]}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
