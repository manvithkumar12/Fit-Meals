"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export type RestaurantById =
  Prisma.RestaurantGetPayload<{
    select: {
      id: true;
      openingTime: true;
      closingTime: true;
      reservation: true;
    };
  }>;

export const getRestaurantById = async (
  id: number
): Promise<RestaurantById | null> => {
  try {
    return await prisma.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        openingTime: true,
        closingTime: true,
        reservation: true,
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
