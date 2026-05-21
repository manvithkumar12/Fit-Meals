import { cookBookInput } from "@/src/types/modelTypes/supportTeam/cookbook.types";
import { z, ZodType } from "zod";

export const cookBookValidator: ZodType<cookBookInput> = z.object({
  title: z
    .string()
    .min(3, "food name must be between 3 to 15 character")
    .max(15, "food name must be between 3 to 15 character")
    .regex(/[a-zA-Z]+/, "only characters are allowed for title"),
  calories: z.number().nonnegative(),
  mainurl: z.url(),
  steps: z.array(z.string()).min(5).max(5),
  description: z.array(z.string()).min(4).max(4),
  imgUrl: z.array(z.url()).min(5).max(5),
  weight: z.number().nonnegative(),
  time: z.number().max(300).min(1),
  nutritionalValue: z.number().nonnegative(),
  proteinPer100gm: z.number().nonnegative(),
  caloriesPer100gm: z.number().nonnegative(),
  fatsPer100gm: z.number().nonnegative(),
  carboHydratePer100gm: z.number().nonnegative(),
  foodType: z.enum(["Veg", "Non-Veg", "Vegan"]),
  ingredients: z.array(
    z.object({
      title: z
        .string()
        .regex(/[a-zA-Z]+/, "only characters are allowed for ingredients"),
      quantity: z.string().regex(/^\d+$/, "Quantity must contain only numbers"),
      imgUrl: z.string(),
    }),
  ),
});
