"use server";
import { prisma } from "@/src/lib/prisma";

export const CreateQuery = async (message: string, userId: number) => {
  try {
    const parsedUserId = Number(userId);
    await prisma.queries.create({
      data: {
        status: "OPEN",
        userId: parsedUserId,
        message,
      },
    });
  } catch (error: any) {
    throw new Error("Failed to create query");
  }
};
