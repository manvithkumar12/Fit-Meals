import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./isLogged";
import prisma from "../config/prismaClient";

type OwnerHandler = (
  req: NextRequest,
  userId: number,
  userRole: string,
  restaurantId: number,
) => Promise<NextResponse>;

export const isOwner = (handler: OwnerHandler) => {
  return async (req: NextRequest) => {
    return isLoggedIn(async (req2, user) => {
      if (user.role !== "OWNER") {
        return NextResponse.json(
          { message: "Access Denied", state: "Failed" },
          { status: 403 },
        );
      }

      const restaurant = await prisma.restaurant.findFirst({
        where: { ownerId: Number(user.id) },
        select: { id: true },
      });

      if (!restaurant) {
        return NextResponse.json(
          {
            message: "No restaurant associated with your profile",
            status: "Warning",
          },
          { status: 404 },
        );
      }

      return handler(req2, user.id, user.role, restaurant.id);
    })(req);
  };
};
