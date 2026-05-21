import { getEarningsData } from "@/app/api/actions/Earnings/Earnings";
import { useQuery } from "@tanstack/react-query";

export const useEarnings = (restaurantId: number) => {
  return useQuery({
    queryFn: () => getEarningsData(restaurantId),
    queryKey: ["WeekEarnings", restaurantId],
    enabled: !!restaurantId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
