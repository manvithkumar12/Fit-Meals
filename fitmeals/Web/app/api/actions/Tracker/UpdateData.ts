"use server";

import { prisma } from "@/src/lib/prisma";
import { targetDataType } from "@/src/types/Trackers/TargetData.types";

export const UpdateTargets = async (data: targetDataType, userId: number) => {
  await prisma.targetData.upsert({
    where: {
      userId,
    },
    update: {
      dailyCalories: data.calories,
      dailyprotein: data.protein,
      dailycarb: data.carbs,
      dailyfat: data.fats,
    },
    create: {
      dailyCalories: data.calories,
      dailyprotein: data.protein,
      dailycarb: data.carbs,
      dailyfat: data.fats,
      userId,
    },
  });
};
