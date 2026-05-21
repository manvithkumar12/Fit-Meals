"use server";

import prisma from "@/src/config/prismaClient";

export const changeStatus = async (
  NewState: "REST" | "ACTIVE",
  RestaurantID: number,
) => {
  try {
    const current = await prisma.restaurant.findUnique({
      where: { id: RestaurantID },
      select: { status: true },
    });

    if (current && current.status !== NewState) {
      await prisma.restaurant.update({
        where: {
          id: RestaurantID,
        },
        data: {
          status: NewState,
        },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
