import { loginController } from "@/src/controller/auth/LoginController";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { loginLimiter } from "@/src/lib/rateLimiter";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const ipHeader = req.headers.get("x-forwarded-for");
    const ip = ipHeader ? ipHeader.split(",")[0].trim() : "unknown";

    try {
      await loginLimiter.consume(ip);
    } catch {
      return NextResponse.json(
        {
          message: "Too many login attempts. Try again later.",
          state: "Failed",
        },
        { status: 429 },
      );
    }

    const userLoginDetails = await loginController(body);

    const response = NextResponse.json({
      message: "logged in Successfully",
      state: "Success",
      userId: userLoginDetails.id,
    });

    response.cookies.set("UserToken", userLoginDetails.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0]?.message || "Validation error",
          state: "Warning",
        },
        { status: 400 },
      );
    }
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json(
        { message: error.message || "Login failed", state: "Failed" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error", state: "Failed" },
      { status: 500 },
    );
  }
};
