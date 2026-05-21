"use server";

import { prisma } from "@/src/lib/prisma";

export type OrderTypeData = {
  orderNo: number;
  OrderType: string;
  OrderedTime: string;
  Amount: number;
  OrderStatus: string;
  items: {
    foodItem: { title: string };
    quantity: number;
  }[];
};

export type OrdersResponseType = {
  newOrders: OrderTypeData[];
  inProgressOrders: OrderTypeData[];
  preparedOrders: OrderTypeData[];
  status: string;
};

export const GetNewOrders = async (restaurantId: number) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { status: true },
  });

  const ordersRaw = await prisma.orderInfo.findMany({
    where: {
      restaurantId,
      status: "APPROVED",
    },

    orderBy: {
      OrderedTime: "desc",
    },

    select: {
      orderNo: true,
      OrderType: true,
      OrderedTime: true,
      OrderStatus: true,
      Amount: true,
      items: {
        select: {
          foodItem: {
            select: {
              title: true,
            },
          },

          quantity: true,
        },
      },
    },
  });

  const formattedOrders: OrderTypeData[] = ordersRaw.map((order) => ({
    orderNo: order.orderNo,

    OrderType: order.OrderType,

    OrderedTime: order.OrderedTime.toISOString(),

    OrderStatus: order.OrderStatus,

    Amount: Number(order.Amount),

    items: order.items.map((item) => ({
      foodItem: {
        title: item.foodItem.title,
      },

      quantity: item.quantity,
    })),
  }));

  const data: OrdersResponseType = {
    newOrders: formattedOrders.filter(
      (order) => order.OrderStatus === "Waiting",
    ),
    status: restaurant?.status || "ACTIVE",
    inProgressOrders: formattedOrders.filter(
      (order) => order.OrderStatus === "Cooking",
    ),

    preparedOrders: formattedOrders.filter(
      (order) => order.OrderStatus === "Packing",
    ),
  };
  return data;
};
