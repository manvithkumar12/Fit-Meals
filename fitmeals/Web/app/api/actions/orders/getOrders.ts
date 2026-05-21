"use server";
import { prisma } from "@/src/lib/prisma";

export const getOrders = async (userId: number, orderId: number) => {
  const data = await prisma.orderInfo.findFirst({
    where: {
      orderNo: orderId,
      customerId: userId,
    },
    select: {
      orderNo: true,
      deliveryAddress: { select: { address: true } },
      deliveryPartner: { select: { title: true, deliveredOrders: true,user:{select:{phoneNumber:true,profileUrl:true}} } },
      Amount: true,
      OrderStatus: true,
      estimatedTime: true,
      items: {
        select: { quantity: true, foodItem: { select: { title: true } } },
      },
    },
  });
  const timeNow = Date.now();
  const time = data?.estimatedTime
    ? Math.max(
        Math.floor((new Date(data.estimatedTime).getTime() - timeNow) / 60000),
        0,
      )
    : null;

  if (!data) return null;

  const { estimatedTime, ...rest } = data;
  return {
    ...rest,
    time,
  };
};
