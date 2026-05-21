import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const existingToken = cookieStore.get("UserToken")?.value;

  if (!existingToken) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const decoded = jwt.verify(existingToken, process.env.JWT_SECRET!) as any;

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  if (decoded.subscriptionsType === user.subscriptionsType) {
    return NextResponse.json({
      success: true,
      updated: false,
    });
  }

  const newToken = jwt.sign(
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
      expiresIn: "30d",
    },
  );

  const response = NextResponse.json({
    success: true,
    updated: true,
  });

  response.cookies.set("UserToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
