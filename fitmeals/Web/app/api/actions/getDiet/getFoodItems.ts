"use server";

import { prisma } from "@/src/lib/prisma";

export const getDietFoodItems = async (profileId: number) => {
  const items = await prisma.dietFoodItem.findMany({
    where: { userProfileId: profileId },
    select: {
      foodItemId: true,
      foodType: true,
      quantity: true,
      protein: true,
      carbos: true,
      calories: true,
      fats: true,
      foodItem: { select: { foodname: true } },
    },
  });
  return items;
};
