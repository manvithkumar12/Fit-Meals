import { getAllFood } from "@/app/api/actions/Tracker/getFoods";
import { useQuery } from "@tanstack/react-query";

export const useAllFood = (page: number = 1, limit: number = 6) => {
  return useQuery({
    queryKey: ["allFood", page, limit],
    queryFn: () => getAllFood(page, limit),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: (prev) => prev,
  });
};
