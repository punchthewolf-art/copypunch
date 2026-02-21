import Stripe from "stripe";
import { getEnv } from "./env";

let stripeInstance: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (stripeInstance) return stripeInstance;

  const key = getEnv("STRIPE_SECRET_KEY");
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");

  stripeInstance = new Stripe(key, {
    typescript: true,
  });

  return stripeInstance;
}
