import { getAllOrders } from "@/app/api/actions/Dashboard/Restaurant/CompleteData";
import { useQuery } from "@tanstack/react-query";

export const useAllOrders = (restaurantId: number,pageNo: number,) => {
  return useQuery({
    queryKey: ["restaurant-orders", restaurantId],
    queryFn: () => getAllOrders(restaurantId,pageNo,10),
    enabled: !!restaurantId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
