import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getEnv } from "@/lib/env";
import type { PlanType } from "@/types";

function getPlanFromPriceId(priceId: string): PlanType {
  const proPriceId = getEnv("STRIPE_PRO_PRICE_ID");
  const businessPriceId = getEnv("STRIPE_BUSINESS_PRICE_ID");

  if (priceId === proPriceId) return "pro";
  if (priceId === businessPriceId) return "business";
  return "gratuit";
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = getEnv("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  const stripe = getStripeClient();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id;

      if (!userId || !session.subscription) break;

      // Fetch subscription to get price ID
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const priceId = subscription.items.data[0]?.price.id;
      const plan = getPlanFromPriceId(priceId || "");

      await supabase
        .from("profiles")
        .update({
          plan,
          stripe_customer_id: session.customer as string,
        })
        .eq("id", userId);

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;
      const priceId = subscription.items.data[0]?.price.id;
      const plan = getPlanFromPriceId(priceId || "");

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId);

      if (profiles && profiles.length > 0) {
        await supabase
          .from("profiles")
          .update({ plan })
          .eq("id", profiles[0].id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId);

      if (profiles && profiles.length > 0) {
        await supabase
          .from("profiles")
          .update({ plan: "gratuit" as PlanType })
          .eq("id", profiles[0].id);
      }
      break;
    }

    case "invoice.payment_failed": {
      console.warn(
        "Payment failed for invoice:",
        event.data.object.id
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}
