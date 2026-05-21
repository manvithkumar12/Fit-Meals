import z, { ZodType } from "zod";
import { feedBackInput } from "../../types/modelTypes/user/feedBack.types";

export const feedbackValidator: ZodType<feedBackInput> = z.object({
  message: z.string().min(5).max(40, "enter between 3 to 40 characters"),
});
