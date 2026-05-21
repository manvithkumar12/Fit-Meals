"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import NewOrders from "./Tables/NewOrders";
import ProgressOrders from "./Tables/ProgressOrders";
import PreparedOrders from "./Tables/PreparedOrders";
import CompletedOrders from "./Tables/CompletedOrders";
import { RestaurantContext } from "@/src/context/Dashboard/RestaurantContext";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";

const OngoingOrders = () => {
  const context = useContext(RestaurantContext);
  const data = context?.restaurantData;
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const premiumOrder = data?.newOrders.filter(
    (item) => item.OrderType === "PREMIUM",
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalOrders =
    (data?.newOrders?.length ?? 0) +
    (data?.inProgressOrders?.length ?? 0) +
    (data?.preparedOrders?.length ?? 0);

  if (totalOrders === 0) {
    return (
      <div className="w-72 h-72 md:w-96 md:h-96 lg:w-100 lg:h-100 ml-auto mr-auto">
        <ErrorComponent label={"No Data Available"} whiteBg />
      </div>
    );
  }

  const cards = [
    {
      title: t("Restaurant.PendingDelivery"),
      icon: "https://img.icons8.com/ios-filled/100/delivery--v1.png",
      count: data?.newOrders.length ?? 0,
    },
    {
      title: t("Restaurant.OrdersInPreparation"),
      icon: "https://img.icons8.com/?size=100&id=Y9yTZCvh7Vzb&format=png&color=000000",
      count: data?.inProgressOrders.length ?? 0,
    },
    {
      title: t("Restaurant.PendingPremiumOrders"),
      icon: "https://img.icons8.com/?size=100&id=77168&format=png&color=000000",
      count: premiumOrder?.length ?? 0,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 pb-10">
      <section className="w-full flex justify-center  items-center">
        <div className="flex flex-col gap-3 justify-center items-center lg:flex-row w-[90%] lg:w-full">
          {cards.map((item, index) => (
            <div
              key={item.title}
              className="h-50 w-full lg:w-[30%] bg-white border border-gray-300 rounded-sm shadow-md flex flex-col p-2.5"
            >
              <div className="flex justify-center ml-3 items-center w-max gap-2">
                <div className="h-10 w-10 relative">
                  <Image
                    alt={item.title}
                    fill
                    sizes="40px"
                    src={item.icon}
                    placeholder="blur"
                    blurDataURL="/blur.jpeg"
                  />
                </div>
                <h3 className="text-xs md:text-md  lg:text-xl ">
                  {item.title}
                </h3>
              </div>

              <div className="rounded-full border border-black w-max p-5 mx-auto mt-2">
                <h1 className="text-6xl font-bold font-montserrat">
                  {item.count}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full justify-center items-center">
        <div className="w-[90%] h-80 bg-white">
          <div className="h-full w-full bg-white overflow-x-scroll border shadow-md rounded-sm border-gray-300 flex flex-col p-3">
            <NewOrders />
          </div>
        </div>
      </section>

      <section className="w-full justify-center items-center flex flex-col xl:flex-row gap-5">
        <div className="w-[90%] xl:w-[48%] h-75">
          <div className="h-full w-full bg-white overflow-x-scroll border shadow-md rounded-sm border-gray-300 flex flex-col p-3">
            <ProgressOrders />
          </div>
        </div>

        <div className="w-[90%] xl:w-[48%] h-75">
          <div className="h-full w-full bg-white overflow-x-scroll rounded-sm border border-gray-300 shadow-md flex flex-col p-3 overflow-scroll">
            <PreparedOrders />
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center items-center">
        <div className="w-[90%] h-80 bg-white">
          <div className="h-full w-full overflow-x-scroll bg-white border shadow-md rounded-sm border-gray-300 flex flex-col p-3">
            <CompletedOrders />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OngoingOrders;
