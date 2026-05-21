export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "OWNER" | "DELIVERY" | "ADMIN" | "SUPPORT";
  phoneNumber: string;
  subscriptionsType: "NONE" | "PLUS" | "STARTER" | "PREMIUM";
};
export type CreateUserDBInput = CreateUserInput & {
  isVerified: "PENDING" | "VERIFIED";
};
