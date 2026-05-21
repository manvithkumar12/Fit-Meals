"use server";
import { prisma } from "@/src/lib/prisma";
import { userDietInput } from "@/src/types/userDiet.types";
import { dietDataPosting } from "./dietApi.utils";
import { dietApiProps } from "@/src/types/dietApiProps";

export const createDietProfile = async (
  userData: userDietInput,
  userId: number,
) => {
  try {
    const filteredData: any = {};
    const dietApi = process.env.MODEL_URL!;

    if (userData.height !== 0) filteredData.height = userData.height;
    if (userData.weight !== 0) filteredData.weight = userData.weight;
    if (userData.age !== 0) filteredData.age = userData.age;
    if (userData.target_weight !== 0)
      filteredData.targetWeight = userData.target_weight;

    if (userData.gender !== "N/A") filteredData.gender = userData.gender;
    if (userData.goal !== "N/A") filteredData.Goal = userData.goal;
    if (userData.activity !== "N/A")
      filteredData.ActivityLevel = userData.activity;

    const userProfile = await prisma.userData.upsert({
      where: {
        userId: userId,
      },
      update: filteredData,
      create: {
        userId,
        height: filteredData.height ?? 0,
        weight: filteredData.weight ?? 0,
        age: filteredData.age ?? 0,
        targetWeight: filteredData.targetWeight ?? 0,
        gender: filteredData.gender ?? "male",
        Goal: filteredData.Goal ?? "weight loss",
        ActivityLevel: filteredData.ActivityLevel ?? "low",
      },
    });

    const data = await prisma.userData.findUnique({ where: { userId } });
    if (!data) throw new Error("An error occured unable to find user data");
    const formattedData: userDietInput = {
      height: data.height,
      weight: data.weight,
      age: data.age,
      target_weight: data.targetWeight,
      gender: data.gender as "male" | "female",
      goal: data.Goal as "weight loss" | "muscle gain" | "weight gain",
      activity: data.ActivityLevel as "low" | "high" | "moderate",
    };
    const postApi: dietApiProps = await dietDataPosting(formattedData, dietApi);
    if (!postApi) throw new Error("An error occured");
    const createProfile = await prisma.userDietProfile.upsert({
      where: { userId },
      update: {
        dailyCalories: postApi.calories,
        dailyprotein: postApi.protein,
        dailycarb: postApi.carbs,
        dailyfat: postApi.fats,
        days: postApi.days,
      },
      create: {
        userId,
        userdataId: userProfile.id,
        dailyCalories: postApi.calories,
        dailyprotein: postApi.protein,
        dailycarb: postApi.carbs,
        dailyfat: postApi.fats,
        days: postApi.days,
      },
      select: {
        id: true,
      },
    });
    return createProfile.id;
  } catch (error) {
    console.log(error);
  }
};
