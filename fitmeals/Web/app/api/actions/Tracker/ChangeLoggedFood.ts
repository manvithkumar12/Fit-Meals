"use server";

import { prisma } from "@/src/lib/prisma";

export type LoggedDataType = {
  itemId: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

export const getLoggedFoods = async (targetId: number) => {
  const foodItem = await prisma.loggedData.findMany({
    where: {
      targetDataId: targetId,
      date: {
        gte: start,
        lte: end,
      },
    },
    select: {
      id: true,
      loggedCarbos: true,
      loggedCalories: true,
      loggedFat: true,
      loggedProtein: true,
      fooditem: {
        select: { foodname: true, bls_code: true },
      },
    },
  });

  return foodItem;
};

export const addLoggedFood = async (
  data: LoggedDataType,
  targetId: number,
  userId: number,
) => {
  await prisma.loggedData.create({
    data: {
      loggedCalories: data.calories,
      loggedProtein: data.protein,
      loggedCarbos: data.carbs,
      loggedFat: data.fat,
      itemId: data.itemId,
      userId: userId,
      targetDataId: targetId,
    },
  });
};

export const updateLoggedFood = async (data: LoggedDataType, id: number) => {
  await prisma.loggedData.update({
    where: { id },
    data: {
      loggedCalories: data.calories,
      loggedProtein: data.protein,
      loggedCarbos: data.carbs,
      loggedFat: data.fat,
      itemId: data.itemId,
    },
  });
};

export const deleteLoggedFood = async (id: number) => {
  await prisma.loggedData.delete({
    where: { id },
  });
};
