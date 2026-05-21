"use server";

import { prisma } from "@/src/lib/prisma";

type UserMacros = {
  dailyCalories: number;
  dailycarb: number;
  dailyfat: number;
  dailyprotein: number;
  days: number;
  id: number;
  date: Date | null;
} | null;

export const getUserMacros = async (userId: number): Promise<UserMacros> => {
  try {
    const macros = await prisma.userDietProfile.findUnique({
      where: { userId },
      select: {
        dailyCalories: true,
        dailycarb: true,
        dailyfat: true,
        dailyprotein: true,
        days: true,
        id: true,
        date: true,
      },
    });

    if (!macros) {
      console.warn("No macros found for user:", userId);
    }

    return macros;
  } catch (error) {
    console.error("Error fetching user macros:", error);
    return null;
  }
};
