import { prisma } from "@/src/lib/prisma";
import { cartTypeDB } from "@/src/types/modelTypes/user/cart.types";

export const cartModel = async (cart: cartTypeDB) => {
  return prisma.$transaction(async (tx) => {
    const createdCart = await tx.cart.create({
      data: {
        userId: cart.userId,
        restaurantId: cart.restaurantId,
      },
    });

    await tx.cartItem.create({
      data: {
        cartId: createdCart.id,
        itemId: cart.itemId,
        quantity: 1,
        userId: cart.userId,
      },
    });
    return createdCart.id;
  });
};

export const findCart = async (userId: number, newrestaurantId: number) => {
  const cartData = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cartData) {
    return null;
  }

  if (cartData.restaurantId !== newrestaurantId) {
    await prisma.$transaction([
      prisma.cartItem.deleteMany({
        where: { cartId: cartData.id },
      }),
      prisma.cart.update({
        where: { id: cartData.id },
        data: { restaurantId: newrestaurantId },
      }),
    ]);
  }

  return cartData;
};

export const isRestaurantMatching = async (
  restaurantId: number,
  userId: number,
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    select: {
      id: true,
      restaurantId: true,
      restaurants: {
        select: { name: true },
      },
    },
  });

  if (!cart) {
    return { match: true, message: 4 };
  }

  if (cart.restaurantId !== restaurantId) {
    return {
      match: false,
      restaurantName: cart.restaurants.name,
      cartId: cart.id,
      message: 3,
    };
  }

  return { match: true, message: 2, cartId: cart.id };
};

export const cartRestaurantId = async (userId: number | undefined) => {
  if (!userId) {
    return null;
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    select: {
      restaurantId: true,
      cartItems: {
        select: {
          id: true,
          quantity: true,
          itemId: true,
        },
      },
    },
  });

  return cart ?? null;
};
