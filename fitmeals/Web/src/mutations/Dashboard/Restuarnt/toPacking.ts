import { OrdersResponseType } from "@/app/api/actions/Dashboard/Restaurant/Restaurant";
import { moveToPacking } from "@/app/api/actions/Dashboard/Restaurant/toPacking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useStartPacking = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderNo: number) => moveToPacking(orderNo),

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
          const movedOrder = old.inProgressOrders.find(
            (item) => item.orderNo === orderNo,
          );
          if (!movedOrder) return old;
          return {
            ...old,
            inProgressOrders: old.inProgressOrders.filter(
              (item) => item.orderNo !== orderNo,
            ),
            preparedOrders: [...(old.preparedOrders || []), movedOrder],
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
