import {
  addLoggedFood,
  LoggedDataType,
} from "@/app/api/actions/Tracker/ChangeLoggedFood";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLoggedFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      targetId,
      userId,
    }: {
      data: LoggedDataType;
      targetId: number;
      userId: number;
    }) => addLoggedFood(data, targetId, userId),

    onMutate: async (variables) => {
      const { data, targetId, userId } = variables;

      await queryClient.cancelQueries({
        queryKey: ["loggedFood", targetId],
      });

      await queryClient.cancelQueries({
        queryKey: ["targetData", userId],
      });

      const previousLogged = queryClient.getQueryData([
        "loggedFood",
        targetId,
      ]);

      const previousTarget = queryClient.getQueryData([
        "targetData",
        userId,
      ]);

      // 🔥 1. Optimistically update loggedFood
      queryClient.setQueryData(["loggedFood", targetId], (old: any[]) => [
        ...(old || []),
        {
          id: Date.now(), // temp id
          loggedCalories: data.calories,
          loggedProtein: data.protein,
          loggedCarbos: data.carbs,
          loggedFat: data.fat,
          fooditem: {
            foodname: "Adding...",
            bls_code: "",
          },
        },
      ]);

      // 🔥 2. Optimistically update targetData totals
      queryClient.setQueryData(["targetData", userId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          totalCalories: old.totalCalories + data.calories,
          totalProtein: old.totalProtein + data.protein,
          totalCarbs: old.totalCarbs + data.carbs,
          totalFat: old.totalFat + data.fat,
        };
      });

      return { previousLogged, previousTarget };
    },

    onError: (error, variables, context) => {
      console.error(error);

      if (context?.previousLogged) {
        queryClient.setQueryData(
          ["loggedFood", variables.targetId],
          context.previousLogged
        );
      }

      if (context?.previousTarget) {
        queryClient.setQueryData(
          ["targetData", variables.userId],
          context.previousTarget
        );
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["loggedFood", variables.targetId],
      });

      queryClient.invalidateQueries({
        queryKey: ["targetData", variables.userId],
      });
    },
  });
};