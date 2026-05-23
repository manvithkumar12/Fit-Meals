"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export type RestaurantById =
  Prisma.RestaurantGetPayload<{
    select: {
      id: true;
      name: true;
      images: true;
      ownerId: true;
      cuisineType: true;
      priceForTwo: true;
      pinCode: true;
      facilities: true;
      description: true;
      openingTime: true;
      reservation: true;
      menuUrls: true;
      resUrls: true;
      reservationTime: true;
      closingTime: true;
      mapLink: true;
      phoneNumber: true;
      area: true;
      averageRating: true;
      city: true;
      houseNo: true;
      lat: true;
      long: true;
      status: true;
      agreementUrl: true;
      streetName: true;
      totalReviews: true;
      totalPersons: true;
      address: true;
    };
  }>;

export const getRestaurantById = async (
  id: number
): Promise<RestaurantById | null> => {
  try {
    return await prisma.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        images: true,
        ownerId: true,
        cuisineType: true,
        priceForTwo: true,
        pinCode: true,
        facilities: true,
        description: true,
        openingTime: true,
        reservation: true,
        menuUrls: true,
        resUrls: true,
        reservationTime: true,
        closingTime: true,
        mapLink: true,
        phoneNumber: true,
        area: true,
        averageRating: true,
        city: true,
        houseNo: true,
        lat: true,
        long: true,
        status: true,
        agreementUrl: true,
        streetName: true,
        totalReviews: true,
        totalPersons: true,
        address: true,
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
