import { getTotal } from "@/app/api/actions/cart/TotalPrice";
import { useQuery } from "@tanstack/react-query";

export const usePriceData = (userId: number | null) => {
  return useQuery({
    queryKey: ["cart-price", userId],
    queryFn: () => {
      if (userId === null) return null;
      return getTotal(userId);
    },
    enabled: userId !== null,
  });
};
