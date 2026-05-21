"use server";
import { prisma } from "@/src/lib/prisma";

export const getAllFood = async (page: number = 1, limit: number = 6) => {
  const foodData = await prisma.german_foods.findMany({
    skip: (page - 1) * limit,
    take: limit + 1,
  });

  const hasMore = foodData.length > limit;

  return {
    foodData: hasMore ? foodData.slice(0, limit) : foodData,
    hasMore,
  };
};
