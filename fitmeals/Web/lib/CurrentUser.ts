import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { logedUser } from "@/src/types/logedUser.types";

export const getUser = async (): Promise<logedUser> => {
  const cookiestore = await cookies();
  const token = cookiestore.get("UserToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: number;
      role: "SUPPORT" | "OWNER" | "ADMIN" | "DELIVERY" | "CUSTOMER";
      email: string;
      username: string;
      subscriptionType: "STARTER" | "NONE" | "PREMIUM" | "PLUS";
      profileUrl: string | null;
      status: "ACTIVE" | "BLOCKED" | "SUSPENDED";
      isVerified: "VERIFIED" | "PENDING";
      phoneNumber: string;
    };

    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      username: decoded.username,
      subscriptionType: decoded.subscriptionType,
      status: decoded.status,
      profileUrl: decoded.profileUrl,
      isVerified: decoded.isVerified,
      phoneNumber: decoded.phoneNumber,
    };
  } catch {
    return null;
  }
};
