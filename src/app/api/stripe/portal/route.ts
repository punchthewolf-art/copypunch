import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";
import { getEnv } from "@/lib/env";

export async function POST() {
  try {
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

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Aucun abonnement actif." },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    const baseUrl =
      getEnv("NEXT_PUBLIC_BASE_URL") || "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${baseUrl}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'accès au portail de facturation." },
      { status: 500 }
    );
  }
}
