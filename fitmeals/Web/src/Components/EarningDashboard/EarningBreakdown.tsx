"use client";

import React, { useContext } from "react";
import Row from "./Row";
import { useTranslations } from "next-intl";
import { EarningContext } from "@/src/context/Earnings/EarningContext";

const EarningBreakdown = () => {
  const context = useContext(EarningContext);

  const data = context?.EarningsData;

  const t = useTranslations("Earnings");

  const totalRevenue = data?.week ?? 0;

  const platformFee = totalRevenue * 0.15;

  const gst = platformFee * 0.18;

  const finalAmount = totalRevenue - platformFee - gst;

  return (
    <div className="space-y-2 text-md">
      <Row
        label={t("TotalRevenue.Total_Orders")}
        value={`€${totalRevenue.toFixed(2)}`}
      />

      <Row
        label={t("TotalRevenue.FitMeals_Platform_Fee")}
        value={`- €${platformFee.toFixed(2)}`}
      />

      <Row label={t("TotalRevenue.GST")} value={`- €${gst.toFixed(2)}`} />

      <div className="w-full border border-black/30"></div>

      <Row
        label={t("TotalRevenue.Final_Payable_Amount")}
        value={`€${finalAmount.toFixed(2)}`}
        bold
        green
      />
    </div>
  );
};

export default EarningBreakdown;
