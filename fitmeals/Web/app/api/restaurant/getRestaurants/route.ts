import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";
import { RestaurantDBInput } from "@/src/types/modelTypes/restaurant/restaurant.types";
import { isRestaurantOpen } from "@/src/utils/isRestaurantOpen";
import { NextRequest, NextResponse } from "next/server";

const attachOpenStatus = (restaurants: RestaurantDBInput[]) => {
  return restaurants
    .map((r) => ({
      ...r,
      isOpen:
        r.openingTime && r.closingTime
          ? isRestaurantOpen(r.openingTime, r.closingTime)
          : false,
    }))
    .filter((r) => r.isOpen);
};

export const GET = async (req: NextRequest) => {
  try {
    const lat = req.nextUrl.searchParams.get("lat");
    const long = req.nextUrl.searchParams.get("long");

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;

    const limit = Number(req.nextUrl.searchParams.get("limit")) || 8;

    const skip = (page - 1) * limit;

    const city = req.nextUrl.searchParams.get("city");

    // FILTERS
    const cuisine = req.nextUrl.searchParams.get("Cuisine")?.split(",") || [];

    const ratings = req.nextUrl.searchParams.get("Ratings")?.split(",") || [];

    const dietary = req.nextUrl.searchParams.get("Dietary")?.split(",") || [];

    const foodPrice =
      req.nextUrl.searchParams.get("FoodPrice")?.split(",") || [];

    const capacity = req.nextUrl.searchParams.get("Capacity")?.split(",") || [];

    // DYNAMIC CONDITIONS
    let conditions = ` AND "status" = 'ACTIVE' `;

    // CUISINE
    if (cuisine.length > 0) {
      conditions += `
        AND "cuisineType" IN (
          ${cuisine.map((c) => `'${c}'`).join(",")}
        )
      `;
    }

    // RATINGS
    if (ratings.length > 0) {
      const minRating = Math.min(...ratings.map(Number));

      conditions += `
        AND "averageRating" >= ${minRating}
      `;
    }

    // FOOD PRICE
    if (foodPrice.length > 0) {
      const prices = foodPrice.filter((p) => p !== "100+").map(Number);

      if (prices.length > 0) {
        const maxPrice = Math.max(...prices);

        conditions += `
          AND "priceForTwo" <= ${maxPrice}
        `;
      }
    }

    // CAPACITY
    if (capacity.length > 0) {
      const capacities = capacity.filter((c) => c !== "10+").map(Number);

      if (capacities.length > 0) {
        const minCapacity = Math.min(...capacities);

        conditions += `
          AND "totalPersons" >= ${minCapacity}
        `;
      }
    }

    // DIETARY
    if (dietary.length > 0) {
      const dietaryConditions = dietary.map((d) => {
        if (d === "Vegetarian") {
          return `"facilities"::text ILIKE '%veg%'`;
        }

        if (d === "Vegan") {
          return `"facilities"::text ILIKE '%vegan%'`;
        }

        if (d === "Non-Vegetarian") {
          return `"facilities"::text ILIKE '%nonveg%'`;
        }

        return null;
      });

      const validDietary = dietaryConditions.filter(Boolean);

      if (validDietary.length > 0) {
        conditions += `
          AND (
            ${validDietary.join(" OR ")}
          )
        `;
      }
    }

    // CITY SEARCH
    if (city) {
      const restaurantsByCity = await prisma.$queryRaw<RestaurantDBInput[]>`
        SELECT *
        FROM "Restaurant"
        WHERE 1=1
        ${Prisma.raw(conditions)}
        AND similarity(city, ${city}) > 0.3
        ORDER BY similarity(city, ${city}) DESC
        LIMIT ${limit} OFFSET ${skip}
      `;

      const result = attachOpenStatus(restaurantsByCity);

      const hasMore = result.length === limit;

      return NextResponse.json(
        {
          data: result,
          hasMore,
          page,
          status: "Success",
        },
        { status: 200 },
      );
    }

    // COORDINATES SEARCH
    if (lat && long) {
      const restaurantsByCoords = await prisma.$queryRaw<RestaurantDBInput[]>`
        SELECT *
        FROM (
          SELECT *,
          (
            6371 * acos(
              cos(radians(${lat}::double precision))
              * cos(radians("lat"))
              * cos(radians("long") - radians(${long}::double precision))
              + sin(radians(${lat}::double precision))
              * sin(radians("lat"))
            )
          ) AS distance
          FROM "Restaurant"
          WHERE 1=1
          ${Prisma.raw(conditions)}
        ) AS nearby
        WHERE distance <= 5
        ORDER BY distance ASC
        LIMIT ${limit} OFFSET ${skip}
      `;

      const result = attachOpenStatus(restaurantsByCoords);

      const hasMore = result.length === limit;

      return NextResponse.json(
        {
          data: result,
          hasMore,
          page,
          status: "Success",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "City or coordinates required",
        status: "Failed",
      },
      { status: 400 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "An error occurred",
        status: "Failed",
      },
      { status: 500 },
    );
  }
};
