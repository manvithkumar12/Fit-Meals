import { queryDB } from "@/src/types/modelTypes/user/query.types";
import { prisma } from "@/src/lib/prisma";

export const queryModel = async (query: queryDB) => {
  return await prisma.queries.create({
    data: {
      message: query.message,
      status: query.status,
      userId: query.userId,
    },
  });
};
