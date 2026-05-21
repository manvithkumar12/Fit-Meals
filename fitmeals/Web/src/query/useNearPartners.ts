import { availableRiders } from "@/app/api/actions/Dashboard/Restaurant/availableRiders";
import { useQuery } from "@tanstack/react-query";

export const useNearByRiders = (restaurantId: number) => {
  return useQuery({
    queryKey: ["near-by-riders", restaurantId],

    queryFn: async () => {
      return await availableRiders(restaurantId);
    },

    enabled: !!restaurantId,

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
