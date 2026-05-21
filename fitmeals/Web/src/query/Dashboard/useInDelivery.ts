import { deliveringOrders } from "@/app/api/actions/Dashboard/Restaurant/deliveringOrders";
import { useQuery } from "@tanstack/react-query";

export const useInDelivery = (restaurantId: number) => {
  return useQuery({
    queryKey: ["InDelivery", restaurantId],
    queryFn: () => deliveringOrders(restaurantId),
    enabled: !!restaurantId,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
    // staleTime: 4000,
  });
};
