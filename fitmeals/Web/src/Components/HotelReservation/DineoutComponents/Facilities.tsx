import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { ReservationContext } from "@/src/context/reservationContext";

const Facilities = () => {
  const t = useTranslations("Services");
  const context = useContext(ReservationContext);
  return (
    <div className="flex flex-col justify-center gap-5">
      <h2 className="text-2xl font-semibold font-Manrope">
        {t("reservation.Facilities")}
      </h2>
      <div className="flex gap-2 font-semibold items-center lg:w-[50%] w-full flex-wrap h-max pb-5 mt-2 ">
        {context?.facilities.map((item, index) => (
          <h4 className="font-semibold text-md" key={index + 1}>
            • {item}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
