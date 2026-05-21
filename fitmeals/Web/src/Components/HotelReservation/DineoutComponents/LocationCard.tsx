import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { ReservationContext } from "@/src/context/reservationContext";
const LocationCard = () => {
  const t = useTranslations("Services");
  const context = useContext(ReservationContext);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold font-Manrope">
        {" "}
        {t("reservation.Location")}
      </h2>
      <div className="flex flex-col  border-black/30 border-b lg:w-[50%] w-full gap-5   pb-5 mt-2 ">
        <div className="flex gap-2  justify-center  w-full ">
          <i className="fa-solid fa-location-dot mt-1"></i>
          <h4 className="mr-auto">{context?.address}</h4>
        </div>
        <button
          onClick={() => globalThis.window.open(context?.mapLink)}
          className="mr-auto cursor-pointer bg-green-700 font-semibold text-white p-2 shadow-xl active:shadow rounded-md ml-3"
        >
          {t("reservation.view_on_map")}
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
