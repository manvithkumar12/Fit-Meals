"use server";
import { prisma } from "@/src/lib/prisma";

export const getRestaurantId = async (userId: number) => {
  return await prisma.restaurant.findUnique({
    where: { ownerId: userId },
    select: { id: true },
  });
};
