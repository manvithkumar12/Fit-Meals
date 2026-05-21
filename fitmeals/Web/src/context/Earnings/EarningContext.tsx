"use client";

import { createContext, useMemo } from "react";
import { useEarnings } from "@/src/query/Earnings/useEarnings";
import { EarningsDataType } from "@/app/api/actions/Earnings/Earnings";
import { useRestaurantID } from "../RestaurantId/RestaurantId";

type EarningContextType = {
  EarningsData: EarningsDataType | undefined;
  isPending: boolean;
  isError: boolean;
};

export const EarningContext = createContext<EarningContextType | null>(null);

export const EarningProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const restaurantId = useRestaurantID();

  const { data: EarningsData, isPending, isError } = useEarnings(restaurantId ?? 0);

  const contextValue = useMemo(
    () => ({
      EarningsData,
      isPending,
      isError,
    }),
    [EarningsData, isPending, isError],
  );

  return (
    <EarningContext.Provider value={contextValue}>
      {children}
    </EarningContext.Provider>
  );
};
