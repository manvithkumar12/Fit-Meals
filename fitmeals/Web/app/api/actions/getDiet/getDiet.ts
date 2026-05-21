"use server";

import { userDietInput } from "@/src/types/userDiet.types";
import { dietDataPosting, perItemValues } from "./dietApi.utils";
import { prisma } from "@/src/lib/prisma";
import { dietApiProps } from "@/src/types/dietApiProps";

const fix = (val: number) => (val === 0 ? 1 : val);

const randomSample = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getDietPlan = async (
  userId: number,
  Breakfastitems: number,
  dinnerItems: number,
  lunchItems: number,
) => {
  lunchItems = fix(lunchItems);
  Breakfastitems = fix(Breakfastitems);
  dinnerItems = fix(dinnerItems);

  const dietApi = process.env.MODEL_URL!;
  const dietData = await prisma.userData.findUnique({ where: { userId } });

  if (!dietData) return null;

  const formattedDietData = {
    weight: dietData.weight,
    height: dietData.height,
    gender: dietData.gender as "male" | "female" | "N/A",
    age: dietData.age,
    activity: dietData.ActivityLevel as userDietInput["activity"],
    goal: dietData.Goal as userDietInput["goal"],
    target_weight: dietData.targetWeight,
  };
  const todayDate = new Date();
  const dateUpdate = await prisma.userDietProfile.upsert({
    where: { userId },
    update: { date: todayDate },
    create: {
      userId,
      date: todayDate,
      days: 0,
      dailyCalories: 0,
      dailyprotein: 0,
      dailycarb: 0,
      dailyfat: 0,
      userdataId: dietData.id,
    },
    select: {
      id: true,
      date: true,
    },
  });
  const postApi: dietApiProps = await dietDataPosting(
    formattedDietData,
    dietApi,
  );
  const perItem = perItemValues(
    postApi,
    Breakfastitems,
    dinnerItems,
    lunchItems,
  );

  const { Breakfast: breakfast, Lunch: lunch, Dinner: dinner } = perItem;

  const POOL_SIZE = 100;
  const SAMPLE_SIZE = 10;

  const [breakfastPool, lunchPool, dinnerPool] = await Promise.all([
    prisma.german_foods.findMany({
      where: {
        energy: {
          gte: breakfast.calories - 100,
          lte: breakfast.calories + 100,
        },
      },
      take: POOL_SIZE,
    }),
    prisma.german_foods.findMany({
      where: {
        energy: { gte: lunch.calories - 150, lte: lunch.calories + 150 },
      },
      take: POOL_SIZE,
    }),
    prisma.german_foods.findMany({
      where: {
        energy: { gte: dinner.calories - 150, lte: dinner.calories + 150 },
      },
      take: POOL_SIZE,
    }),
  ]);

  const getFallbackPool = () =>
    prisma.german_foods.findMany({ take: POOL_SIZE });

  const finalLunchPool =
    lunchPool.length > 0 ? lunchPool : await getFallbackPool();
  const finalDinnerPool =
    dinnerPool.length > 0 ? dinnerPool : await getFallbackPool();

  return {
    postApi,
    date: dateUpdate,
    data: {
      Breakfast: randomSample(breakfastPool, SAMPLE_SIZE),
      Lunch: randomSample(finalLunchPool, SAMPLE_SIZE),
      Dinner: randomSample(finalDinnerPool, SAMPLE_SIZE),
    },
  };
};
