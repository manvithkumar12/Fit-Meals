"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Data {
  HotelName: string;
  CusionType: string;
  Location: string[];
  contactNo: number;
  CloseTime: string;
  mapLink: string;
  id: number;
}

const HotelCard = ({
  HotelName,
  CusionType,
  Location,
  CloseTime,
  contactNo,
  id,
  mapLink,
}: Data) => {
  const t = useTranslations("Services");
  const [time, setTime] = useState(new Date());
  const currentHour = time.getHours();
  const [closeHour, closeMinute] = CloseTime.split(":").map(Number);
  const currentMinute = time.getMinutes();
  const isOpen =
    currentHour < closeHour ||
    (currentHour === closeHour && currentMinute < closeMinute);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="lg:w-[40%] w-full h-max bg-[#fbf9f3] flex flex-col gap-2 p-5 rounded-xl shadow-lg">
      <h4 className="text-xl font-bold">{HotelName}</h4>
      <h4 className="text-md">
        {t("reservation.Cuisine_Type")}:
        <span className="font-bold ml-1">{CusionType}</span>
      </h4>
      <div className="flex items-center gap-1">
        <h4 className="text-md">
          {t("reservation.Location")}:
          <span className="font-bold ml-1">{Location}</span>
        </h4>
      </div>
      <div className="flex gap-1 border-b border-black/30 pb-2">
        {isOpen ? (
          <h4 className="text-[#1ca773] font-bold">
            {t("reservation.closed")}: {t("reservation.opens_at")}
          </h4>
        ) : (
          <h4 className="text-green-500 font-bold">
            {t("reservation.open")} until : 
          </h4>
        )}
        <h4 className="font-bold">{CloseTime}</h4>
      </div>
      <div className="flex justify-between mt-2 text-sm ">
        <Link href={`${id}/bookTabel`}>
          <button className=" cursor-pointer border-r w-[30%%] whitespace-nowrap border-black/30 pr-3 flex justify-center items-center gap-2 font-bold">
            {t("reservation.Book_Table")}
            <Image
              src="https://img.icons8.com/external-others-phat-plus/64/external-business-business-outline-others-phat-plus-15.png"
              width={20}
              height={20}
              alt="image"
            />
          </button>
        </Link>
        <button
          onClick={() => {
            globalThis.window.open(`tel:${contactNo}`);
          }}
          className=" cursor-pointer border-r border-black/30 w-[30%] flex justify-center items-center gap-2 font-bold"
        >
          {t("reservation.Call")}{" "}
          <Image
            src="https://img.icons8.com/color/48/phone.png"
            width={20}
            height={20}
            alt="image"
          />
        </button>
        <button
          onClick={() => {
            globalThis.window.open(mapLink);
          }}
          className="cursor-pointer pr-3 flex justify-center w-[30%] items-center gap-2 font-bold"
        >
          {t("reservation.Direction")}
          <Image
            src="https://img.icons8.com/ios-glyphs/30/navigation.png"
            width={20}
            height={20}
            alt="image"
          />
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
