"use server";
import { prisma } from "@/src/lib/prisma";
import { getTotal } from "../cart/TotalPrice";

export const createOrder = async (
  userId: number,
  modeOfPayment: "CARD" | "CASH" | "UPI",
) => {
  try {
    const TotalAmount = await getTotal(userId);
    if (!TotalAmount)
      return {
        message: "Cannot create order try again later",
        state: "Failed",
      };
    const estTime = new Date(
      Date.now() + (TotalAmount.estimatedTimeMinutes ?? 0) * 60000,
    );
    const cartDetails = await prisma.cart.findFirst({
      where: { userId },
      select: {
        addressId: true,
        cartItems: { select: { quantity: true, itemId: true } },
        restaurantId: true,
      },
    });
    if (!cartDetails)
      return {
        message: "Cannot create order try again later",
        state: "Failed",
      };
    const foodItems = await prisma.foodItem.findMany({
      where: {
        id: {
          in: cartDetails.cartItems.map((item) => item.itemId),
        },
      },
    });
    await prisma.$transaction(async (tx) => {
      const typeofUser = await tx.user.findUnique({
        where: { id: userId },
        select: { subscriptionsType: true },
      });
      if (!typeofUser) {
        return {
          message: "Cannot create order try again later",
          state: "Failed",
        };
      }
      const order = await tx.orderInfo.create({
        data: {
          customerId: userId,
          DeliveryAdressId: cartDetails.addressId!,
          restaurantId: cartDetails.restaurantId,
          OrderStatus: "Waiting",
          DeliveryPartnerId: undefined,
          Amount: TotalAmount.NumTotalPrice!,
          status: "PENDING",
          modeOfPayment: modeOfPayment,
          estimatedTime: estTime,
          OrderType: typeofUser.subscriptionsType,
        },
      });
      await tx.orderItem.createMany({
        data: cartDetails.cartItems.map((item) => {
          const food = foodItems.find((f) => f.id === item.itemId);
          return {
            orderId: order.orderNo,
            foodItemId: item.itemId,
            quantity: item.quantity,
            price: food?.price ?? 0,
          };
        }),
      });
    });
    console.log("Total amount:", TotalAmount.NumTotalPrice);
  } catch (error) {}
  return {
    message: "Cannot create order try again later",
    state: "Failed",
  };
};

export const getOrderId = async (userId: number) => {
  const order = await prisma.orderInfo.findFirst({
    where: {
      customerId: userId,
      status: "PENDING",
    },
    orderBy: {
      orderNo: "desc",
    },
    select: {
      orderNo: true,
    },
  });

  return order?.orderNo ?? null;
};
