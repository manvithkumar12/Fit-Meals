"use client";
import React, { useContext } from "react";
import SummaryCard from "./SummaryCard";
import { useTranslations } from "next-intl";
import { EarningContext } from "@/src/context/Earnings/EarningContext";

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-GB");
};

const LabelCards = () => {
  const context = useContext(EarningContext);

  const EarningsData = context?.EarningsData;

  const Today = formatDate(new Date());

  const t = useTranslations("Earnings");

  return (
    <>
      <SummaryCard
        title={t("earnings.This_Week_Earnings")}
        value={EarningsData?.week?.toString() ?? "N/A"}
        note={
          EarningsData?.startOfWeek
            ? `${formatDate(EarningsData.startOfWeek)} - ${Today}`
            : "0 - 0"
        }
      />

      <SummaryCard
        title={t("earnings.todaysEarnings")}
        value={EarningsData?.today?.toString() ?? "N/A"}
        note={t("earnings.amountEarnedToday")}
      />

      <SummaryCard
        title={t("earnings.nextPayout")}
        value={t("earnings.monday")}
        nosymbol={true}
        note={t("earnings.autoCreditedToBank")}
      />
    </>
  );
};

export default LabelCards;
