import jwt from "jsonwebtoken";
type UserRole = "CUSTOMER" | "OWNER" | "DELIVERY" | "ADMIN" | "SUPPORT";
type SubscribeType = "STARTER" | "NONE" | "PREMIUM" | "PLUS";
export const createToken = (payload: {
  id: number;
  role: UserRole;
  email: string;
  username: string;
  subscriptionType: SubscribeType;
  profileUrl: string | null;
  status: "ACTIVE" | "BLOCKED" | "SUSPENDED" | "DELETED";
  isVerified: "VERIFIED" | "PENDING";
  phoneNumber:string;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
