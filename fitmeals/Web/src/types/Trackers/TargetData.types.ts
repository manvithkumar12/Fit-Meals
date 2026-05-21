export type targetDataType = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  id?: number;
};

export type allMealsDataType =
  | {
      id: number;
      bls_code: string | null;
      foodname: string | null;
      energy: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      salt: number | null;
    }[]
  | undefined;

export type sumData = {
  loggedCalories: number;
  loggedCarbos: number;
  loggedFat: number;
  loggedProtein: number;
};
