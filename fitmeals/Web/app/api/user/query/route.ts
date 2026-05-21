import { createQuery } from "@/src/controller/Creators/user/queryCreate";
import { isLoggedIn } from "@/src/middleware/isLogged";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = isLoggedIn(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        {
          message: "All fields are required",
          state: "Failed",
        },
        { status: 200 },
      );
    }
    if (user.role === "CUSTOMER") {
      await createQuery(body, "OPEN", user.id);
      return NextResponse.json(
        {
          messgae: "Successfully created",
          state: "Success",
        },
        { status: 201 },
      );
    }
    return NextResponse.json(
      {
        messgae: "Not Authorized",
        state: "Failed",
      },
      { status: 500 },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message || "Validation error",
          path: error.issues[0].path,
          state: "Failed",
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        messgae: "an error occured",
        state: "Failed",
      },
      { status: 500 },
    );
  }
});
