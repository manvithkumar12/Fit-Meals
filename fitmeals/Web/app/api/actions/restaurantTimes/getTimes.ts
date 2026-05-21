import { prisma } from "@/src/lib/prisma";

export const getRestaurantTimes = async (restaurnatId: number) => {
  try {
    const data = await prisma.restaurant.findUnique({
      where: { id: restaurnatId },
      select: {
        reservationTime: true,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
