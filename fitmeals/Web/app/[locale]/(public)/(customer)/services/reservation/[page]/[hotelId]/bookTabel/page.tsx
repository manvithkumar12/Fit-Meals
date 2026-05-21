import { getRestaurantTimes } from "@/app/api/actions/restaurantTimes/getTimes";
import ReservationForm from "@/src/Components/reservation/ReservationForm";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async ({ params }: { params: Promise<{ hotelId: string; locale: string }> }) => {
  const { hotelId, locale } = await params;

  const numId = Number.parseInt(hotelId);
  const t = await getTranslations({ locale, namespace: "Services.reservation" });
  const timings = await getRestaurantTimes(numId);
  return (
    <div className="flex flex-col items-center gap-5 pt-10">
      <h1 className="font-bold text-3xl">{t("Tabletitle")}</h1>

      <ReservationForm
        restaurantId={numId}
        timings={timings?.reservationTime || null}
      />
    </div>
  );
}

export default page;
