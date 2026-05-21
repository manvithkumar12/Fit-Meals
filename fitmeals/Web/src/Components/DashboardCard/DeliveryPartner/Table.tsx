import { PartnerOrdersType } from "@/src/types/Dashboard/DeliveryPartner";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import ErrorComponent from "../../errorComponent/ErrorComponent";
import { useTranslations } from "next-intl";
import { makeOrderCompleted } from "@/app/api/actions/Dashboard/DeliveryAgent/makeOrderCompleted";
import { useUser } from "@/src/context/UserContext";

type TableProps = {
  Type: "MyOrders";
  labels: string[];
  isLoading: boolean;
  isError: boolean;
  Data?: PartnerOrdersType;
};
const Table = ({ labels, Data, Type, isLoading, isError }: TableProps) => {
  const Labels = labels;
  const userId = useUser()?.id!;
  const t = useTranslations("DeliveryPartner");
  if (isLoading) {
    return (
      <div className="w-full h-full lg:h-max overflow-scroll-x pb-10 flex-col">
        <div className="w-[95%] ml-auto mr-auto overflow-x-scroll p-2">
          <table className="w-full  mr-auto ml-auto">
            <thead>
              <tr>
                {Labels?.map((items, index) => (
                  <th
                    className="border border-black/60 p-2 text-left"
                    key={index + items}
                  >
                    {items}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border border-black">
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index + 1}>
                  <td colSpan={labels.length} className="p-2">
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full lg:h-max overflow-scroll-x pb-10 flex-col">
        <div className="w-[95%] ml-auto mr-auto overflow-x-scroll p-2">
          <table className="w-full  mr-auto ml-auto">
            <thead>
              <tr>
                {Labels?.map((items, index) => (
                  <th
                    className="border border-black/60 p-2 text-left"
                    key={index + items}
                  >
                    {items}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <div className="w-90 rounded-md ml-auto mr-auto h-90 md:w-150 md:h-150">
            <ErrorComponent whiteBg={true} label={"An error occured"} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full lg:h-max overflow-scroll-x pb-10 flex-col">
      <div className="w-[95%] ml-auto mr-auto overflow-x-scroll p-2">
        <table className="w-full  mr-auto ml-auto">
          <thead>
            <tr>
              {Labels?.map((items, index) => (
                <th
                  className="border border-black/60 p-2 text-left"
                  key={index + items}
                >
                  {items}
                </th>
              ))}
            </tr>
          </thead>
          {Data?.length === 0 && !isLoading && !isError && (
            <tbody>
              <tr>
                <td
                  colSpan={labels.length}
                  className="border border-black/30 h-90 w-[80%] md:w-[90%] p-2 text-center"
                >
                  <div className="w-90 rounded-md ml-auto mr-auto h-90 md:w-150 md:h-150">
                    <ErrorComponent whiteBg={true} label={"No Orders Yet"} />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {Type === "MyOrders" &&
              Data?.map((item, index) => (
                <tr key={item.orderNo}>
                  <td className="border border-black/30 p-2">{item.orderNo}</td>
                  <td className="border border-black/30 p-2">
                    {item.restaurant.name}
                  </td>
                  <td className="border border-black/30 p-2">
                    {new Date(item.OrderedTime).toLocaleTimeString()}{" "}
                  </td>
                  <td className="border border-black/30 p-2">
                    {item.DeliveredTime
                      ? new Date(item.DeliveredTime).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td className="border border-black/30 p-2">
                    {item.OrderStatus}
                  </td>
                  <td className="border border-black/30 p-2">
                    {(Number(item.Amount) * 0.2).toFixed(2)}
                  </td>
                  <td className="border border-black/30 p-2">
                    {item.OrderStatus === "Delivered" ? (
                      <p className="text-green-500 text-sm">
                        {t("navbar.delivered")}
                      </p>
                    ) : (
                      <button
                        onClick={() => makeOrderCompleted(item.orderNo, userId)}
                        className="bg-green-600 text-sm text-white px-3 py-1 rounded-md"
                      >
                        {t("navbar.mark")}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
