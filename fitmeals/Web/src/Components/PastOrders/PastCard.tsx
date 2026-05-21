import Image from "next/image";
import React from "react";
import "@/app/[locale]/(public)/page.css";
import Link from "@/src/Components/LocalizedLink";

interface OrderProps {
  order: {
    orderNo: number;
    customer: { name: string; email: string };
    restaurant: { name: string; area: string; images: string; address: true };
    deliveryPartner: { title: string } | null;
    OrderStatus: OrderStatusType;
    DeliveredTime: Date | null;
    modeOfPayment: string;
    Amount: any;
    items: { foodItem: { title: string }; quantity: number }[];
  };
}
const PastCard = ({ order }: OrderProps) => {
  const mapList: Record<OrderStatusType, string> = {
    Waiting: "bg-yellow-300",
    Cooking: "bg-yellow-300",
    Packing: "bg-yellow-300",
    InDelivery: "bg-green-600 text-white",
    Delivered: "bg-green-600 text-white",
  };
  return (
    <div className="border rounded-md flex-col flex gap-5 p-2 border-gray-200 h-60 mt-2">
      <div className="h-32 border-b border-gray-300 flex w-full">
        <div className="w-30 h-25 mt-3 bg-red-500 rounded-md relative">
          <Image
            src={order.restaurant.images}
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
            Order # {order.orderNo || "000"}
          </h2>
          <div className="flex items-center mt-1.5 gap-3">
            <h2 className="font-semibold text-lg">
              {order.customer.name || "user"}
            </h2>
            <h2 className="font-semibold text-sm">
              {order.customer.email || "user@gmail.com"}
            </h2>
          </div>
          <div className="flex text-3md items-center h-10 max-w-120 gap-2 font-semibold">
            <h2>Address:</h2>
            <h2 className="font-semibold text-sm max-h-10 w-40 items-center flex h-10 overflow-y-scroll">
              {order.restaurant.address || "N/A"}
            </h2>
            <i className="fa-solid fa-location-dot"></i>
            <h2>{order.restaurant.area || "N/A"}</h2>
          </div>
        </div>
        <div className="ml-auto mt-5 h-max flex-col gap-2">
          <div className="h-10 w-30 p-2 border border-gray-200 flex justify-center mr-3 rounded-md font-medium">
            Past Orders
          </div>
          <Link href="/contact/query">
            <div className="h-10 w-30 items-center gap-1 bg-green-600 shadow-lg active:shadow cursor-pointer  text-white p-2 mt-2 border border-gray-200 flex justify-center mr-3 rounded-md font-medium">
              Need Help <i className="fa-solid  mt-0.5 fa-headset"></i>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="flex ml-3 gap-2 whitespace-nowrap  items-center">
            <h2 className="font-semibold">Order Status : </h2>
            <h2
              className={`${mapList[order.OrderStatus] || "bg-gray-200"} px-3 p-1  rounded-full font-semibold`}
            >
              {order.OrderStatus || ""}
            </h2>
          </div>
          <div className="flex ml-3 gap-2 mt-3 items-center">
            <h2 className="font-semibold">Delivered Time: </h2>
            <h2>
              {order.DeliveredTime
                ? new Date(order.DeliveredTime).toLocaleString()
                : "N/A"}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex ml-3 gap-2 whitespace-nowrap items-center">
            <h2 className="font-semibold">Mode of payment </h2>
            <h2 className="">{order.modeOfPayment || "N/A"}</h2>
          </div>
          <div className="flex ml-3 gap-2 mt-3 whitespace-nowrap items-center min-w-0">
            <h2 className="font-semibold">Items :</h2>
            <div className="flex gap-2 w-[90%] h-10 p-1 hidebar overflow-x-auto flex-nowrap min-w-0">
              {order.items.map((items, index) => (
                <div
                  key={index + 1}
                  className="shrink-0 border border-gray-200 px-3 py-1 rounded-full shadow-md flex gap-1 items-center"
                >
                  <h2 className="whitespace-nowrap text-sm">
                    {items.foodItem.title}
                  </h2>
                  <h2 className="text-sm font-semibold">X</h2>
                  <h2>{items.quantity}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastCard;
