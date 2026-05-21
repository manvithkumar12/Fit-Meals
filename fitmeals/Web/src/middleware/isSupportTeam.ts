import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./isLogged";

type AuthUser = { id: number; role: string };

type AuthorizedHandler = (
  req: NextRequest,
  user: AuthUser,
  ctx?: any
) => Promise<NextResponse>;

export const isAuthorized = (handler: AuthorizedHandler) => {
  return isLoggedIn(async (req, user, ctx) => {  
    if (user.role !== "SUPPORT" && user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Access Denied", state: "Failed" },
        { status: 403 }
      );
    }
    return handler(req, user, ctx);
  });
};