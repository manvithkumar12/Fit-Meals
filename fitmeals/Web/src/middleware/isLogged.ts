import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type AuthUser = {
  id: number;
  role: string;
  status: "ACTIVE" | "SUSPENDED" | "BLOCKED";
};

type AuthHandler = (
  req: NextRequest,
  user: AuthUser
) => Promise<NextResponse>;

export const isLoggedIn = (handler: AuthHandler) => {
  return async (req: NextRequest) => {
    const token = req.cookies.get("UserToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Please login first", state: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        role: string;
        status: AuthUser["status"];
      };

      return handler(req, {
        id: decoded.id,
        role: decoded.role,
        status: decoded.status,
      });
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token", state: "Unauthorized" },
        { status: 401 }
      );
    }
  };
};
