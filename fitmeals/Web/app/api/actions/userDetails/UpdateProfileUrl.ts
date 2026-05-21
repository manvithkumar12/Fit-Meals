"use server";
import { prisma } from "@/src/lib/prisma";

export const UpdateProfileUrl = async (id: number, url: string) => {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        profileUrl: url,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};
