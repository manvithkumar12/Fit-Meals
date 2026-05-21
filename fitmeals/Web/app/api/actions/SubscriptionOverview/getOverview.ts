import { prisma } from "@/src/lib/prisma";

export const getOverview = async (userId: number) => {
  const overview = await prisma.subscriptionData.findUnique({
    where: { userId },
    select: {
      OrdersPlaced: true,
      currentPeriodEnd: true,
      status: true,
      createdAt: true,
      planType: true,
      freeOrders: true,
    },
  });
  return overview;
};
