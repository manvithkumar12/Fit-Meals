import { prisma } from "@/src/lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createToken } from "@/src/utils/GenerateToken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const ALLOWED_ROLES = ["CUSTOMER", "OWNER", "DELIVERY"] as const;
type Role = (typeof ALLOWED_ROLES)[number];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential, role } = body;
    console.log("BODY:", body);
    console.log("Credential exists?", !!credential);
    console.log("Credential:", credential?.slice?.(0, 20));
    console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);

    if (!ALLOWED_ROLES.includes(role as Role)) {
      return NextResponse.json(
        {
          state: "Failed",
          message: "Invalid role",
        },
        { status: 400 },
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error("Invalid Google account");
    }

    const email = payload.email;
    const name = payload.name ?? "";
    const image = payload.picture ?? "";

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
        name,
        profileUrl: image,
        password: randomUUID(),
        isVerified: "VERIFIED",
        role: role as Role,
      },
    });
    const token = createToken({
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.name,
      subscriptionType: user.subscriptionsType,
      status: user.status,
      profileUrl: user.profileUrl,
      isVerified: user.isVerified,
      phoneNumber: user.phoneNumber || "",
    });

    const response = NextResponse.json({
      state: "Success",
      message: "Logged in successfully",
      userId: user.id,
      role: user.role,
    });

    response.cookies.set("UserToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return NextResponse.json(
      {
        state: "Failed",
        message: error instanceof Error ? error.message : "Google login failed",
      },
      { status: 401 },
    );
  }
}
