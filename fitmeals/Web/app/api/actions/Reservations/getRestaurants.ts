"use server";
import { prisma } from "@/src/lib/prisma";

export const getRestaurantById = async (id: number) => {
  try {
    const res= await prisma.restaurant.findUnique({
      where: { id },
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

