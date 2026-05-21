import { NextResponse } from "next/server";
import { createUserController } from "@/src/controller/Creators/user/userCreate";
import { ZodError } from "zod";
import { createToken } from "@/src/utils/GenerateToken";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const userData = await createUserController(body);
    const token = createToken({
      id: userData.id,
      role: userData.role,
      username: userData.name,
      email: userData.email,
      subscriptionType: userData.subscriptionsType,
      status: userData.status,
      profileUrl: userData.profileUrl,
      isVerified: userData.isVerified,
      phoneNumber: String(userData.phoneNumber),
    });

    const response = NextResponse.json({
      message: "Profile Created Successfully",
      state: "Success",
      user: { id: userData.id, email: userData.email, role: userData.role },
    });

    response.cookies.set("UserToken", token, {
      httpOnly: true,
      secure: true,
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

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      return NextResponse.json(
        {
          message:
            "User already registered with this credentials. Please login.",
          state: "Warning",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "User Creation Failed", state: "Failed" },
      { status: 500 },
    );
  }
};
