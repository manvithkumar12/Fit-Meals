import { queryModel } from "@/src/models/user/queryModel";
import { queryValidator } from "@/src/validators/user/query.validator";

export const createQuery = async (
  body: unknown,
  status: "OPEN" | "CLOSED",
  userId: number,
) => {
  const parsed = queryValidator.parse(body);
  return await queryModel({ ...parsed, status, userId });
};
