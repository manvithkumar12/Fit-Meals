"use server";

import { prisma } from "@/src/lib/prisma";
export type logItemType = {
  loggedProtein: number;
  loggedCalories: number;
  loggedCarbos: number;
  loggedFat: number;
  loggedQuantity: number;
  itemId: number;
  time: "BREAKFAST" | "LUNCH" | "DINNER";
};
export const logMeal = async (profileId: number, Data: logItemType) => {
  await prisma.loggedMeals.create({
    data: {
      profileId: profileId,
      loggedItems: {
        connect: [{ id: Data.itemId }],
      },
      loggedCalories: Data.loggedCalories,
      loggedCarbos: Data.loggedCarbos,
      loggedProtein: Data.loggedProtein,
      loggedQuantity: Data.loggedQuantity,
      loggedFat: Data.loggedFat,
      time: Data.time,
    },
  });
};
