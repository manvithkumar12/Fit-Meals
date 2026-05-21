"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type DeliveryAgentProps = {
  name: string;
  phone: string;
  totalOrders: number;
  ImgUrl?: string;
};

const DeliveryAgentCard = ({
  name,
  phone,
  totalOrders,
  ImgUrl,
}: DeliveryAgentProps) => {
  const t = useTranslations("Status");
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 w-full">
      <h3 className="text-lg font-semibold mb-3">{t("deliveryAgent.title")}</h3>
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-sm">
          <h2 className="text-[16px]">
            <span className="font-medium">{t("deliveryAgent.name")}:</span>
            <span className="font-semibold"> {name}</span>
          </h2>
          <h2 className="text-[16px]">
            <span className="font-medium">{t("deliveryAgent.contact")}:</span>{" "}
            <span className="font-semibold">{phone}</span>
          </h2>
          <h2 className="text-[16px]">
            <span className="font-medium">
              {t("deliveryAgent.Orders_Delivered")}:
            </span>
            <span className="font-semibold"> {totalOrders}</span>
          </h2>
        </div>
        <div className="h-20 w-20 rounded-full relative">
          {ImgUrl ? (
            <Image
              src={ImgUrl}
              alt="profile"
              fill
              sizes="80px"
              placeholder="blur"
              blurDataURL="/blur.jpeg"
              className="rounded-full object-contain"
            />
          ) : (
            <Image
              src="/user-icon.webp"
              alt="profile"
              fill
              sizes="80px"
              placeholder="blur"
              blurDataURL="/blur.jpeg"
              className="rounded-full object-contain"
            />
          )}
        </div>
      </div>
      <button
        className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer"
        onClick={() => window.open(`tel:${phone}`)}
      >
        Contact Now
      </button>
    </div>
  );
};

export default DeliveryAgentCard;
