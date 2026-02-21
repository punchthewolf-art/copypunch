// ─── Types de contenu (10) ───
export const CONTENT_TYPES = [
  { id: "facebook-instagram-ad", label: "Publicité Facebook/Instagram", emoji: "📱", description: "Court, accrocheur, avec CTA" },
  { id: "email-marketing", label: "Email marketing", emoji: "📧", description: "Objet + corps persuasif" },
  { id: "landing-hero", label: "Landing page hero", emoji: "🚀", description: "Titre + sous-titre + CTA" },
  { id: "linkedin-post", label: "Post LinkedIn", emoji: "💼", description: "Professionnel et engageant" },
  { id: "fiche-produit", label: "Fiche produit e-commerce", emoji: "🛍️", description: "Descriptif qui convertit" },
  { id: "tweet-thread", label: "Tweet / Thread Twitter", emoji: "🐦", description: "Court et viral" },
  { id: "script-youtube", label: "Script vidéo YouTube", emoji: "🎬", description: "Hook + intro + structure" },
  { id: "bio-instagram-tiktok", label: "Bio Instagram / TikTok", emoji: "✨", description: "Bio percutante en 150 car." },
  { id: "slogan-tagline", label: "Slogan / Tagline", emoji: "💡", description: "Mémorable et impactant" },
  { id: "google-ads", label: "Google Ads", emoji: "🔍", description: "Titres + descriptions optimisés" },
] as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];

// ─── Tons (7) ───
export const TONES = [
  { id: "professionnel", label: "Professionnel", emoji: "💼" },
  { id: "decontracte", label: "Décontracté", emoji: "☕" },
  { id: "persuasif", label: "Persuasif", emoji: "🎯" },
  { id: "urgent", label: "Urgent", emoji: "⚡" },
  { id: "inspirant", label: "Inspirant", emoji: "✨" },
  { id: "humoristique", label: "Humoristique", emoji: "😄" },
  { id: "luxe", label: "Luxe / Premium", emoji: "👑" },
] as const;

export type ToneId = (typeof TONES)[number]["id"];

// ─── Plans ───
export type PlanType = "gratuit" | "pro" | "business";

export interface PlanConfig {
  id: PlanType;
  name: string;
  price: number;
  generationsPerMonth: number;
  contentTypesAllowed: number;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const PLANS: Record<PlanType, PlanConfig> = {
  gratuit: {
    id: "gratuit",
    name: "Gratuit",
    price: 0,
    generationsPerMonth: 5,
    contentTypesAllowed: 1,
    features: [
      "5 générations par mois",
      "1 type de contenu",
      "Filigrane CopyPunch",
    ],
    cta: "Commencer gratuitement",
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 9.99,
    generationsPerMonth: -1,
    contentTypesAllowed: -1,
    features: [
      "Générations illimitées",
      "10 types de contenu",
      "Ton personnalisé",
      "Historique complet",
      "Sans filigrane",
    ],
    cta: "Passer à Pro",
    popular: true,
  },
  business: {
    id: "business",
    name: "Business",
    price: 29.99,
    generationsPerMonth: -1,
    contentTypesAllowed: -1,
    features: [
      "Tout le plan Pro",
      "Voix de marque personnalisée",
      "Export en masse",
      "Accès API",
      "Support prioritaire",
    ],
    cta: "Passer à Business",
  },
};

export const PLAN_LIST: PlanConfig[] = [PLANS.gratuit, PLANS.pro, PLANS.business];

// ─── API Types ───
export interface GenerateRequest {
  description: string;
  contentType: ContentTypeId;
  tone: ToneId;
  customTone?: string;
  cta?: string;
}

export interface GenerateResponse {
  result: string;
  generationId?: string;
}

export interface GenerateErrorResponse {
  error: string;
}

// ─── Database Row Types (for Phase 2) ───
export interface UserRow {
  id: string;
  email: string;
  plan: PlanType;
  stripe_customer_id: string | null;
  referral_code: string;
  referred_by: string | null;
  bonus_generations: number;
  created_at: string;
}

export interface GenerationRow {
  id: string;
  user_id: string;
  content_type: ContentTypeId;
  input_description: string;
  input_tone: ToneId;
  input_custom_tone: string | null;
  input_cta: string | null;
  output: string;
  created_at: string;
  is_favorite?: boolean;
}

export interface FavoriteRow {
  id: string;
  user_id: string;
  generation_id: string;
  created_at: string;
}
