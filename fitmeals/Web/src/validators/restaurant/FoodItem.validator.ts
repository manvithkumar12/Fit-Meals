import { z, ZodType } from "zod";

import { FoodItemInput } from "@/src/types/modelTypes/restaurant/foodItem.types";
import { FoodTypes } from "@/src/types/enums/FoodTypes.types";
import { FoodCategory } from "@/src/types/enums/FoodCategory.types";
import { FoodBenefits } from "@/src/types/enums/foodBenefits.types";

export const FoodItemSchema: ZodType<FoodItemInput> = z.object({
  title: z.string().min(2).max(50),
  price: z.number().positive(),
  type: z.enum(FoodTypes),
  weight: z.number().positive(),
  time: z
    .number()
    .int()
    .positive()
    .max(300, "Enter valid cooking time (max 300 min)"),
  foodBenefits: z.array(z.enum(FoodBenefits)).min(1).max(2),
  imgUrl: z.url({ message: "enter valid url" }),
  description: z
    .array(z.string().min(2))
    .min(1)
    .max(4, "Enter benefits minimum 1 maximum 4"),
  category: z.enum(FoodCategory),
  proteinPer100gm: z.number().nonnegative(),
  salt: z.number().nonnegative(),
  carboHydratePer100gm: z.number().nonnegative(),
  caloriesPer100gm: z.number().nonnegative(),
  fatsPer100gm: z.number().nonnegative(),
  isAvailable: z.boolean(),
  ingredients: z.array(
    z.object({
      title: z
        .string()
        .regex(/[a-zA-Z]+/, "only characters are allowed for ingredients"),
      quantity: z.string(),
      imgUrl: z.null(),
    }),
  ),
});

export type FoodItemProps = z.infer<typeof FoodItemSchema>;
