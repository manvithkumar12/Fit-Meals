import React from "react";
import { MiniOfferCard, OfferCard } from "./OfferCard";
import LocationCard from "./LocationCard";
import TimingCard from "./TimingCard";
import Facilities from "./Facilities";
import { useTranslations } from "next-intl";
const Dineoutsection = () => {
  const t = useTranslations("Services");


  return (
    <>
      <div className="mini-nav w-full flex-col min-h-10 mt-3 gap-2 h-max pb-5 border-b-4 border-black/30">
        <h2 className="text-2xl font-semibold font-Manrope">
          {t("reservation.offers")}
        </h2>
        <div className="w-full  flex lg:gap-3 gap-2 flex-wrap overflow-x-scroll md:justify-start justify-center mt-3">
          <OfferCard />
          <OfferCard />
          <OfferCard />
        </div>
        <div className="w-full flex lg:gap-3 gap-2 justify-center md:justify-start mt-4 flex-wrap overflow-x-scroll">
          <MiniOfferCard />
          <MiniOfferCard />
          <MiniOfferCard />
        </div>
      </div>

      <div className="mini-nav w-full flex-col  flex min-h-10 mt-5 gap-5 h-max">
        <LocationCard />

        <TimingCard />

        <Facilities />
      </div>
    </>
  );
};

export default Dineoutsection;
