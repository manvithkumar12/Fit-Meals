import { prisma } from "@/src/lib/prisma";

export const getCookbooks = async (page = 1, limit = 9) => {
  try {
    const data = await prisma.cookBook.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    return {
      data,
      page,
      limit,
      hasMore: data.length === limit,
      error: false
    };
  } catch (error) {
    return {
      data: [],
      page,
      limit,
      hasMore: false,
      error: true
    };
  }
};

export const getCookbooksById = async (itemId: number) => {
  try {
    const cookbookData = await prisma.cookBook.findUnique({
      where: { id: itemId },
      include: {
        FoodIngredients: true,
      },
    });
    return cookbookData;
  } catch {
    return null;
  }
};
