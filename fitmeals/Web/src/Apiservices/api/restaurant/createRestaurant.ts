import { RestaurantInput } from "@/src/types/modelTypes/restaurant/restaurant.types";

export const addRestaurant = async (data: RestaurantInput) => {
  const res = await fetch("/api/auth/register/restaurant", {
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "An error ");
  }
};
