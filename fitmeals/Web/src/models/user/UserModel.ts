import { prisma } from "@/src/lib/prisma";
import { CreateUserDBInput } from "@/src/types/modelTypes/user/user.types";

export const createUser = async (user: CreateUserDBInput) => {
  return await prisma.user.create({
    data: user,
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getVerified = async (id: number) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      isVerified: "VERIFIED",
    },
  });
  return !!user;
};

export const hasRestaurant = async (id: number) => {
  const user = await prisma.restaurant.findFirst({
    where: { ownerId: id },
  });
  return user;
};
export const changelockData = async (
  id: number,
  data: { updatefailedAttempts?: number; lockUntil?: Date | null },
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      ...(data.updatefailedAttempts !== undefined && {
        failedAttempts: data.updatefailedAttempts,
      }),
      ...(data.lockUntil !== undefined && { lockUntil: data.lockUntil }),
    },
  });
};
