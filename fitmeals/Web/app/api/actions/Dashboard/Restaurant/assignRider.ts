"use server";

import { prisma } from "@/src/lib/prisma";

export const assignRider = async (
  orderNo: number,
  riderId: number,
  restaurantId: number,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const riderUpdated = await tx.deliveryPartner.updateMany({
        where: {
          id: riderId,
          partnerstatus: "IDLE",
        },

        data: {
          partnerstatus: "ON_ORDER",
          TotalOrders: { increment: 1 },
        },
      });

      if (riderUpdated.count === 0) {
        throw new Error("Rider is already on another order");
      }
      await tx.orderInfo.update({
        where: {
          orderNo,
          restaurantId,
        },

        data: {
          DeliveryPartnerId: riderId,
          OrderStatus: "InDelivery",
        },
      });

      return {
        success: true,
        message: "Rider assigned successfully",
      };
    });

    return result;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to assign rider",
    };
  }
};
