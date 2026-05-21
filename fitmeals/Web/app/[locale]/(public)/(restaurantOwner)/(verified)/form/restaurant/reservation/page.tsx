import { getRestaurantById } from "@/app/api/actions/Reservations/getRestaurants";
import { getRestaurantId } from "@/app/api/actions/restaurant/getRestaurantId";
import { getUser } from "@/lib/CurrentUser";
import SlotsCard from "@/src/Components/SlotCards/SlotsCard";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

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
  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[70%] w-[90%] flex-col items-center flex pt-3 h-max">
        <div className="flex justify-center w-full items-center">
          <div className="lg:h-25 lg:w-25 md:w-15 md:h-15 h-10 w-10 relative">
            <Image
              src="https://img.icons8.com/arcade/128/alarm.png"
              fill
              alt="bell_icon"
              sizes="(min-width: 1024px) 100px, (min-width: 768px) 60px, 40px"
            />
          </div>
          <h1 className="text-lg md:text-2xl font-semibold">{t("title")}</h1>
        </div>
        <SlotsCard
          id={restaurantData?.id ?? 0}
          openingTime={restaurantData?.openingTime ?? "00:00"}
          closingTime={restaurantData?.closingTime ?? "00:00"}
        />
      </div>
    </div>
  );
};

export default page;
