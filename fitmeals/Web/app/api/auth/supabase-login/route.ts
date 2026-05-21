import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        {
          message: "Email required",
        },
        {
          status: 400,
        },
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user?.status === "DELETED") {
      throw new Error(
        "Account has been deleted to recover contact support team at fitmeals.auth@gmail.com",
      );
    }

    user ??= await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0],
        role: "CUSTOMER",
        isVerified: "VERIFIED",
        password: crypto.randomUUID(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.name,
        subscriptionType: user.subscriptionsType,
        profileUrl: user.profileUrl,
        status: user.status,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    const cookieStore = await cookies();

    cookieStore.set("UserToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
};
