"use server";

import { prisma } from "@/src/lib/prisma";

export const moveToCooking = async (orderNo: number) => {
  try {
    await prisma.orderInfo.update({
      where: { orderNo },

      data: {
        OrderStatus: "Cooking",
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Failed to move order to cooking");
  }
};
