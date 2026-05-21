"use server";

import { prisma } from "@/src/lib/prisma";

export const getPartnerOrders = async (partnerId: number) => {
  const orders = await prisma.orderInfo.findMany({
    where: {
      DeliveryPartnerId: partnerId,
      status: "APPROVED",
    },
    select: {
      orderNo: true,
      restaurant: {
        select: {
          name: true,
        },
      },
      OrderedTime: true,
      DeliveredTime: true,
      modeOfPayment: true,
      OrderStatus: true,
      Amount: true,
    },
  });

  return orders.map((item) => ({
    ...item,
    Amount: Number(item.Amount),
  }));
};

export const getPartnerId = async (userId: number) => {
  const partner = await prisma.deliveryPartner.findUnique({
    where: {
      UserId: userId,
    },
    select: {
      id: true,
    },
  });
  return partner?.id;
};
