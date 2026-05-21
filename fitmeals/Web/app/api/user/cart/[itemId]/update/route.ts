import { updateCartItem } from "@/src/models/user/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ itemId: string }> },
) => {
  try {
    const newquantity = req.nextUrl.searchParams.get("quantity");

    const { itemId } = await context.params;
    const numericItemId = Number(itemId);
    await updateCartItem(numericItemId, Number(newquantity));
    return NextResponse.json(
      {
        message: "decreased Successfully",
        state: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occured",
        state: "Failed",
      },
      { status: 500 },
    );
  }
};
