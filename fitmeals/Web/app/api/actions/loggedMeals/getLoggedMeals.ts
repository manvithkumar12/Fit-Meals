"use server";

import { prisma } from "@/src/lib/prisma";

type response = {
  loggedItems: { foodname: string | null }[];
  loggedQuantity: number;
  date: Date;
  time: string;
  loggedFat: number;
  loggedCarbos: number;
  loggedProtein: number;
  loggedCalories: number;
};

export type totalType = {
  totalFats: number;
  totalCarbs: number;
  totalProtein: number;
  totalCalories: number;
};

export const getLoggedItems = async (profileId: number | undefined) => {
  if (!profileId) return null;

  // START OF DAY
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // END OF DAY
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const result: response[] = await prisma.loggedMeals.findMany({
    where: {
      profileId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },

    select: {
      loggedItems: {
        select: {
          foodname: true,
        },
      },

      loggedQuantity: true,

      date: true,

      time: true,

      loggedFat: true,

      loggedCarbos: true,

      loggedProtein: true,

      loggedCalories: true,
    },
  });

  const totalData: totalType = result.reduce(
    (acc, curr) => {
      acc.totalFats += curr.loggedFat;

      acc.totalCarbs += curr.loggedCarbos;

      acc.totalProtein += curr.loggedProtein;

      acc.totalCalories += curr.loggedCalories;

      return acc;
    },
    {
      totalFats: 0,
      totalCarbs: 0,
      totalProtein: 0,
      totalCalories: 0,
    },
  );

  return {
    result,
    totalData,
  };
};
