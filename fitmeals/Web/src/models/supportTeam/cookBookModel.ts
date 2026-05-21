import { cookBookDB } from "@/src/types/modelTypes/supportTeam/cookbook.types";
import { prisma } from "@/src/lib/prisma";

export const cookBookModel = async (cookbook: cookBookDB) => {
  return await prisma.cookBook.create({
    data: {
      title: cookbook.title,
      calories: cookbook.calories,
      steps: cookbook.steps,
      description: cookbook.description,
      mainurl: cookbook.mainurl,
      imgUrl: cookbook.imgUrl,
      weight: cookbook.weight,
      time: cookbook.time,
      nutritionalValue: cookbook.nutritionalValue,
      proteinPer100gm: cookbook.proteinPer100gm,
      caloriesPer100gm: cookbook.caloriesPer100gm,
      fatsPer100gm: cookbook.fatsPer100gm,
      carboHydratePer100gm: cookbook.carboHydratePer100gm,
      addedBy: cookbook.addedBy,
      foodType: cookbook.foodType,
      FoodIngredients: {
        create: cookbook.ingredients.map((ing) => ({
          title: ing.title,
          quantity: ing.quantity,
          imgUrl: ing.imgUrl,
        })),
      },
    },
  });
};
