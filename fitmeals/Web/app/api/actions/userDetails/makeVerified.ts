"use server";

import { prisma } from "@/src/lib/prisma";

export const makeVerified = async (id: number) => {
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          isVerified: "VERIFIED",
        },
      }),

      prisma.restaurant.update({
        where: { ownerId: id },
        data: {
          status: "ACTIVE",
        },
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to make user verified");
  }
};
export const isUnderVerification = async (id: number) => {
  try {
    const status = await prisma.restaurant.findUnique({
      where: { ownerId: id, status: "VERIFICATION" },
    });
    if (!status) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to check verification status");
  }
};
