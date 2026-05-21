
export type FoodItemInput = {
  title: string;
  price: number;
  type: string;
  weight: number;
  time: number;
  foodBenefits: string[];
  description: string[];
  category: string;
  proteinPer100gm: number;
  salt:number
  carboHydratePer100gm: number;
  caloriesPer100gm: number;
  fatsPer100gm: number;
  imgUrl: string;
  isAvailable: boolean;
  ingredients: {
    title: string;
    quantity: string;
    imgUrl: null;
  }[];
};
export type foodItemDB = FoodItemInput & {
  restaurantId: number;
};
