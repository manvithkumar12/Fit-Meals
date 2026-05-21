import React from "react";
import { getTranslations } from "next-intl/server";
import AddMealstructure from "@/src/Components/RestaurantCreation/RestaurantMeals/AddMealstructure";

const Page = async ({ params }: { params: Promise<{ id: string; locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "Form_Meals",
  });
  return (
    <div className="w-full h-max">
      <div className="text-center pt-3">
        <h1 className="text-xl lg:text-3xl font-semibold">
          {t("header.title")}
        </h1>
        <h3 className="text-sm opacity-50 mt-1">{t("header.subtitle")}</h3>
      </div>

      <div className="flex pb-10 flex-col w-full bg-white md:ml-auto md:mr-auto pt-2 pl-2 md:w-[80%] md:items-center md:justify-center pr-2 ">
        <AddMealstructure />
      </div>
    </div>
  );
};

export default Page;
