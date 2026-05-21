"use server";
import { prisma } from "@/src/lib/prisma";

export const addToCart = async (
  restaurantId: number | undefined,
  itemId: number,
  userId: number | undefined,
) => {
  if (!userId) {
    return { message: "Empty fields not accepted", state: "Failed" };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const userCart = await tx.cart.findUnique({
        where: { userId },
        select: { id: true, restaurantId: true },
      });

      let cartId: number;

      if (userCart) {
        if (restaurantId !== userCart.restaurantId) {
          throw new Error("CONFLICT");
        }
        cartId = userCart.id;
      } else {
        if (!restaurantId) {
          throw new Error("INVALID");
        }

        const newCart = await tx.cart.create({
          data: {
            userId,
            restaurantId,
          },
          select: { id: true },
        });

        cartId = newCart.id;
      }

      const cartItem = await tx.cartItem.upsert({
        where: {
          cartId_itemId: {
            cartId,
            itemId,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          cartId,
          userId,
          itemId,
          quantity: 1,
        },
      });

      return cartItem.id;
    });

    return {
      message: "Added to cart",
      state: "Success",
      cartItemId: result,
    };
  } catch (error: any) {
    if (error.message === "CONFLICT") {
      return {
        message: "Already have items from other restaurant",
        state: "Conflict",
      };
    }

    return {
      message: "Something went wrong",
      state: "Failed",
    };
  }
};

export const forceAddTocart = async (
  itemId: number,
  userId: number,
  restaurantId: number,
) => {
  await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!cart) return;

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await tx.cart.update({
      where: { userId },
      data: { restaurantId },
    });

    await tx.cartItem.create({
      data: {
        cartId: cart.id,
        itemId,
        userId,
        quantity: 1,
      },
    });
  });

  return {
    message: "Cart replaced and item added",
    state: "Success",
  };
};
