import { feedbackValidator } from "@/src/validators/user/feedBack.validator";
import { addFeedBack } from "@/src/models/user/feedBackModel";

export const feedBackCreate = async (body: unknown, userId: number) => {
  const parsed = feedbackValidator.parse(body);
  return await addFeedBack({ ...parsed, userId });
};
