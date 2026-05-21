import { getAllOrders } from "@/app/api/actions/Dashboard/Customer/getOrders";
import { useQuery } from "@tanstack/react-query";

export const useALlOrders = (userId: number | null, page: number) => {
  return useQuery({
    queryKey: ["allOrders", userId, page],
    queryFn: async () => {
      if (userId === null) {
        return {
          data: [],
          hasMore: false,
          totalOrders: 0,
        };
      }

      return await getAllOrders(userId, page);
    },
    enabled: userId !== null,
  });
};
