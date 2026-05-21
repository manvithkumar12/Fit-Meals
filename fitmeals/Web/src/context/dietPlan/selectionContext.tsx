"use client";

import { useDietItems } from "@/src/query/useDietItems";
import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { DietContext } from "./dietPlanContext";
export type dietFoodRes = {
  foodItemId: number;
  foodType: string;
  quantity: number;
  protein: number;
  carbos: number;
  calories: number;
  fats: number;
  foodItem: { foodname: string | null };
}[];
type SelectionContextType = {
  addedItems: Record<string, boolean>;
  setAddedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  dietItems: dietFoodRes;
  setDietItems: React.Dispatch<React.SetStateAction<dietFoodRes>>;
  loading: boolean;
};

export const SelectionContext = createContext<SelectionContextType | null>(
  null,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const context = useContext(DietContext);
  const profileId = context?.userdietid;
  const [dietItems, setDietItems] = useState<dietFoodRes>([]);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { data, isLoading } = useDietItems(profileId);

  useEffect(() => {
    if (!data) return;
    setDietItems(data);
    const itemsMap: Record<string, boolean> = {};
    data.forEach((item: any) => {
      const key = `${item.foodItemId}-${item.foodType}`;
      itemsMap[key] = true;
    });
    setAddedItems(itemsMap);
  }, [data]);

  const value = useMemo(
    () => ({
      addedItems,
      setAddedItems,
      dietItems,
      setDietItems,
      loading: isLoading,
    }),
    [addedItems, dietItems, isLoading],
  );
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};
