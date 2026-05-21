"use server";
import { prisma } from "@/src/lib/prisma";

export const allowReservation = async (
  menuUrls: string[],
  resUrls: string[],
  time: string[],
  restaurantId: number,
) => {
  try {
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        reservation: true,
        menuUrls,
        resUrls,
        reservationTime: time,
      },
    });
  } catch (error) {
    console.error("Reservation Error:", error);
    throw error;
  }
};
