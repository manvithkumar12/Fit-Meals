"use client";
import { getTargetAndLoggedData } from "@/app/api/actions/Tracker/getTargets";
import { useQuery } from "@tanstack/react-query";

export const useTargetData = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["targetData", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID missing");
      return getTargetAndLoggedData(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: (previousData) => previousData,

    refetchOnWindowFocus: false,

    refetchOnMount: false,
  });
};
