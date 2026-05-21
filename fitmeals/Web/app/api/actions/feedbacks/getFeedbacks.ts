"use server";

import { prisma } from "@/src/lib/prisma";

export const getFeedbacks = async (limit = 4) => {
  try {
    return await prisma.feedBacks.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        message: true,
        user: { select: { profileUrl: true, name: true } },
      },
    });
  } catch {
    return null;
  }
};
