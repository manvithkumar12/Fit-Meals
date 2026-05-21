"use server"
import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";

export const receiveUpdates = async (id: number, email: string) => {
  try {
    const res = await prisma.updates.create({
      data: {
        userId: id,
        email,
      },
    });

    return res;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Duplicate entry
      if (e.code === "P2002") {
        throw new Error("You are already subscribed for updates");
      }
    }

    throw new Error("Something went wrong");
  }
};