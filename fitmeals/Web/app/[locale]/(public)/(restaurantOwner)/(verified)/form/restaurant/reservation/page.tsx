import { getRestaurantById } from "@/app/api/actions/Reservations/getRestaurants";
import { getRestaurantId } from "@/app/api/actions/restaurant/getRestaurantId";
import { getUser } from "@/lib/CurrentUser";
import { getTranslations } from "next-intl/server";
import React from "react";
import NavigatorPage from "./Navigator";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Reservation_form",
  });
  const user = await getUser();
  const id = await getRestaurantId(user?.id!);
  const restaurantData = await getRestaurantById(id?.id!);
  if (!restaurantData) {
    return <div className="h-90 w-90 md:h-120 md:w-120"><ErrorComponent whiteBg label="Please try again later" refreshBtn /></div>;
  }
  return (
    <div className="w-full min-h-screen bg-slate-50/20 py-8 px-4 md:px-6 flex justify-center items-start">
      <NavigatorPage restaurantData={restaurantData} />
    </div>
  );
};

export default page;
