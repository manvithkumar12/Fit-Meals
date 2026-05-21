import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { ReservationContext } from "@/src/context/reservationContext";
const TimingCard = () => {
  const t = useTranslations("Services");
  const context = useContext(ReservationContext);
  return (
    <div className="flex flex-col justify-center gap-5">
      <h2 className="text-2xl font-semibold font-Manrope">
        {t("reservation.Timings")}
      </h2>
      <div className="flex gap-2  font-semibold items-center lg:w-[50%] w-full border-b border-black/30 pb-5 mt-2 ">
        <i className="fa-regular fa-clock"></i>
        <h4 className="text-left">
          {context?.openingTime} to {context?.closingTime}
        </h4>
      </div>
    </div>
  );
};

export default TimingCard;
