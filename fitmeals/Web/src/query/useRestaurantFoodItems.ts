import { fetchFoodItems } from "../Apiservices/api/restaurant/getFoodItems";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantFoodItems = (RestaurantId: number) => {
  return useQuery({
    queryKey: ["foodItems", RestaurantId],
    queryFn: async () => {
      return await fetchFoodItems(RestaurantId);
    },
    enabled: RestaurantId > 0,
    refetchOnWindowFocus: false,
  });
};
