import { getPastOrders } from "@/app/api/actions/orders/pastOrders";
import { toast } from "react-toastify";

export const getOrderspast = async (userId: number, pageNo: number) => {
  const res = await getPastOrders(userId, pageNo);
  if (!res) {
    toast.error("unable to fetch data");
  }
  return res;
};
