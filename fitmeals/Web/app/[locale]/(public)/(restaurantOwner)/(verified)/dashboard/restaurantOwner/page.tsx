import RestaurantDashboard from "@/src/Components/DashboardCard/Restaurant/RestaurantDashboard";
import React from "react";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  return (
    <div className="flex w-screen min-h-[90vh] flex-col md:flex-row md:flex-wrap h-max">
      <RestaurantDashboard />
    </div>
  );
};

export default Page;
