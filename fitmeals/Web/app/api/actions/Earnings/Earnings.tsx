"use server";

import { prisma } from "@/src/lib/prisma";

export type RecentOrderType = {
  orderNo: number;
  Amount: number;
  OrderedTime: Date;
};
export type EarningsDataType = {
  today: number;
  week: number;
  recentOrders: RecentOrderType[];
  startOfWeek: Date;
  endOfToday: Date;
};

export const getEarningsData = async (restaurantId: number) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const recentOrdersRaw = await prisma.orderInfo.findMany({
    where: {
      restaurantId,
      status: "APPROVED",
      OrderedTime: {
        gte: startOfToday,
        lt: endOfToday,
      },
    },
    select: {
      orderNo: true,
      OrderedTime: true,
      Amount: true,
    },
  });

  const recentOrders = recentOrdersRaw.map((order) => ({
    ...order,
    Amount: Number(order.Amount),
  }));

  const [todayEarnings, weekEarnings] = await Promise.all([
    prisma.orderInfo.aggregate({
      where: {
        restaurantId,
        status: "APPROVED",
        OrderedTime: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
      _sum: {
        Amount: true,
      },
    }),

    prisma.orderInfo.aggregate({
      where: {
        restaurantId,
        status: "APPROVED",
        OrderedTime: {
          gte: startOfWeek,
          lt: endOfToday,
        },
      },
      _sum: {
        Amount: true,
      },
    }),
  ]);

  return {
    today: Number(todayEarnings._sum.Amount || 0),
    week: Number(weekEarnings._sum.Amount || 0),
    recentOrders,
    startOfWeek,
    endOfToday,
  };
};
