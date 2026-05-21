import { prisma } from "@/src/lib/prisma";

export const makeOrderCompleted = async (orderNo: number, userId: number) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.orderInfo.findUnique({
      where: {
        orderNo,
      },
      select: {
        deliveryAddress: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await tx.orderInfo.update({
      where: {
        orderNo,
      },
      data: {
        OrderStatus: "Delivered",
        DeliveredTime: new Date(),
      },
    });

    await tx.deliveryPartner.update({
      where: {
        UserId: userId,
      },
      data: {
        partnerstatus: "IDLE",
        lat: order.deliveryAddress?.lat!,
        long: order.deliveryAddress?.long!,
        deliveredOrders: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
    };
  });
};
