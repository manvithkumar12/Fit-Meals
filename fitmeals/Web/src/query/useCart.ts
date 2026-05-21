import { useQuery } from "@tanstack/react-query";
import { findCartItems } from "../models/user/cartItemModel";

export const useCartItems = (userID: number |null) => {
  return useQuery({
    queryFn: async () => {
      if (userID === null) return [];
      return await findCartItems(userID);
    },
    queryKey: ["cartItems", userID],
    enabled: userID !== null,
  });
};