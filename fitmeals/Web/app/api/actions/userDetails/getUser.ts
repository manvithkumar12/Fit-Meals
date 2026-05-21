"use server"
import { prisma } from "@/src/lib/prisma";

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      profileUrl: true,
      name: true,
      email: true,
      phoneNumber: true,
      subscriptionsType: true,
      role: true,
    },
  });
  return user;
};
