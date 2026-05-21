import { moveToCooking } from "@/app/api/actions/Dashboard/Restaurant/toCooking";
import { OrdersResponseType } from "@/app/api/actions/Dashboard/Restaurant/Restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useStartCooking = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderNo: number) => moveToCooking(orderNo),

    onMutate: async (orderNo) => {
      await queryClient.cancelQueries({
        queryKey: ["NewOrders", restaurantId],
      });

      const previousData = queryClient.getQueryData<OrdersResponseType>([
        "NewOrders",
        restaurantId,
      ]);

      queryClient.setQueryData<OrdersResponseType>(
        ["NewOrders", restaurantId],
        (old) => {
          if (!old) return old;

          const movedOrder = old.newOrders.find(
            (item) => item.orderNo === orderNo,
          );

          if (!movedOrder) return old;

          return {
            ...old,

            newOrders: old.newOrders.filter((item) => item.orderNo !== orderNo),

            inProgressOrders: [...(old.inProgressOrders || []), movedOrder],
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _orderNo, context) => {
      toast.error("An error occurred");

      queryClient.setQueryData(
        ["NewOrders", restaurantId],
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["NewOrders", restaurantId],
      });
    },
  });
};
