import { getCartCoords } from "@/app/api/actions/address/getCardcoords";
import { useQuery } from "@tanstack/react-query";

export const useCartCoords = (userId: number | null) => {
  return useQuery({
    queryFn: () => {
      if (userId === null) return null;
      return getCartCoords(userId);
    },
    queryKey: ["cart-coords", userId],
    enabled: userId !== null,
  });
};
