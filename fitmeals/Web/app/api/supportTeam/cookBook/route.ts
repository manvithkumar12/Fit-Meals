import { createCookbook } from "@/src/controller/Creators/supportTeam/cookbookCreator";
import { isAuthorized } from "@/src/middleware/isSupportTeam";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = isAuthorized(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    const cookBookDetails = await createCookbook(body, user.id);
    return NextResponse.json({
      message: "Added successfully",
      data: cookBookDetails,
      addedBy: user.role,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message ?? "validation error",
          state: "Failed",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error", state: "Failed" },
      { status: 500 },
    );
  }
});
