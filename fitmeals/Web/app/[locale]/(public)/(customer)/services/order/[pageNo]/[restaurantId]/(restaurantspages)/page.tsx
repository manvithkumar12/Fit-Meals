import { getUser } from "@/lib/CurrentUser";
import HotelFilters from "@/src/Components/FlexFilter/HotelFilters";
import { cartRestaurantId } from "@/src/models/user/cartModel";
import React, { Suspense } from "react";
import FoodItems from "./FoodItems";
import FoodBoxLoading from "@/src/Components/ServiceComponent/order/FoodBoxLoading";

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
        <Suspense fallback={<div className="w-full h-96 bg-white rounded-lg animate-pulse border border-gray-200" />}>
          <HotelFilters />
        </Suspense>
      </div>
      <div className="w-full lg:w-[70%] h-max">
        <Suspense
          fallback={
            <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 h-full p-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <FoodBoxLoading key={index + 1} />
              ))}
            </div>
          }
        >
          <FoodItems
            restaurantId={RNumber}
            RestaurantID={cartRestaurant?.restaurantId}
            cartItems={cartRestaurant?.cartItems}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

