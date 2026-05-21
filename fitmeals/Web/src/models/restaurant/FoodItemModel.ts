import { foodItemDB } from "@/src/types/modelTypes/restaurant/foodItem.types";
import { prisma } from "@/src/lib/prisma";

export const addFood = async (foodItem: foodItemDB) => {
  return await prisma.foodItem.create({
    data: {
      title: foodItem.title,
      price: foodItem.price,
      type: foodItem.type,
      weight: foodItem.weight,
      time: foodItem.time,
      foodBenefits: foodItem.foodBenefits,
      description: foodItem.description,
      category: foodItem.category,
      proteinPer100gm: foodItem.proteinPer100gm,
      salt: foodItem.salt,
      carboHydratePer100gm: foodItem.carboHydratePer100gm,
      caloriesPer100gm: foodItem.caloriesPer100gm,
      fatsPer100gm: foodItem.fatsPer100gm,
      isAvailable: foodItem.isAvailable,
      restaurantId: foodItem.restaurantId,
      imgUrl: foodItem.imgUrl,
      Ingredients: {
        create: foodItem.ingredients.map((ing) => ({
          title: ing.title,
          quantity: ing.quantity,
          imgUrl: ing.imgUrl ?? "",
        })),
      },
    },
  });
};

export const getFoodItems = async (RestaurantId: number) => {
  const foodItems = await prisma.foodItem.findMany({
    where: { restaurantId: RestaurantId, isAvailable: true },
    orderBy: { id: "desc" },
  });
  return foodItems;
};

export const sendFoodItem = async (RestaurantId: number, itemId: number) => {
  const singlefoodItem = await prisma.foodItem.findFirst({
    where: { id: itemId, restaurantId: RestaurantId },
  });
  return singlefoodItem;
};
