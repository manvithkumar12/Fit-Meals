import { getPartnerId } from "@/app/api/actions/Dashboard/DeliveryAgent/allPartnerOrders";
import { getUser } from "@/lib/CurrentUser";
import Dpdashboard from "@/src/Components/DashboardCard/DeliveryPartner/DP-Dashboard";
import React from "react";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const user = await getUser();
  const partnerId = await getPartnerId(user?.id!);
  return (
    <div className="flex w-screen min-h-[90vh] flex-col md:flex-row md:flex-wrap h-max">
      <Dpdashboard partnerId={partnerId!} />
    </div>
  );
};

export default Page;
