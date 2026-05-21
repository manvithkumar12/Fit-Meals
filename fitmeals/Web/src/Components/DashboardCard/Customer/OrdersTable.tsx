"use client";
import { useUser } from "@/src/context/UserContext";
import { useALlOrders } from "@/src/query/Dashboard/Customer/useAllOrders";
import Skeleton from "@mui/material/Skeleton";
import React, { useState } from "react";
import ErrorComponent from "../../errorComponent/ErrorComponent";

type TableProps = { labels: string[] };

const OrderTable = ({ labels }: TableProps) => {
  const user = useUser();
  const [orderPage] = useState(1);
  const {
    data: MyOrders,
    isLoading,
    isError,
  } = useALlOrders(user?.id ?? null, orderPage);
  return (
    <div className="w-full overflow-x-scroll h-max p-5 lg:p-0">
      <table className="w-[95%] ml-auto mr-auto">
        <thead>
          <tr className="border border-black">
            {labels.map((item, index) => (
              <th className="border border-black p-2 text-left" key={index + 1}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-black">
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={labels.length} className="p-2">
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  </td>
                </tr>
              ))}
            </>
          )}
          {MyOrders?.data?.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2">{item.orderNo}</td>
              <td className="border border-black p-2">
                {item.restaurant.name}
              </td>
              <td className="border border-black p-2">
                {item.items.map((food) => food.foodItem.title).join(", ")}{" "}
              </td>
              <td className="border border-black p-2">{Number(item.Amount)}</td>
              <td className="border border-black p-2">
                {new Date(item.OrderedTime).toLocaleString()}
              </td>
              <td className="border border-black p-2">
                <div>
                  <button className="bg-orange-600 p-2 text-white rounded-md cursor-pointer">
                    Help
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full p-5 justify-center gap-1">
        <button
          disabled={MyOrders?.hasMore}
          className={`bg-blue-700 w-20 hover:bg-blue-600 p-2 text-white rounded-md cursor-pointer md:mr-5 ml-auto ${!MyOrders?.hasMore ? "bg-gray-700 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Previous
        </button>
        <button
          disabled={MyOrders?.hasMore}
          className={`bg-blue-700 w-20  p-2 text-white rounded-md cursor-pointer mr-5 ${!MyOrders?.hasMore ? "bg-gray-700 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
      {isError && (
        <div className="w-full flex justify-center items-center mt-5">
          <div className="w-90 rounded-md ml h-90 md:w-150 md:h-150">
            <ErrorComponent whiteBg={true} label={"An error occured"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
