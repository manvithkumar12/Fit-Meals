export type cookBookInput = {
  title: string;
  calories: number;
  steps: string[];
  description: string[];
  mainurl: string;
  imgUrl: string[];
  weight: number;
  foodType: string;
  time: number;
  nutritionalValue: number;
  proteinPer100gm: number;
  caloriesPer100gm: number;
  fatsPer100gm: number;
  carboHydratePer100gm: number;
  ingredients: {
    title: string;
    quantity: string;
    imgUrl: string;
  }[];
};
export type cookBookDB = cookBookInput & {
  addedBy: number;
};
