import CustomerDashboard from "@/src/Components/DashboardCard/Customer/CustomerDashboard";
import React from "react";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  return (
    <div className="flex w-screen min-h-[90vh] flex-col md:flex-row md:flex-wrap h-max">
      <CustomerDashboard />
    </div>
  );
};

export default Page;
