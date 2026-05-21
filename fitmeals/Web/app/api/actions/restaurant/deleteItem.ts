"use server";
import { prisma } from "@/src/lib/prisma";

export const deleteFoodItem = async (foodItemId: number) => {
  try {
    await prisma.foodItem.delete({
      where: { id: foodItemId },
    });
    return {
      success: true,
      message: "Food item deleted successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to delete food item",
    };
  }
};
