import { getRestaurantId } from "@/app/api/actions/restaurant/getRestaurantId";
import { getUser } from "@/lib/CurrentUser";
import { redirect } from "next/navigation";
import React from "react";
import FoodItemsPage from "@/src/Components/FoodDetails/FoodItemsPage";
const Page = async () => {
  const user = await getUser();
  if (!user?.id) {
    return redirect("/login/RestaurantPartner");
  }
  const restaurant = await getRestaurantId(user.id);
  if (!restaurant?.id) {
    return;
  }

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      <FoodItemsPage restaurantID={restaurant.id} />
    </div>
  );
};

export default Page;
