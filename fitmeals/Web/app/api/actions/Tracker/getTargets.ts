"use server";

import { prisma } from "@/src/lib/prisma";
import { targetDataType } from "@/src/types/Trackers/TargetData.types";
import { cache } from "react";
type sumData = {
  loggedCalories: number;
  loggedCarbos: number;
  loggedFat: number;
  loggedProtein: number;
};
export const getTargets = cache(
  async (userId: number): Promise<targetDataType | null> => {
    const data = await prisma.targetData.findUnique({
      where: { userId },
      select: {
        id: true,
        dailyCalories: true,
        dailyprotein: true,
        dailycarb: true,
        dailyfat: true,
      },
    });
    if (!data) return null;
    return {
      id: data.id,
      calories: data.dailyCalories,
      protein: data.dailyprotein,
      carbs: data.dailycarb,
      fats: data.dailyfat,
    };
  },
);

export const getTargetAndLoggedData = async (userId: number) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [targets, aggregateResult] = await Promise.all([
    getTargets(userId),
    prisma.loggedData.aggregate({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        loggedCalories: true,
        loggedCarbos: true,
        loggedFat: true,
        loggedProtein: true,
      },
    }),
  ]);

  const loggedData: sumData | null =
    aggregateResult._sum.loggedCalories === null
      ? null
      : {
          loggedCalories: aggregateResult._sum.loggedCalories ?? 0,
          loggedCarbos: aggregateResult._sum.loggedCarbos ?? 0,
          loggedFat: aggregateResult._sum.loggedFat ?? 0,
          loggedProtein: aggregateResult._sum.loggedProtein ?? 0,
        };

  return { targets, loggedData };
};
