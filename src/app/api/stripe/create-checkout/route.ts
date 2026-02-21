import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";
import { getEnv } from "@/lib/env";
import type { PlanType } from "@/types";

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    // Parse plan from body
    const { plan } = (await req.json()) as { plan: string };

    // Map plan to Stripe price ID
    const priceMap: Record<string, string | undefined> = {
      pro: getEnv("STRIPE_PRO_PRICE_ID"),
      business: getEnv("STRIPE_BUSINESS_PRICE_ID"),
    };

    const priceId = priceMap[plan];
    if (!priceId) {
      return NextResponse.json(
        { error: "Plan invalide." },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email || "",
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const baseUrl =
      getEnv("NEXT_PUBLIC_BASE_URL") || "http://localhost:3000";

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/tarifs?checkout=cancel`,
      locale: "fr",
      metadata: {
        supabase_user_id: user.id,
        plan: plan as PlanType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
