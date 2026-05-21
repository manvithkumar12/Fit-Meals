"use server";

import { prisma } from "@/src/lib/prisma";
import { CookbookDataProps } from "@/src/query/search/useCookbookSearch";
import { Prisma } from "@prisma/client";

export const searchItems = async (query: string) => {
  if (!query.trim()) {
    return {
      data: [],
    };
  }

  const data = await prisma.$queryRaw<CookbookDataProps[]>(Prisma.sql`
    SELECT *,
           similarity(title, ${query}) AS score
    FROM "CookBook"
    WHERE title % ${query}
    ORDER BY score DESC
    LIMIT 9;
  `);

  return {
    data,
  };
};
