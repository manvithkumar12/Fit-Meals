export interface FoodItem {
  id: number;
  title: string;
  price: number;
  weight: number;
  time: number;
  description: string[];
  proteinPer100gm: number;
  carboHydratePer100gm: number;
  caloriesPer100gm: number;
  fatsPer100gm: number;
  averageRating: number;
  restaurantId: number;
  type: string;
  category: string;
  foodBenefits: string[];
  imgUrl: string;
}

interface FetchFoodItemsResponse {
  message: FoodItem[];
}

export const fetchFoodItems = async (
  restaurantId: number,
): Promise<FetchFoodItemsResponse> => {
  const baseUrl =
    globalThis.window === undefined ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const res = await fetch(
    `${baseUrl}/api/restaurant/getFoodItems?RestaurantId=${restaurantId}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(errorData?.message || "An error occurred");
  }

  return res.json();
};
