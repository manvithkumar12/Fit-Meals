"use client";
import { usePathname } from "next/navigation";
import DeliveryAgentCard from "./RiderDetails";
import Status from "./Status";
import { useTranslations } from "next-intl";
interface Dataprops {
  data?: {
    title: string;
    deliveredOrders: number;
    user: { phoneNumber: string | null; profileUrl: string | null };
  };
  orderStatus:
    | "Waiting"
    | "Cooking"
    | "Packing"
    | "InDelivery"
    | "Delivered"
    | "CANCELLED";
}
const FoodCard = ({ data, orderStatus }: Dataprops) => {
  const t = useTranslations("Status");
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();
  const formattedOrderId = orderId ? orderId.toString().padStart(5, "0") : "";

  return (
    <div className="flex flex-col w-full lg:w-[70%] lg:pl-10 ">
      <div className="flex flex-col justify-center w-full items-center lg:items-start">
        <div className="flex gap-1 items-center w-max">
          <i className="fa-solid fa-house ml-1 opacity-50"></i>
          <h4 className=" font-semibold opacity-50 cursor-pointer">
            {t("navbar.home")}
          </h4>
          <h4 className=" font-semibold opacity-50 ">/</h4>
          <h4 className=" font-semibold opacity-50 cursor-pointer">
            {t("navbar.status")}
          </h4>
        </div>
        <div className="flex flex-col gap-1 w-max justify-center">
          <h1 className="text-5xl text-green-800 font-semibold mt-2 w-max">
            {t("navbar.order")} {formattedOrderId}
          </h1>
          <h4 className="text-xl ml-1 text-center lg:text-left">
            {t("navbar.description")}
          </h4>
        </div>
      </div>
      <Status orderStatus={orderStatus} />
      <div className="w-full flex items-center justify-center gap-2"></div>
      <div className="w-full flex justify-center lg:w-[80%] lg:justify-start">
        <div className="flex  mt-10 justify-center lg:justify-start lg:w-full w-98 mr-2 pl-2 pr-2">
          <DeliveryAgentCard
            name={data?.title ?? "NOT ASSIGNED"}
            phone={data?.user.phoneNumber ?? "N/A"}
            totalOrders={data?.deliveredOrders ?? 0}
            ImgUrl={
              data?.user.profileUrl ??
              "https://imgs.search.brave.com/LkMS8LFptTgRa4YjI049fn-OD3W9dWuPcDtKJ_NjLRw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxMi8w/NC8yNi8xOS80My9w/cm9maWxlLTQyOTE0/XzY0MC5wbmc"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
