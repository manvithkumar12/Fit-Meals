export type dietApiProps = {
  days: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timings: {
    Breakfast: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
    Lunch: { calories: number; protein: number; carbs: number; fats: number };
    Dinner: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  };
};
