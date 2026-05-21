import EarningBreakdown from "@/src/Components/EarningDashboard/EarningBreakdown";
import LabelCards from "@/src/Components/EarningDashboard/LabelCards";
import { getTranslations } from "next-intl/server";
import RecentOrdersComponent from "@/src/Components/EarningDashboard/RecentOrders";
import { EarningProvider } from "@/src/context/Earnings/EarningContext";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Earnings" });
  return (
    <EarningProvider>
      <div className="min-h-screen bg-[#f7f7f7] p-4 md:p-6">
        <h1 className="text-2xl font-semibold">{t("main.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("main.subtitle").split("Monday")[0]} <b>{t("earnings.monday")}</b>{" "}
          {t("main.subtitle").split("Monday")[1]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <LabelCards />
        </div>

        <div className="bg-white rounded-xl p-4 mt-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-3">
            {t("earnings.todaysEarnings")}
          </h2>
          <EarningBreakdown />
        </div>

        <div className="bg-white rounded-xl p-4 mt-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">
            {t("more.Recent_Earnings")}
          </h2>
          <RecentOrdersComponent />
        </div>

        <div className="text-xs text-gray-500 text-center mt-6">
          {t("earnings.autoCreditedToBank")}{" "}
        </div>
      </div>
    </EarningProvider>
  );
};

export default Page;
