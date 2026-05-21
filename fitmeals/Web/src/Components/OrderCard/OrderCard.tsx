"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";

interface Data {
  Adress: string;
  ArrivalTime: number;
  Amount: number;
  Items: { quantity: number; foodItem: { title: string } }[];
  orderId: number;
}

const OrderCard = ({ Adress, ArrivalTime, Amount, Items, orderId }: Data) => {
  const t = useTranslations("Status");
  return (
    <div className="w-full h-full p-2">
      <div className="p-2 border-b border-black/25 w-full h-13">
        <h1 className="text-2xl font-semibold font-montserrat">
          {t("detailsCard.title")}
        </h1>
      </div>
      <div className="p-2 border-b border-black/25 w-full h-max flex flex-col flex-wrap">
        <h3 className="text-[16px] font-semibold font-montserrat">
          {t("detailsCard.deliveryAddress")}
        </h3>
        <h4>{Adress}</h4>
      </div>
      <div className="p-2 border-b border-black/25 w-full items-center  h-max flex">
        <div>
          <h3 className="text-[16px] font-semibold font-montserrat">
            {t("detailsCard.modeOfPayment")}
          </h3>
          <h4>RazorPay</h4>
        </div>
      </div>
      <div className="p-2 border-b border-black/25 w-full h-15 flex items-center justify-center gap-3 ">
        <i className="fa-regular fa-clock text-xl text-green-800 font-semibold"></i>
        <h1 className="text-xl text-green-800 font-semibold xl:mr-17">
          {t("time.Arriving_in")} {ArrivalTime} {t("time.minutes")}
        </h1>
      </div>
      <div className="p-2 border-b border-black/25 w-full h-max">
        <div className="flex mt-2">
          <h3 className="text-2xl ml-1 font-bold font-montserrat">${Amount}</h3>
          <h4 className="ml-auto">
            {Items.length} {t("detailsCard.dishes")}
          </h4>
        </div>
        <div className="flex flex-col gap-1 h-max max-h-22 overflow-y-scroll mt-5">
          {Items.map((item, index) => (
            <div className="flex gap-3 items-center" key={index + 1}>
              <div className="h-3 w-3 rounded-full bg-green-300"></div>
              <h5>{item.foodItem.title}</h5> X {item.quantity}
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <Link href={"/contact/query"}>
        <button className="p-2 rounded-md text-white gap-2 flex justify-center items-center font-semibold bg-green-700 mt-3 mb-2">
          <i className="fa-solid fa-headset"></i>
          {t("detailsCard.contactSupport")}
        </button>
      </Link>
    </div>
  );
};

export default OrderCard;
