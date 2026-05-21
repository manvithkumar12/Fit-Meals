"use server";
import { prisma } from "@/src/lib/prisma";
export const moveToPacking = async (orderNo: number) => {
  try {
    await prisma.orderInfo.update({
      where: { orderNo },
      data: {
        OrderStatus: "Packing",
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to move order to packing");
  }
};
