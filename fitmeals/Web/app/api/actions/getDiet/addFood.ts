"use server";

import { prisma } from "@/src/lib/prisma";
export type FoodType = "Breakfast" | "Lunch" | "Dinner";
export type FoodItemProps = {
  bls_code: string;
  carbohydrate: number;
  energy: number;
  fat: number;
  foodname: string;
  id: number;
  protein: number;
  salt: number;
};
export const addFoodtoDiet = async (
  profileId: number,
  item: FoodItemProps,
  foodType: FoodType,
) => {
  try {
    await prisma.dietFoodItem.create({
      data: {
        userProfileId: profileId,
        foodItemId: item.id,
        foodType: foodType,
        calories: item.energy,
        carbos: item.carbohydrate,
        fats: item.fat,
        protein: item.protein,
        quantity: 100,
      },
    });
  } catch (error: any) {
    console.log(error);

    // Prisma unique constraint error
    if (error.code === "P2002") {
      throw new Error("Food item already added");
    }

    throw new Error("Failed to add food item");
  }
};
