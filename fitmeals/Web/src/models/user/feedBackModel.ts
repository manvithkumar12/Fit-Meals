import { feedBackDB } from "../../types/modelTypes/user/feedBack.types";
import { prisma } from "@/src/lib/prisma";

export const addFeedBack = async (feedback: feedBackDB) => {
  return await prisma.feedBacks.create({
    data: {
      message: feedback.message,
      userId: feedback.userId,
    },
  });
};

export const feedbackLimit = async (userId: number) => {
  const existing = await prisma.feedBacks.findFirst({
    where: { userId },
  });
  return !!existing;
};
