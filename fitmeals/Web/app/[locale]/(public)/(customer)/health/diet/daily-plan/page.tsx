import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import TargetBar from "@/src/Components/DietComponents/TargetBar";
import DetailsCard from "@/src/Components/DietComponents/DetailsCard";
import DietProviders from "@/src/Components/DietComponents/Provider/DietProviders";
import DailyLoggedMeals from "@/src/Components/DietComponents/DailyLoggedMeals";

const Loading = () => (
  <div className="flex h-24 w-full items-center justify-center">
    Loading...
  </div>
);

const AiComponent = dynamic(
  () => import("@/src/Components/DietComponents/Ai-info")
);

const AiSteps = dynamic(
  () => import("@/src/Components/DietComponents/Ai-Steps")
);

const DailyTracker = dynamic(
  () => import("@/src/Components/DietComponents/DailyTracker")
);

const DietCardsContainer = dynamic(
  () => import("@/src/Components/DietComponents/DietCardsContainer")
);

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "DietPlan",
  });

  return (
    <DietProviders>
      <div className="flex w-full flex-col items-center gap-3 pt-3 pb-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            {t("main.title")}
          </h1>

          <h3 className="text-sm opacity-20">
            {t("main.sub-title")}
          </h3>
        </div>

        <div className="w-[95%]">
          <TargetBar />
        </div>

        <div className="mt-2 flex w-[95%] flex-col-reverse items-center justify-center gap-3 lg:flex-row lg:items-start">
          <div className="flex h-full w-full flex-col gap-3 lg:w-[25%]">
            <DetailsCard />

            <div className="hidden min-h-60 h-max w-full rounded-lg border border-gray-200 bg-[#F0F0E5] p-3 text-left lg:block">
              <h2 className="text-center text-xl font-semibold">
                {t("disclamer.title")}
              </h2>

              <p className="mt-2 text-md opacity-80">
                {t("disclamer.description")}
              </p>

              <p className="mt-2 text-md opacity-80">
                {t("disclamer.description2")}
              </p>
            </div>

            <div className="flex w-full flex-col justify-center rounded-lg border border-gray-200 bg-[#F0F0E5] p-3 xl:h-74 md:h-63">
              <DailyLoggedMeals />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-[75%]">
            <Suspense fallback={<Loading />}>
              <AiComponent />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <AiSteps />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <DailyTracker />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <DietCardsContainer />
            </Suspense>
          </div>
        </div>
      </div>
    </DietProviders>
  );
}
