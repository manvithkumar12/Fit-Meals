"use server";
import { prisma } from "@/src/lib/prisma";

export const deliveringOrders = async (restaurantId: number) => {
  try {
    const data = await prisma.orderInfo.findMany({
      where: {
        restaurantId: restaurantId,
        status: "APPROVED",
        OrderStatus: "InDelivery",
      },
      select: {
        orderNo: true,
        OrderType: true,
        deliveryPartner: {
          select: { user: { select: { name: true, phoneNumber: true } } },
        },
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
