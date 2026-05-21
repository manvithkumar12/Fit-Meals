"use client";
import { getDietFoodItems } from "@/app/api/actions/getDiet/getFoodItems";
import { useQuery } from "@tanstack/react-query";

export const useDietItems = (profileId: number | undefined) => {
  return useQuery({
    queryKey: ["dietItems", profileId],
    queryFn: () => {
      if (!profileId) return [];
      return getDietFoodItems(profileId);
    },
    enabled: !!profileId,
  });
};
