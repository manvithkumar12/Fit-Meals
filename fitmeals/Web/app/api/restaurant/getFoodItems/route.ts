import {
  getFoodItems,
  sendFoodItem,
} from "@/src/models/restaurant/FoodItemModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const RestaurantId = req.nextUrl.searchParams.get("RestaurantId");
  const FoodId = req.nextUrl.searchParams.get("itemId");

  if (!RestaurantId) {
    return NextResponse.json(
      {
        message: "No restaurant found with received id",
        state: "Failed",
      },
      { status: 404 },
    );
  }
  if (RestaurantId && !FoodId) {
    const FoodItems = await getFoodItems(Number(RestaurantId));
    return NextResponse.json(
      {
        message: FoodItems,
        state: "Success",
      },
      { status: 200 },
    );
  }
  if (RestaurantId && FoodId) {
    const singlefoodItem = await sendFoodItem(
      Number(RestaurantId),
      Number(FoodId),
    );
    return NextResponse.json(
      {
        message: singlefoodItem,
        state: "Success",
      },
      { status: 200 },
    );
  }
  return NextResponse.json(
    {
      message: "An error occured",
      state: "Failed",
    },
    { status: 500 },
  );
};
