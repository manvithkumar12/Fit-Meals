import { deleteFoodItem } from "@/app/api/actions/restaurant/deleteItem";
import { FoodItem } from "@/src/Apiservices/api/restaurant/getFoodItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFoodItem = (restaurantID: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteFoodItem(id);
    },

    onMutate: async (id) => {
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
          message: old.message.filter((item: FoodItem) => item.id !== id),
        };
      });

      return { previousData };
    },

    onError: (_err, _id, context) => {
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
