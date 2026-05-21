import { feedBackCreate } from "@/src/controller/Creators/user/feedbackCreate";
import { isLoggedIn } from "@/src/middleware/isLogged";
import { feedbackLimit } from "@/src/models/user/feedBackModel";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = isLoggedIn(
  async (req: NextRequest,user) => {
    try {
      const limit = await feedbackLimit(user.id);
      if (limit) {
        return NextResponse.json(
          {
            message: "each user can submit only 1 feedback",
            state: "Failed",
          },
          { status: 403 },
        );
      }
      const body = await req.json();
      await feedBackCreate(body, user.id);
      return NextResponse.json(
        {
          message: "Feedback created sucessfully",
          state: "Success",
        },
        { status: 201 },
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            message: error.issues[0]?.message || "Validation error",
            state: "Warning",
          },
          { status: 400 },
        );
      }
      return NextResponse.json(
        {
          message: "An error occured try again",
          state: "Failure",
        },
        { status: 500 },
      );
    }
  },
);
