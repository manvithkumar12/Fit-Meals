import { isLoggedIn } from "@/src/middleware/isLogged";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
type SubscriptionType = "STARTER" | "PLUS" | "PREMIUM";
type Range = "monthly" | "yearly";
const priceMap = {
  STARTER: {
    monthly: "price_1TCLtxI14PWOE5da429AKtij",
    yearly: "price_1TCLunI14PWOE5dazGeQojxt",
  },
  PLUS: {
    monthly: "price_1TCLwwI14PWOE5dacXO2kqdP",
    yearly: "price_1TCLxgI14PWOE5daWfkv4nNf",
  },
  PREMIUM: {
    monthly: "price_1TCLyUI14PWOE5dapwIWowEx",
    yearly: "price_1TCLypI14PWOE5daAnOSx8rh",
  },
};
export const POST = isLoggedIn(
  async (
    req: NextRequest,
    user,
    ctx?: { params: Promise<Record<string, string>> },
  ) => {
    try {
      const userId = user.id;
      if (!userId) {
        return NextResponse.json(
          {
            message: "Please login first",
            state: "Failed",
          },
          { status: 401 },
        );
      }
      const { searchParams } = new URL(req.url);
      const subscriptionTypeRaw = searchParams.get("type");
      const billingRangeRaw = searchParams.get("range");

      if (
        !subscriptionTypeRaw ||
        !billingRangeRaw ||
        !["STARTER", "PLUS", "PREMIUM"].includes(subscriptionTypeRaw) ||
        !["monthly", "yearly"].includes(billingRangeRaw)
      ) {
        return NextResponse.json(
          {
            message: "Invalid subscription type or range",
            state: "Failed",
          },
          { status: 400 },
        );
      }

      const subscriptionType = subscriptionTypeRaw as SubscriptionType;
      const billingRange = billingRangeRaw as Range;
      const selectedPrice = priceMap[subscriptionType]?.[billingRange];
      if (!selectedPrice) {
        return NextResponse.json(
          {
            message: "Invalid pricing configuration",
            state: "Failed",
          },
          { status: 400 },
        );
      }
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { message: "Stripe key missing", state: "Failed" },
          { status: 500 },
        );
      }
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: selectedPrice,
            quantity: 1,
          },
        ],
        metadata: {
          userId: String(user.id),
          subscriptionType: subscriptionType,
          billingRange: billingRange,
        },
        success_url: `${process.env.FRONTEND_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/menu/${subscriptionType.toLowerCase()}`,
      });
      return NextResponse.json({
        url: session.url,
      });
    } catch (error) {
      console.error("Stripe subscription error:", error);
      return NextResponse.json(
        {
          message: "An error occured",
          state: "Failed",
        },
        { status: 500 },
      );
    }
  },
);
