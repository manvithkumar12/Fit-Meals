import { dietApiProps } from "@/src/types/dietApiProps";
import { userDietInput } from "@/src/types/userDiet.types";

export const dietDataPosting = async (
  userData: userDietInput,
  dietApi: string,
) => {
  try {
    const res = await fetch(`${dietApi}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch diet data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching diet:", error);
    throw error;
  }
};
export const perItemValues = (
  postApi: dietApiProps,
  Breakfastitems: number,
  dinnerItems: number,
  lunchItems: number,
) => {
  const perItemValue = {
    Breakfast: {
      calories: Number(
        (postApi.timings.Breakfast.calories / Breakfastitems).toFixed(2),
      ),
      protein: Number(
        (postApi.timings.Breakfast.protein / Breakfastitems).toFixed(2),
      ),
      carbs: Number(
        (postApi.timings.Breakfast.carbs / Breakfastitems).toFixed(2),
      ),
      fats: Number(
        (postApi.timings.Breakfast.fats / Breakfastitems).toFixed(2),
      ),
    },
    Lunch: {
      calories: Number(
        (postApi.timings.Lunch.calories / lunchItems).toFixed(2),
      ),
      protein: Number((postApi.timings.Lunch.protein / lunchItems).toFixed(2)),
      carbs: Number((postApi.timings.Lunch.carbs / lunchItems).toFixed(2)),
      fats: Number((postApi.timings.Lunch.fats / lunchItems).toFixed(2)),
    },
    Dinner: {
      calories: Number(
        (postApi.timings.Dinner.calories / dinnerItems).toFixed(2),
      ),
      protein: Number(
        (postApi.timings.Dinner.protein / dinnerItems).toFixed(2),
      ),
      carbs: Number((postApi.timings.Dinner.carbs / dinnerItems).toFixed(2)),
      fats: Number((postApi.timings.Dinner.fats / dinnerItems).toFixed(2)),
    },
  };
  return perItemValue;
};
