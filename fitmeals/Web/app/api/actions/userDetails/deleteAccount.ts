"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export const deleteAccount = async (
  id: number,
  password: string,
  role: string,
) => {
  try {
    if (!id || !password) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        password: true,
        status: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.status === "DELETED") {
      throw new Error("Account already deleted");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          status: "DELETED",
        },
      });

      if (role !== "CUSTOMER") {
        await tx.restaurant.updateMany({
          where: {
            ownerId: id,
          },
          data: {
            status: "DELETED",
          },
        });
      }
    });

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch (err) {
    console.error("Delete Account Error:", err);

    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong",
    };
  }
};