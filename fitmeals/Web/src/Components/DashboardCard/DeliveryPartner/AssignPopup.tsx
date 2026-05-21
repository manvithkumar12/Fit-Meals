"use client";

import React from "react";
import { useNearByRiders } from "@/src/query/useNearPartners";
import { toast } from "react-toastify";
import { useToCooking } from "@/src/mutations/Dashboard/Restuarnt/toDelivery";
import Skeleton from "@mui/material/Skeleton";

const AssignPopup = ({
  restaurantId,
  OrderId,
}: {
  restaurantId: number;
  OrderId: number;
}) => {
  const { data, isLoading, isError } = useNearByRiders(restaurantId);
  const mutation = useToCooking();

  return (
    <div className="flex w-50 md:w-125 h-80 bg-white  rounded-sm p-2.5">
      {isLoading ? (
        <div className="w-full h-full flex flex-col gap-2">
          {Array.from({ length: 4 }).map((Item, index) => (
            <Skeleton
              key={index + 1}
              variant="rectangular"
              width="100%"
              height={40}
              className="bg-red-100 rounded-md"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="w-full h-full flex gap-2 flex-col items-center justify-center">
          <div className="font-semibold text-md w-full text-center bg-red-100">
            Something went wrong
          </div>
          <button className="p-1 cursor-pointer rounded-md px-2 bg-green-600 font-semibold text-white">
            Assign Own Partner
          </button>
        </div>
      ) : !isLoading && data?.length === 0 ? (
        <div className="w-full h-full flex gap-2 flex-col items-center justify-center">
          <div className="font-semibold text-md  w-full text-center">
            No Delivery Partners Available
          </div>
          <button className="p-1 cursor-pointer rounded-md px-2 bg-green-600 font-semibold text-white">
            Assign Own Partner
          </button>
        </div>
      ) : (
        <ul className="flex flex-col w-full h-full gap-2 overflow-y-scroll p-2">
          {data?.map((item, index) => (
            <li
              className="flex items-center justify-between w-full h-max border border-black p-2"
              key={item.id}
            >
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>

                <h3 className="text-xs text-gray-500">
                  {item.deliveredOrders} orders delivered
                </h3>
              </div>

              <button
                onClick={() =>
                  mutation.mutate(
                    {
                      restaurantId,
                      orderNo: OrderId,
                      riderId: item.id,
                      riderName: item.title,
                      riderPhone: String(item.user.phoneNumber || ""),
                    },
                    {
                      onSuccess: () => {
                        toast.success("Rider assigned");
                      },
                      onError: () => {
                        toast.error("Failed to assign rider");
                      },
                    },
                  )
                }
                disabled={mutation.isPending}
                className="bg-yellow-300 shadow-md active:shadow rounded-md cursor-pointer font-semibold text-black h-max text-xs p-2 flex w-max"
              >
                {mutation.isPending ? "Assigning..." : "Assign"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignPopup;
