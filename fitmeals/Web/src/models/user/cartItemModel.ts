"use server";
import { prisma } from "@/src/lib/prisma";
import { cartItemDB } from "@/src/types/modelTypes/user/cartItem.types";

export const cartItemModel = async (cartItem: cartItemDB) => {
  const existingCart = await prisma.cartItem.findUnique({
    where: {
      cartId_itemId: {
        cartId: cartItem.cartId,
        itemId: cartItem.itemId,
      },
    },
  });

  if (existingCart) {
    return prisma.cartItem.update({
      where: { id: existingCart.id },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  }

  const newCart = await prisma.cartItem.create({
    data: cartItem,
  });
  return newCart;
};

export const updateCartItem = async (id: number, itemquantity: number) => {
  const existing = await prisma.cartItem.findUnique({
    where: { id },
    select: { id: true, quantity: true },
  });

  if (!existing) {
    throw new Error("Cart item not found");
  }

  if (itemquantity <= 0) {
    return prisma.cartItem.delete({
      where: { id },
    });
  }

  return prisma.cartItem.update({
    where: { id },
    data: { quantity: itemquantity },
  });
};

export const findCartItems = async (userId: number | null) => {
  try {
    if (!userId) {
      return [];
    }

    const data = await prisma.cartItem.findMany({
      where: {
        userId,
      },

      select: {
        id: true,
        itemId: true,
        quantity: true,

        item: {
          select: {
            id: true,
            title: true,
            price: true,
            isAvailable: true,
            restaurantId: true,
            imgUrl: true,

            restaurant: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return [];
  }
};
