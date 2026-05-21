import { useQuery } from "@tanstack/react-query";
import { getOrderspast } from "../Apiservices/api/pastOrders/getPastOrders";

export const usePastOrders = (userId: number, pageNo: number) => {
  return useQuery({
    queryKey: [userId, pageNo],
    queryFn: () => getOrderspast(userId, pageNo),
    enabled: !!userId && !!pageNo,
  });
};
