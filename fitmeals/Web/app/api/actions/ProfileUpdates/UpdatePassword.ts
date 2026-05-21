"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export const UpdatePassword = async (userId: number, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return true;
  } catch (error) {
    return false;
  }
};
