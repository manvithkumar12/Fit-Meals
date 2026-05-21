"use client";
import { changeStatus } from "@/app/api/actions/Dashboard/Restaurant/ChangeStatus";
import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";

const StatusBtn = () => {
  const t = useTranslations("Dashboard");
  const context = useContext(RestaurantContext);
  const status = context?.restaurantData?.status;
  const [loading, setLoading] = useState(false);

  const handleChange = async (currentStatus: string) => {
    if (context?.id) {
      setLoading(true);
      try {
        const newState = currentStatus === "ACTIVE" ? "REST" : "ACTIVE";
        await changeStatus(newState, context.id);
      } catch (error) {
        console.error("Failed to update status", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {status === "ACTIVE" ? (
        <button
          disabled={loading}
          onClick={() => handleChange("ACTIVE")}
          className="ml-auto text-xs lg:text-[14px] cursor-pointer p-1 flex justify-center items-center text-center w-max lg:p-2 rounded-md text-white font-semibold bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}{" "}
          {t("Restaurant.REST")}
        </button>
      ) : status === "REST" ? (
        <button
          disabled={loading}
          onClick={() => handleChange("REST")}
          className="ml-auto text-xs lg:text-[14px] cursor-pointer p-1 flex justify-center items-center text-center w-max lg:p-2 rounded-md text-white font-semibold bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}{" "}
          {t("Restaurant.OPEN")}
        </button>
      ) : (
        <button
          disabled
          className="ml-auto text-xs lg:text-[14px] cursor-pointer p-1 flex justify-center items-center text-center w-max lg:p-2 rounded-md text-white font-semibold bg-gray-500"
        >
          Loading...
        </button>
      )}
    </>
  );
};

export default StatusBtn;
