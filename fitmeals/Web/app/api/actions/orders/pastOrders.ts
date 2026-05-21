"use server";

import { prisma } from "@/src/lib/prisma";

export const getPastOrders = async (userId: number, pageNo: number) => {
  let limit = 5;
  try {
    const orders = await prisma.orderInfo.findMany({
      where: { customerId: userId },
      orderBy: { orderNo: "desc" },
      skip: (pageNo - 1) * limit,
      take: limit + 1,
      select: {
        orderNo: true,
        customer: { select: { name: true, email: true } },
        restaurant: {
          select: { name: true, area: true, images: true, address: true },
        },
        deliveryPartner: { select: { title: true } },
        OrderStatus: true,
        DeliveredTime: true,
        items: {
          select: { foodItem: { select: { title: true } }, quantity: true },
        },
        modeOfPayment: true,
        Amount: true,
      },
    });

    const hasMore = orders.length > limit;

    const formattedOrders = orders.slice(0, limit).map((item: any) => ({
      ...item,
      Amount: Number(item.Amount),
      DeliveredTime: item.DeliveredTime
        ? item.DeliveredTime.toISOString()
        : null,
    }));

    return {
      data: formattedOrders,
      hasMore,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch past orders");
  }
};
