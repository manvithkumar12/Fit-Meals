import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ foodName: string }> },
) => {
  try {
    const { foodName } = await params;
    const name = foodName;
    const refinedName = name.toLowerCase();
    const foods: [] = await prisma.$queryRawUnsafe(
      `
      SELECT foodname, energy, protein, fat, carbohydrate, salt
      FROM german_foods
      WHERE foodname % $1
      ORDER BY similarity(foodname, $1) DESC
      LIMIT 6
      `,
      refinedName,
    );
    if (foods.length === 0) {
      return NextResponse.json(
        { message: "Sorry no data available", state: "Failed" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: foods,
        state: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occured while fetching",
        state: "Failed",
      },
      { status: 500 },
    );
  }
};
