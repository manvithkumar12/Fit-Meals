import { getOverview } from "@/app/api/actions/SubscriptionOverview/getOverview";
import { getUser } from "@/lib/CurrentUser";
import { BtnFlex, StatCard } from "@/src/Components/StatCard/StatCard";
import { S_Type } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import SubscriptionCookieUpdater from "../../(validations)/SubscriptionCookieUpdater";
export default async function MembershipDashboard({
  params,
}: Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>) {
  const type_Amount = {
    NONE: "0/MONTH",
    STARTER: "16/MONTH",
    PLUS: "29/MONTH",
    PREMIUM: "49/MONTH",
  };
  const { locale } = await params;
  const [t, user] = await Promise.all([
    getTranslations({
      locale,
      namespace: "Overview",
    }),
    getUser(),
  ]);
  if (!user?.id) redirect("/login/Customer");
  const data = await getOverview(user?.id);
  const now = Date.now();
  const end = new Date(data?.currentPeriodEnd!).getTime();
  const daysRemaining = Math.max(
    0,
    Math.ceil((end - now) / (1000 * 60 * 60 * 24)),
  );
  return (
    <>
      <SubscriptionCookieUpdater />
      <div className="h-max bg-[#f6f5f2] flex justify-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-semibold tracking-wide text-gray-900 text-center mb-10">
            {t("title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              title={t("days")}
              value={daysRemaining || 0}
              color="border-blue-900 text-blue-900"
            />
            <StatCard
              title={t("orders")}
              value={data?.OrdersPlaced || 0}
              color="border-green-800 text-green-800"
            />
            <StatCard
              title="Free Orders Remaining"
              value={data?.freeOrders || 0}
              color="border-purple-800 text-purple-800"
            />
          </div>

          <BtnFlex plan={user?.subscriptionType as S_Type} />

          <div className="border border-gray-200 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {t("Membership.Membership_Details")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <DetailCard
                label={t("Membership.Plan_Type")}
                value={data?.planType.toUpperCase() || "NONE"}
              />
              <DetailCard
                label={t("Membership.Renewal_Date")}
                value={
                  data?.currentPeriodEnd
                    ? new Date(data.currentPeriodEnd).toLocaleDateString(
                      "en-GB",
                    )
                    : "-"
                }
              />
              <DetailCard
                label={t("Membership.Monthly_Cost")}
                value={
                  type_Amount[(user?.subscriptionType as S_Type) || "NONE"]
                }
              />
              <DetailCard
                label={t("Membership.Status")}
                value={data?.status || ""}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {t("offers.Exclusive_Offers")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OfferCard
                title={t("offers.20%_Discount")}
                desc={t("offers.On_all_products")}
              />
              <OfferCard
                title={t("offers.Early_Access")}
                desc={t("offers.New_product_launches")}
              />
              <OfferCard
                title={t("offers.Priority_Support")}
                desc={t("offers.Faster_customer_service")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailCard({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function OfferCard({ title, desc }: Readonly<{ title: string; desc: string }>) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
