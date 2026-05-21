"use server";

import { prisma } from "@/src/lib/prisma";

export interface UpdateProps {
  data: {
    id: number;
    name: string;
    price: number;
    prepTime: number;
    Protein: number;
    Carbs: number;
    Fats: number;
    Calories: number;
  };
}

export const UpdateFoodItem = async ({ data }: UpdateProps) => {
  try {
    await prisma.foodItem.update({
      where: { id: data.id },
      data: {
        title: data.name,
        price: data.price,
        time: data.prepTime,
        proteinPer100gm: data.Protein,
        carboHydratePer100gm: data.Carbs,
        fatsPer100gm: data.Fats,
        caloriesPer100gm: data.Calories,
      },
    });
  } catch (e) {
    return {
      success: false,
      message: "Failed to update food item",
    };
  }
  return {
    success: true,
    message: "Food item updated successfully",
  };
};
