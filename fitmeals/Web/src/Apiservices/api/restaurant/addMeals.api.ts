import { FoodItemInput } from "@/src/types/modelTypes/restaurant/foodItem.types";

export const addMealApi = async (data: FoodItemInput) => {
  const res = await fetch("/api/restaurant/addFood", {
    credentials: "include",
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || "An error occured");
  }
};
