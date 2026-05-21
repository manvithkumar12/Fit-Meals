"use server";
import { prisma } from "@/src/lib/prisma";

export const getCartCoords = async (userId: number | undefined) => {
  const coords = await prisma.cart.findUnique({
    where: { userId },
    select: {
      address: { select: { lat: true, long: true } },
      restaurants: { select: { lat: true, long: true } },
    },
  });
  return coords;
};
