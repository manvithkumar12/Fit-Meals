import PopUpButton from "@/src/Components/General/Button/PopUpButton";
import HealthCard from "@/src/Components/TrackerCards/HealthCard";
import HealthProgressCard from "@/src/Components/TrackerCards/HealthProgressCard";
import SuggestedFood from "@/src/Components/TrackerCards/SuggestedFood";
import LoggedMeals from "@/src/Components/TrackerCards/TrackedFood";
import React from "react";
import { getTranslations } from "next-intl/server";
import { TrackGoalProvider } from "@/src/context/TrackContext/TrackGoalsContext";
import LogSection from "@/src/Components/TrackerCards/LogSection";
import { DietProvider } from "@/src/context/dietPlan/dietPlanContext";

const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Fit_tracker",
  });
  return (
    <TrackGoalProvider>
      <DietProvider>
        <div className=" w-screen h-max min-h-[90vh] justify-center md:justify-start items-center flex flex-col">
          <div className="w-full md:w-[90%] gap-3 md:gap-5 lg:gap-8 flex flex-col pt-7 items-center pb-10 overflow-hidden justify-center">
            <div className="flex flex-col gap-2 text-center md:gap-3">
              <h2 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                {t("hero-section.main-title")}
              </h2>
              <h2 className="text-sm w-[80%] text-center ml-auto mr-auto">
                {t("hero-section.subtitle")}
              </h2>
              <h2 className="font-bold">
                Today :{" "}
                {locale === "en"
                  ? new Date().toLocaleDateString("en", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  : new Date().toLocaleDateString("de", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
              </h2>
              <button className="bg-green-700 text-white font-semibold rounded-md hidden hover:shadow shadow-lg w-[80%]  lg:w-max p-2 ml-auto mr-auto mt-2">
                {t("hero-section.log-meal")}
              </button>
              <div className="mt-2 w-[80%] lg:w-max ml-auto mr-auto">
                <PopUpButton btnTxt={t("hero-section.log-meal")}>
                  <h1 className="font-semibold text-lg">
                    {t("hero-section.log-meal")}
                  </h1>
                  <div className="relative flex items-center flex-col w-95 md:w-150 lg:w-200">
                    <LogSection />
                  </div>
                </PopUpButton>
              </div>
            </div>
            <HealthProgressCard />
            <HealthCard />
            <SuggestedFood />
            <LoggedMeals />
          </div>
        </div>
      </DietProvider>
    </TrackGoalProvider>
  );
};

export default page;
