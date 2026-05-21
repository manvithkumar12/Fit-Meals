import { queryInput } from "@/src/types/modelTypes/user/query.types";
import { z, ZodType } from "zod";

export const queryValidator: ZodType<queryInput> = z.object({
  message: z.string().min(3,"message should be minimum 3 characters"),
  lastName: z
    .string()
    .min(3, "Name should be minimum 3 characters")
    .regex(/^[a-zA-Z]+$/),
  firstName: z.string().regex(/^[a-zA-Z]+$/),
  email: z.email(),
});
export type queryApi = z.infer<typeof queryValidator>;
