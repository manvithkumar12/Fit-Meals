import { RestaurantDBInput } from "@/src/types/modelTypes/restaurant/restaurant.types";
import { prisma } from "@/src/lib/prisma";

export const createRestaurant = async (restaurant: RestaurantDBInput) => {
  return await prisma.restaurant.create({
    data: restaurant,
  });
};

export const isRestaurant = async (id: number) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    select: { id: true, totalPersons: true },
  });

  return {
    isValid: !!restaurant,
    totalPersons: restaurant?.totalPersons ?? 0,
  };
};
