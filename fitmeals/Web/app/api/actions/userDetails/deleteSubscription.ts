"use server";

import { prisma } from "@/src/lib/prisma";

export const deleteSubscription = async (userId: number) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        subscriptionsType: "NONE",
      },
    });

    return true;
  } catch (err) {
    console.log(err);

    throw new Error(
      err instanceof Error ? err.message : "Failed to delete subscription",
    );
  }
};
