"use server";

import { prisma } from "@/src/lib/prisma";

export interface Restaurant {
  id: number;
  name: string;
  images: string;
  ownerId: number;

  cuisineType:
    | "INDIAN"
    | "CHINESE"
    | "ITALIAN"
    | "TURKISH"
    | "FASTFOOD"
    | string;

  priceForTwo: number;

  pinCode: string;

  facilities: string[];

  description: string[];

  openingTime: string;

  closingTime: string;

  mapLink: string;

  phoneNumber: string;

  area: string;

  averageRating: number;

  city: string;

  houseNo: string;

  lat: number;

  long: number;

  status: "ACTIVE" | "INACTIVE" | string;

  streetName: string;

  totalReviews: number;

  totalPersons: number;

  address: string;

  reservation: boolean;

  reservationTime: string[];

  menuUrls: string[];

  resUrls: string[];
}

export const searchRestaurants = async (
  searchTerm: string,
  reservation?: boolean,
): Promise<Restaurant[]> => {
  if (!searchTerm.trim()) return [];
  if (reservation) {
    const restaurants = await prisma.$queryRaw<Restaurant[]>`
    SELECT *
    FROM "Restaurant"
    WHERE similarity(LOWER(name), LOWER(${searchTerm})) > 0.2
    AND status = 'ACTIVE'
    AND reservation = true
    ORDER BY similarity(LOWER(name), LOWER(${searchTerm})) DESC
    LIMIT 20;
  `;
    return restaurants;
  } else {
    const restaurants = await prisma.$queryRaw<Restaurant[]>`
    SELECT *
    FROM "Restaurant"
    WHERE similarity(LOWER(name), LOWER(${searchTerm})) > 0.2
    AND status = 'ACTIVE'
    ORDER BY similarity(LOWER(name), LOWER(${searchTerm})) DESC
    LIMIT 20;
  `;
    return restaurants;
  }
};
