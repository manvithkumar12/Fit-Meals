"use server";

import { prisma } from "@/src/lib/prisma";

export const getUserDiet = async (userId: number) => {
  try {
    const data = await prisma.userData.findUnique({
      where: { userId },
    });

    if (!data) {
      return {
        gender: "male",
        weight: 0,
        height: 0,
        age: 0,
        target_weight: 0,
        activity: "low",
        goal: "weight loss",
      };
    }

    return {
      gender: data.gender,
      weight: data.weight,
      height: data.height,
      age: data.age,
      target_weight: data.targetWeight,
      activity: data.ActivityLevel,
      goal: data.Goal,
    };
  } catch {
    return {
      gender: "male",
      weight: 0,
      height: 0,
      age: 0,
      target_weight: 0,
      activity: "low",
      goal: "weight loss",
    };
  }
};
