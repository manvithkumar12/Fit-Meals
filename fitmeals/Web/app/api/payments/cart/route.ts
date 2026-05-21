import Stripe from "stripe";
import { isLoggedIn } from "@/src/middleware/isLogged";
import { NextRequest, NextResponse } from "next/server";
import { getOrderId } from "../../actions/orders/createOrder";
import { getTotal } from "../../actions/cart/TotalPrice";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = isLoggedIn(
  async (
    req: NextRequest,
    user,
    ctx?: { params: Promise<Record<string, string>> },
  ): Promise<NextResponse> => {
    try {
      const { searchParams } = new URL(req.url);
      const paramOrderId = searchParams.get("orderId");
      let orderId: number;

      const paramOrderIdNum = paramOrderId ? Number(paramOrderId) : undefined;

      if (paramOrderIdNum) {
        orderId = paramOrderIdNum;
      } else {
        const createdOrderId = await getOrderId(user.id);
        if (!createdOrderId) {
          return NextResponse.json({ message: "Order creation failed" });
        }
        orderId = createdOrderId;
      }

      const TotalAmount = await getTotal(user.id);
      if (!TotalAmount)
        return NextResponse.json({ message: "An error occured" });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "FitMeals Order",
              },
              unit_amount: Math.round(Number(TotalAmount.NumTotalPrice) * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          orderId: String(orderId),
          userId: String(user.id),
        },
        success_url: `${process.env.FRONTEND_URL}/status/${orderId}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
      });
      return NextResponse.json({
        url: session.url,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: "Stripe session failed",
      });
    }
  },
);
