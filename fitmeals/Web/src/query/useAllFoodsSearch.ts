import { searchAllFoods } from "@/app/api/actions/Tracker/Search";
import { useQuery } from "@tanstack/react-query";
import { allMealsDataType } from "../types/Trackers/TargetData.types";

export const useAllFoodSearch = (query: string) => {
  return useQuery<allMealsDataType, Error>({
    queryKey: ["foodSearch", query],

    queryFn: () => searchAllFoods(query),

    enabled: !!query.trim(),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,
  });
};
