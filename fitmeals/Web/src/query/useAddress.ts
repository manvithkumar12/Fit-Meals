import { getAddress } from "@/app/api/actions/address/address";
import { useQuery } from "@tanstack/react-query";

export const useAddress = (userId: number | null) => {
  return useQuery({
    queryKey: ["address", userId],
    queryFn: async () => {
      if (userId === null) return [];

      return await getAddress(userId);
    },
    enabled: userId !== null,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
