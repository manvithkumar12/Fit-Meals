export type logedUser = {
  id?: number;
  role?: "SUPPORT" | "OWNER" | "ADMIN" | "DELIVERY" | "CUSTOMER";
  email?: string;
  username?: string;
  subscriptionType?: "STARTER" | "NONE" | "PREMIUM" | "PLUS";
  profileUrl: string | null;
  status: "ACTIVE" | "BLOCKED" | "SUSPENDED";
  isVerified: "VERIFIED" | "PENDING";
  phoneNumber: string;
} | null;
