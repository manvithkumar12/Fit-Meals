import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log("Webhook signature verification failed.", err);

    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;


    await prisma.$transaction([
      prisma.orderInfo.update({
        where: {
          orderNo: Number(orderId),
        },
        data: {
          status: "APPROVED",
        },
      }),

      prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: Number(userId),
          },
        },
      }),

      prisma.cart.deleteMany({
        where: {
          userId: Number(userId),
        },
      }),
    ]);
  }

  return NextResponse.json({ received: true });
}
