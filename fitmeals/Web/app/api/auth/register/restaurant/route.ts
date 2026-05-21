import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { restaurantCreateController } from "@/src/controller/Creators/restaurant/restaurantCreate";
import { isLoggedIn } from "@/src/middleware/isLogged";

export const POST = isLoggedIn(async (req: Request, user) => {
  if (user.role !== "OWNER") {
    return NextResponse.json(
      {
        message: "Only Restaurant Owners can create restaurants",
        state: "Forbidden",
      },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();

    const restaurantDetails = await restaurantCreateController(
      body,
      Number(user.id),
    );

    return NextResponse.json({
      message: "Restaurant added successfully",
      state: "Success",
      restaurantDetails,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );

      return NextResponse.json(
        {
          message: messages.join(", "),
          state: "Warning",
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message || "An error occurred",
          state: "Failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Unknown error occurred",
        state: "Failed",
      },
      { status: 500 },
    );
  }
});
