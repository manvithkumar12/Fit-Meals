export type mealsFormType = {
  title: string;
  price: number;
  type: string;
  weight: number;
  time: number;
  foodBenefits: string[];
  description: string[];
  category: string;
  proteinPer100gm: number;
  carboHydratePer100gm: number;
  salt: number;
  caloriesPer100gm: number;
  fatsPer100gm: number;
  imgUrl: string;
  isAvailable: boolean;
  ingredients: {
    title: string[];
    quantity: string[];
    imgUrl: null;
  };
};
