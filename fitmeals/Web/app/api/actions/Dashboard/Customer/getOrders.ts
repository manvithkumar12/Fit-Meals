"use server";

import { prisma } from "@/src/lib/prisma";

export const getAllOrders = async (userId: number, page: number) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const totalOrders = await prisma.orderInfo.count({
    where: {
      customerId: userId,
      status: "APPROVED",
    },
  });

  const orders = await prisma.orderInfo.findMany({
    where: {
      customerId: userId,
      status: "APPROVED",
    },
    select: {
      orderNo: true,
      Amount: true,
      restaurant: {
        select: {
          name: true,
        },
      },
      items: {
        select: {
          foodItem: {
            select: {
              title: true,
            },
          },
        },
      },
      OrderedTime: true,
    },
    take: limit,
    skip,
    orderBy: {
      OrderedTime: "desc",
    },
  });

  const data = orders.map((item) => ({
    ...item,
    Amount: Number(item.Amount),
  }));

  return {
    data,
    hasMore: skip + data.length < totalOrders,
    totalOrders,
  };
};
