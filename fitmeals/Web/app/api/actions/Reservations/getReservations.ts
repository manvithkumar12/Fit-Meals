"use server";

import { prisma } from "@/src/lib/prisma";

export const getReservationsById = async (userId: number, pageNo: number) => {
  try {
    let limit = 10;
    const data = await prisma.reservations.findMany({
      where: { userId },
      skip: (pageNo - 1) * limit,
      orderBy: { id: "desc" },
      take: limit + 1,
      select: {
        id: true,
        users: { select: { name: true, email: true } },
        restaurant: {
          select: {
            name: true,
            address: true,
            mapLink: true,
            images: true,
            cuisineType: true,
            phoneNumber: true,
            area: true,
          },
        },
        reservationTime: true,
        numberOfPeople: true,
        reservationDate: true,
        status: true,
      },
    });
    const hasMore = data.length > limit;
    const formattedData = hasMore ? data.slice(0, limit) : data;
    return {
      data: formattedData,
      hasMore: hasMore,
    };
  } catch {
    throw new Error("An error occured");
  }
};
