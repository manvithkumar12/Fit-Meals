"use server";

import { prisma } from "@/src/lib/prisma";

export const getFoodItemsDetails = async ({
  id,
  restaurantId,
}: {
  id: number;
  restaurantId: number;
}) => {
  try {
    const data = await prisma.foodItem.findFirst({
      where: {
        id,
        restaurantId,
      },
      include: {
        Ingredients: true,
      },
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Food item fetch error:", error);

    return null;
  }
};
