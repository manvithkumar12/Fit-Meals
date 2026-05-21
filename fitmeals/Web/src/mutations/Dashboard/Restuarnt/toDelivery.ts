"use client";

import { assignRider } from "@/app/api/actions/Dashboard/Restaurant/assignRider";
import { OrdersResponseType } from "@/app/api/actions/Dashboard/Restaurant/Restaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationProps = {
  restaurantId: number;
  orderNo: number;
  riderId: number;
  riderName: string;
  riderPhone: string;
};

type ResponseType = {
  success: boolean;
  message: string;
};

type InDeliveryOrderType = {
  orderNo: number;
  OrderType: string;
  deliveryPartner: {
    user: {
      name: string;
      phoneNumber: string;
    };
  };
};

type NearByRiderType = {
  id: number;
  title: string;
  deliveredOrders: number;
  user: {
    phoneNumber: string;
  };
};

type ContextType = {
  previousData?: OrdersResponseType;
  previousInDelivery: InDeliveryOrderType[];
  previousNearByRiders: NearByRiderType[];
  restaurantId: number;
};

export const useToCooking = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, MutationProps, ContextType>({
    mutationFn: async ({ restaurantId, orderNo, riderId }) => {
      return assignRider(orderNo, riderId, restaurantId);
    },

    onMutate: async ({
      restaurantId,
      orderNo,
      riderId,
      riderName,
      riderPhone,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["NewOrders", restaurantId],
      });

      await queryClient.cancelQueries({
        queryKey: ["InDelivery", restaurantId],
      });

      await queryClient.cancelQueries({
        queryKey: ["near-by-riders", restaurantId],
      });


      const previousData = queryClient.getQueryData<OrdersResponseType>([
        "NewOrders",
        restaurantId,
      ]);

      const previousInDelivery =
        queryClient.getQueryData<InDeliveryOrderType[]>([
          "InDelivery",
          restaurantId,
        ]) || [];

      const previousNearByRiders =
        queryClient.getQueryData<NearByRiderType[]>([
          "near-by-riders",
          restaurantId,
        ]) || [];


      const movedOrder = previousData?.preparedOrders?.find(
        (item) => item.orderNo === orderNo,
      );

      queryClient.setQueryData<OrdersResponseType>(
        ["NewOrders", restaurantId],
        (old) => {
          if (!old) return old;

          return {
            ...old,

            preparedOrders: old.preparedOrders.filter(
              (item) => item.orderNo !== orderNo,
            ),
          };
        },
      );


      if (movedOrder) {
        queryClient.setQueryData<InDeliveryOrderType[]>(
          ["InDelivery", restaurantId],
          (old) => [
            ...(old || []),

            {
              orderNo: movedOrder.orderNo,
              OrderType: movedOrder.OrderType,

              deliveryPartner: {
                user: {
                  name: riderName,
                  phoneNumber: riderPhone,
                },
              },
            },
          ],
        );
      }

      queryClient.setQueryData<NearByRiderType[]>(
        ["near-by-riders", restaurantId],
        (old) => old?.filter((item) => item.id !== riderId) || [],
      );

      return {
        previousData,
        previousInDelivery,
        previousNearByRiders,
        restaurantId,
      };
    },

    onError: (_err, variables, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ["NewOrders", variables.restaurantId],
        context.previousData,
      );

      queryClient.setQueryData(
        ["InDelivery", variables.restaurantId],
        context.previousInDelivery,
      );

      queryClient.setQueryData(
        ["near-by-riders", variables.restaurantId],
        context.previousNearByRiders,
      );
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["NewOrders", variables.restaurantId],
      });

      queryClient.invalidateQueries({
        queryKey: ["InDelivery", variables.restaurantId],
      });

      queryClient.invalidateQueries({
        queryKey: ["near-by-riders", variables.restaurantId],
      });
    },
  });
};
