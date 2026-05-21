"use server"
import { prisma } from "@/src/lib/prisma";

export const removeCartItem = async (cartItemId: number) => {
  const remove = await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
  if (!remove) {
    return { message: "Unable to delete", state: "Failed" };
  }
  return { message: "Removed successfully", state: "Success" };
};
