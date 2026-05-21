"use server";

import { prisma } from "@/src/lib/prisma";

export const makeRiderVerified = async (id: number) => {
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          isVerified: "VERIFIED",
        },
      }),

      prisma.deliveryPartner.update({
        where: { UserId: id },
        data: {
          status: "ACTIVE",
        },
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to make rider verified");
  }
};

export const isRiderUnderVerification = async (id: number) => {
  try {
    const status = await prisma.deliveryPartner.findUnique({
      where: { UserId: id, status: "VERIFICATION" },
    });
    if (!status) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to check rider verification status");
  }
};
