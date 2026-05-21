import { getUser } from "@/lib/CurrentUser";
import HotelFilters from "@/src/Components/FlexFilter/HotelFilters";
import { cartRestaurantId } from "@/src/models/user/cartModel";
import React from "react";
import FoodItems from "./FoodItems";

const Page = async ({
  params,
}: {
  params: Promise<{ restaurantId: string; locale: string }>;
}) => {
  const { restaurantId } = await params;
  const RNumber = Number(restaurantId.split("-")[0]);
  const user = await getUser();
  const cartRestaurant = await cartRestaurantId(user?.id);
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-[30%] h-max p-2 lg:pt-10">
        <HotelFilters />
      </div>
      <div className="lg:w-[70%] h-max">
        <FoodItems
          restaurantId={RNumber}
          RestaurantID={cartRestaurant?.restaurantId}
          cartItems={cartRestaurant?.cartItems}
        />
      </div>
    </div>
  );
};

export default Page;
