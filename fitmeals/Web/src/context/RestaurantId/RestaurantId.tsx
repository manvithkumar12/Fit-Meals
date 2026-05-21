"use client";

import { getRestaurantId } from "@/app/api/actions/restaurant/getRestaurantId";
import { createContext, useContext } from "react";
import { useUser } from "../UserContext";
import { useQuery } from "@tanstack/react-query";

export const RestaurantIDContext = createContext<number | null>(null);

export const RestaurantIDProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userId = useUser()?.id;

  const { data } = useQuery({
    queryKey: ["restaurant-id", userId],
    queryFn: async () => {
      if (!userId) return null;

      const res = await getRestaurantId(userId);

      return res?.id ?? null;
    },
    enabled: !!userId,
  });

  return (
    <RestaurantIDContext.Provider value={data ?? null}>
      {children}
    </RestaurantIDContext.Provider>
  );
};

export const useRestaurantID = () => {
  return useContext(RestaurantIDContext);
};
