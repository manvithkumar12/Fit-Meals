"use server";

import { prisma } from "@/src/lib/prisma";
import { allMealsDataType } from "@/src/types/Trackers/TargetData.types";

export const searchAllFoods = async (
  query: string,
): Promise<allMealsDataType> => {
  if (!query.trim()) return [];

  const foods = await prisma.$queryRaw<allMealsDataType>`
    SELECT *
    FROM german_foods
    WHERE similarity(foodname, ${query}) > 0.2
    ORDER BY similarity(foodname, ${query}) DESC
    LIMIT 6;
  `;

  return foods;
};