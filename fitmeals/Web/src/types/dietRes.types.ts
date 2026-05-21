export type dietResData = {
  Breakfast: {
    bls_code: string | null;
    carbohydrate: number | null;
    energy: number | null;
    fat: number | null;
    foodname: string | null;
    id: number;
    protein: number | null;
    salt: number | null;
  }[];
  Dinner: {
    bls_code: string | null;
    carbohydrate: number | null;
    energy: number | null;
    fat: number | null;
    foodname: string | null;
    id: number;
    protein: number | null;
    salt: number | null;
  }[];
  Lunch: {
    bls_code: string | null;
    carbohydrate: number | null;
    energy: number | null;
    fat: number | null;
    foodname: string | null;
    id: number;
    protein: number | null;
    salt: number | null;
  }[];
};
export type FoodAmountProps = {
  breakFastItems: number;
  lunchItems: number;
  dinnerItems: number;
};
