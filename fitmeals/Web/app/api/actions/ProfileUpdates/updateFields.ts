"use server";
import { prisma } from "@/src/lib/prisma";
import z from "zod";

const UpdateProfile = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),

  email: z.string().email("Invalid email"),

  phonenumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"),
});

export type Updateform = {
  username: string;
  email: string;
  phonenumber: string;
  userId: number | undefined;
};

export const ChangeProfileFields = async (data: Updateform) => {
  const parsed = UpdateProfile.safeParse(data);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  try {
    await prisma.user.update({
      where: {
        id: data.userId,
      },

      data: {
        name: data.username,
        email: data.email,
        phoneNumber: data.phonenumber,
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      throw new Error("Email already exists");
    }

    if (error.code === "P2025") {
      throw new Error("User not found");
    }

    throw new Error("Failed to update profile");
  }
};
