import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import prisma from "@/src/config/prismaClient";
import { S_Type } from "@prisma/client";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getFreeOrders = (subscriptionType?: string) => {
  const map: Record<string, number> = {
    STARTER: 1,
    PLUS: 3,
    PREMIUM: 5,
  };
  return map[subscriptionType || ""] ?? 0;
};

const handleCheckoutCompleted = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.userId;
  const subscriptionType = session.metadata?.subscriptionType;
  const planType = session.metadata?.billingRange;

  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  if (
    !userId ||
    !subscriptionId ||
    !customerId ||
    !subscriptionType ||
    !planType
  )
    return;

  const freeOrders = getFreeOrders(subscriptionType);
  const currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await prisma.subscriptionData.upsert({
    where: { userId: Number(userId) },
    update: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      status: "ACTIVE",
      DaysRemaining: 30,
      currentPeriodEnd,
      planType,
      freeOrders,
    },
    create: {
      userId: Number(userId),
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      status: "ACTIVE",
      DaysRemaining: 30,
      currentPeriodEnd,
      planType,
      freeOrders,
    },
  });
  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      subscriptionsType: subscriptionType as S_Type,
    },
  });
};

const extractSubscriptionId = (invoice: Stripe.Invoice) => {
  const sub = (invoice as any).subscription;
  return typeof sub === "string" ? sub : sub?.id;
};

const handleInvoicePaid = async (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = extractSubscriptionId(invoice);

  const sub = await prisma.subscriptionData.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!sub) return;

  await prisma.subscriptionData.update({
    where: { id: sub.id },
    data: {
      status: "ACTIVE",
      DaysRemaining: sub.DaysRemaining + 30,
    },
  });
};

const handlePaymentFailed = async (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = extractSubscriptionId(invoice);

  await prisma.subscriptionData.updateMany({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: "PAST_DUE" },
  });
};

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_SUB!,
    );
    console.log("Webhook received:", event.type);
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event);
      break;
    case "invoice.paid":
      await handleInvoicePaid(event);
      break;
    case "invoice.payment_failed":
      await handlePaymentFailed(event);
      break;
  }

  return NextResponse.json({ received: true });
};
