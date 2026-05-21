import React from "react";
import { getTranslations } from "next-intl/server";
import Pagestructure from "@/src/Components/RestaurantCreation/Pagestructure";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Form_Restaurant",
  });
  return (
    <div className="w-full h-max pb-10">
      <div className="text-center pt-2">
        <h1 className="text-xl lg:text-3xl font-seibold">
          {t("navbar.title")}
        </h1>
        <h3 className="text-sm opacity-50 mt-1">{t("navbar.subtitle")}</h3>
      </div>
      <div className="flex flex-col w-full bg-white md:ml-auto md:mr-auto pt-2 pl-2 md:w-[80%] md:items-center md:justify-center pr-2 pb-2">
        <Pagestructure />
      </div>
    </div>
  );
};

export default page;
