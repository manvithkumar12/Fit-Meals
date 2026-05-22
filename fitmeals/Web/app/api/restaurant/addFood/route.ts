import { foodItemCreate } from "@/src/controller/Creators/restaurant/FoodItemCreate";
import { isOwner } from "@/src/middleware/isRestaurantOwner";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const POST = isOwner(async (req, userId, userRole, restaurantId) => {
  try {
    const body = await req.json();

    console.log(JSON.stringify(body, null, 2));

    const FoodDetails = await foodItemCreate(
      body,
      Number(restaurantId)
    );

    return NextResponse.json(
      {
        message: "Item Added Successfully",
        state: "Success",
        data: FoodDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "This food item already exists",
          state: "Warning",
        },
        { status: 409 }
      );
    }

    if (error instanceof ZodError) {
      console.error(JSON.stringify(error.issues, null, 2));

      return NextResponse.json(
        {
          message: error.issues[0]?.message || "Validation error",
          state: "Warning",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error occurred. Try again.",
        state: "Failed",
      },
      { status: 500 }
    );
  }
});
