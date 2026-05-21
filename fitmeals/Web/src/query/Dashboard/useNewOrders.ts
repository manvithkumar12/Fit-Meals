import { GetNewOrders } from "@/app/api/actions/Dashboard/Restaurant/Restaurant";
import { useQuery } from "@tanstack/react-query";

export const useNewOrders = (restaurantId: number) => {
  return useQuery({
    queryFn: () => GetNewOrders(restaurantId),
    queryKey: ["NewOrders", restaurantId],
    enabled: !!restaurantId,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    staleTime: 4000,
  });
};
