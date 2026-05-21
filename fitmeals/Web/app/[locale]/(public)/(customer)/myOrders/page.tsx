import PastOrders from "@/src/Components/PastOrders/PastOrders";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "MyOrders",
  });
  return (
    <div className="w-full h-max flex justify-center">
      <div className="w-[80%] pt-10 h-50">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <PastOrders />
      </div>
    </div>
  );
};

export default page;
