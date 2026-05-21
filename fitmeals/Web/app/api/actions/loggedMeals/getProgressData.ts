"use server";

import { prisma } from "@/src/lib/prisma";
export type totalType = {
  totalFats: number;
  totalCarbs: number;
  totalProtein: number;
  totalCalories: number;
};

type response2 = {
  loggedFat: number;
  loggedCarbos: number;
  loggedProtein: number;
  loggedCalories: number;
};

export const getProgressData = async (profileId: number | undefined) => {
  const result: response2[] = await prisma.loggedMeals.findMany({
    where: {
      profileId: profileId,
    },
    select: {
      loggedFat: true,
      loggedCarbos: true,
      loggedProtein: true,
      loggedCalories: true,
    },
  });
  const totalFats = result.reduce((acc, curr) => acc + curr.loggedFat, 0);
  const totalCarbs = result.reduce((acc, curr) => acc + curr.loggedCarbos, 0);
  const totalProtein = result.reduce(
    (acc, curr) => acc + curr.loggedProtein,
    0,
  );
  const totalCalories = result.reduce(
    (acc, curr) => acc + curr.loggedCalories,
    0,
  );
  return { totalFats, totalCarbs, totalProtein, totalCalories };
};
