"use server";

import { prisma } from "@/src/lib/prisma";

export const getAllOrders = async (
  restaurantId: number,
  pageNo: number,
  limit: number,
) => {
  const orders = await prisma.orderInfo.findMany({
    where: { restaurantId, status: "APPROVED" },

    select: {
      orderNo: true,

      items: {
        select: {
          foodItem: {
            select: {
              title: true,
            },
          },
        },
      },
      Amount: true,
      DeliveredTime: true,
      OrderStatus: true,
      deliveryPartner: {
        select: {
          title: true,
          user: {
            select: {
              phoneNumber: true,
            },
          },
        },
      },
    },
    take: limit,
    skip: (pageNo - 1) * limit,
  });
  const totalOrders = await prisma.orderInfo.count({
    where: { restaurantId },
  });
  return {
    orders: orders.map((order) => ({
      orderNo: order.orderNo,

      Items: order.items.map((item) => item.foodItem.title),

      Qty: order.items.length,

      Amount: Number(order.Amount),

      DeliveredTime: order.DeliveredTime?.toISOString() || "N/A",

      Status: order.OrderStatus,

      riderName: order.deliveryPartner?.title || "Not Assigned",
      riderContact: order.deliveryPartner?.user.phoneNumber || "Not Assigned",
    })),
    hasMore: totalOrders > pageNo * limit,
  };
};
