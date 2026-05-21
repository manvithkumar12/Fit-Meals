import { createUser as createUserModel } from "@/src/models/user/UserModel";
import { UserSchema } from "@/src/validators/user/User.validator";
import bcrypt from "bcryptjs";
import { CreateUserInput } from "@/src/types/modelTypes/user/user.types";
const Allowed_Roles = new Set(["CUSTOMER", "OWNER", "DELIVERY", "SUPPORT"]);

const getRoleStatus = (
  role: "CUSTOMER" | "OWNER" | "DELIVERY" | "SUPPORT",
): "PENDING" | "VERIFIED" => {
  if (role === "CUSTOMER") return "VERIFIED";
  if (role === "SUPPORT") return "VERIFIED";
  return "PENDING";
};

export const createUserController = async (body: unknown) => {
  const parsed: CreateUserInput = UserSchema.parse(body);

  const role = Allowed_Roles.has(parsed.role) ? parsed.role : "CUSTOMER";

  const safeData = {
    ...parsed,
    role,
    password: parsed.password
      ? await bcrypt.hash(parsed.password, await bcrypt.genSalt(10))
      : parsed.password,
    isVerified: getRoleStatus(
      role as "CUSTOMER" | "OWNER" | "DELIVERY" | "SUPPORT",
    ),
  };

  return await createUserModel(safeData);
};
