import {
  UpdateFoodItem,
  UpdateProps,
} from "@/app/api/actions/restaurant/UpdateFoodItem";

import { FoodItem } from "@/src/Apiservices/api/restaurant/getFoodItems";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFoodItem = (
  restaurantID: number,
  setEditingItem: React.Dispatch<React.SetStateAction<FoodItem | null>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: UpdateProps) => {
      return await UpdateFoodItem(updatedData);
    },

    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({
        queryKey: ["foodItems", restaurantID],
      });

      const previousData = queryClient.getQueryData([
        "foodItems",
        restaurantID,
      ]);

      queryClient.setQueryData(["foodItems", restaurantID], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          message: old.message.map((item: FoodItem) =>
            item.id === updatedData.data.id
              ? {
                  ...item,
                  title: updatedData.data.name,
                  price: updatedData.data.price,
                  time: updatedData.data.prepTime,
                  proteinPer100gm: updatedData.data.Protein,
                  carboHydratePer100gm: updatedData.data.Carbs,
                  fatsPer100gm: updatedData.data.Fats,
                  caloriesPer100gm: updatedData.data.Calories,
                }
              : item,
          ),
        };
      });

      setEditingItem(null);

      return { previousData };
    },

    onError: (error, variables, context) => {
      console.log(error);

      queryClient.setQueryData(
        ["foodItems", restaurantID],
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["foodItems", restaurantID],
      });
    },
  });
};
