"use server";
import { prisma } from "@/src/lib/prisma";
import { FoodType } from "./addFood";

export const removeDietItem = async (
  profileId: number,
  itemId: number,
  foodType: FoodType,
) => {
  try {
    await prisma.dietFoodItem.delete({
      where: {
        userProfileId_foodType_foodItemId: {
          userProfileId: profileId,
          foodType,
          foodItemId: itemId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("An error occured");
  }
};
