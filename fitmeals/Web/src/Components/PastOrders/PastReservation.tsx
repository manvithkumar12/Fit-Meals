import Image from "next/image";
import React from "react";
import "@/app/[locale]/(public)/page.css";
import { reservationStatus } from "@prisma/client";
interface OrderProps {
  reservation: {
    id: number;
    users: { name: string; email: string };
    restaurant: {
      name: string;
      address: string;
      area: string;
      images: string;
      phoneNumber: string;
      mapLink: string;
      cuisineType: string;
    };
    reservationTime: string;
    numberOfPeople: number;
    reservationDate: string;
    status: reservationStatus;
  };
}
const PastReservation = ({ reservation }: OrderProps) => {
  const mapList: Record<reservationStatus, string> = {
    COMPLETED: "bg-green-300",
    CONFIRMED: "bg-green-600",
    CANCELLED: "bg-red-600",
  };
  return (
    <div className="border rounded-md flex-col flex gap-5 p-2 border-gray-200 h-62 mt-2">
      <div className="h-35 border-b border-gray-300 flex w-full">
        <div className="w-30 h-25 mt-3 bg-red-500 rounded-md relative">
          <Image
            src={reservation.restaurant.images}
            alt="hotel_image"
            fill
            sizes="120px"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
            className="object-cover rounded-md"
          />
        </div>
        <div className="ml-4 mt-2 flex flex-col">
          <h2 className="font-semibold text-xl">
            Reservation # {reservation.id || "000"}
          </h2>
          <div className="flex items-center mt-1.5 gap-3">
            <h2 className="font-semibold text-lg">
              {reservation.users.name || "user"}
            </h2>
            <h2 className="font-semibold text-sm">
              {reservation.users.email || "user@gmail.com"}
            </h2>
          </div>
          <div className="flex text-3md items-center h-10 max-w-120 gap-2 font-semibold">
            <h2>Address:</h2>
            <h2 className="font-semibold text-sm max-h-10 w-40 items-center flex h-10 overflow-y-scroll">
              {reservation.restaurant.address || "N/A"}
            </h2>
            <i className="fa-solid fa-location-dot"></i>
            <h2>{reservation.restaurant.area || "N/A"}</h2>
          </div>
          <div className="flex items-center font-semibold mb-3">
            <h2>Cuisine Type :</h2>
            <h2 className="font-semibold text-sm  w-40 items-center flex  overflow-y-scroll">
              {reservation.restaurant.cuisineType || "N/A"}
            </h2>
          </div>
        </div>
        <div className="ml-auto mt-5 h-max flex-col gap-2">
          <div
            className="h-10 w-45 cursor-pointer shadow-md active:shadow whitespace-nowrap p-2 border border-gray-200 flex justify-center mr-3 rounded-md font-medium"
            onClick={() =>
              globalThis.window.open(
                `tel:${reservation.restaurant.phoneNumber}`,
              )
            }
          >
            Contact Restaurant
          </div>
          <div className="h-10 w-45 items-center gap-1 bg-green-600 shadow-lg active:shadow cursor-pointer  text-white p-2 mt-2 border border-gray-200 flex justify-center mr-3 rounded-md font-medium">
            Need Help <i className="fa-solid  mt-0.5 fa-headset"></i>
          </div>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="flex ml-3 gap-2 whitespace-nowrap  items-center">
            <h2 className="font-semibold">Order Status : </h2>
            <h2
              className={`${mapList[reservation.status] || "bg-gray-200"} px-3 p-1 text-white rounded-full font-semibold`}
            >
              {reservation.status || ""}
            </h2>
          </div>
          <div className="flex ml-3 gap-2 mt-3 items-center">
            <h2 className="font-semibold">Reservation Time: </h2>
            <h2>{reservation.reservationTime || "N/A"}</h2>
          </div>
        </div>
        <div className="h-max flex gap-4 flex-col">
          <div className="flex ml-3 gap-2 whitespace-nowrap items-center">
            <h2 className="font-semibold">Reservation Date </h2>
            <h2 className="">{reservation.reservationDate || "N/A"}</h2>
          </div>
          <div className="mt-1">
            <div className="flex ml-3 gap-2 whitespace-nowrap items-center">
              <h2 className="font-semibold">No of Seats:</h2>
              <h2 className="">{reservation.numberOfPeople || "N/A"}</h2>
            </div>
          </div>
        </div>
        <button
          className="ml-auto mr-3 bg-green-600 h-max p-2 w-45 rounded-md font-semibold text-white"
          onClick={() => {
            globalThis.window.open(reservation.restaurant.mapLink);
          }}
        >
          View maps <i className="fa-solid fa-map-location-dot ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default PastReservation;
