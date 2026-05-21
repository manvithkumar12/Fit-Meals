"use server";

import { prisma } from "@/src/lib/prisma";
export type RiderDataType = {
  id: number;
  lat: number;
  long: number;
  title: string;
  deliveredOrders: number;

  user: {
    phoneNumber: string | null;
    name: string;
  };
};
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const availableRiders = async (restaurantId: number) => {
  try {
    const restaurantData = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
      select: {
        lat: true,
        long: true,
      },
    });

    if (!restaurantData) {
      throw new Error("Restaurant not found");
    }

    if (restaurantData.lat == null || restaurantData.long == null) {
      throw new Error("Restaurant location not found");
    }

    const restaurantLat = restaurantData.lat;
    const restaurantLong = restaurantData.long;

    const riderData = await prisma.deliveryPartner.findMany({
      where: {
        partnerstatus: "IDLE",
        status:"ACTIVE",
        
        user: {
          status: "ACTIVE",
        },
      },
      select: {
        id: true,
        lat: true,
        user: {
          select: {
            phoneNumber: true,
            name: true,
          },
        },
        long: true,
        title: true,
        deliveredOrders: true,
      },
    });

    const nearbyRiders: RiderDataType[] = riderData.filter((rider) => {
      if (rider.lat == null || rider.long == null) return false;

      const distance = calculateDistance(
        restaurantLat,
        restaurantLong,
        rider.lat,
        rider.long,
      );

      return distance <= 15;
    });

    return nearbyRiders;
  } catch (err) {
    console.log(err);
  }
};
