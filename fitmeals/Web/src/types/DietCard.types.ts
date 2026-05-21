import { dietFoodRes } from "../context/dietPlan/selectionContext";

interface MealItem {
  title: string;
  protein: number;
}

export interface DietCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner";
  mealTime: string;
  itemsData?: dietFoodRes;
}
