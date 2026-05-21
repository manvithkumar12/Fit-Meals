"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";

import { OrdersResponseType } from "@/app/api/actions/Dashboard/Restaurant/Restaurant";
import { getRestaurantId } from "@/app/api/actions/restaurant/getRestaurantId";
import { useNewOrders } from "@/src/query/Dashboard/useNewOrders";
import { useUser } from "../UserContext";

type RestaurantContextType = {
  restaurantData: OrdersResponseType | undefined;
  id: number;
  loading: boolean;
};

export const RestaurantContext = createContext<RestaurantContextType | null>(
  null,
);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();

  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      if (!user?.id) {
        setRestaurantLoading(false);
        return;
      }

      try {
        const id = await getRestaurantId(user.id);
        setRestaurantId(id?.id!);
      } catch (error) {
        console.error("Failed to fetch restaurant ID:", error);
      } finally {
        setRestaurantLoading(false);
      }
    };

    fetchRestaurantId();
  }, [user?.id]);

  const { data, isLoading } = useNewOrders(restaurantId ?? 0);

  const loading = restaurantLoading || isLoading;

  if (!user || restaurantLoading || restaurantId === null) {
    return null; // or loading spinner
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurantData: data,
        id: restaurantId,
        loading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
