import { CreateUserInput } from "@/src/types/modelTypes/user/user.types";
import { z, ZodType } from "zod";

export const UserSchema: ZodType<CreateUserInput> = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.email(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  role: z
    .enum(["CUSTOMER", "OWNER", "DELIVERY", "ADMIN", "SUPPORT"])
    .default("CUSTOMER"),
  subscriptionsType: z
    .enum(["NONE", "STARTER", "PLUS", "PREMIUM"])
    .default("NONE"),
    
});

export type RegisterData = z.infer<typeof UserSchema>;
