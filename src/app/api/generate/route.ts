import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { CONTENT_TYPES, TONES } from "@/types";
import { createClient } from "@/lib/supabase/server";
import type {
  ContentTypeId,
  GenerateRequest,
  GenerateResponse,
  GenerateErrorResponse,
} from "@/types";

const MAX_DESCRIPTION_LENGTH = 2000;

export async function POST(
  req: NextRequest
): Promise<NextResponse<GenerateResponse | GenerateErrorResponse>> {
  try {
    // ── Auth check ──
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour générer du contenu." },
        { status: 401 }
      );
    }

    // ── Fetch profile & check limits ──
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: "Profil introuvable. Reconnectez-vous." },
        { status: 401 }
      );
    }

    // Reset mensuel si nécessaire
    const periodStart = new Date(profile.current_period_start);
    const now = new Date();
    if (
      periodStart.getMonth() !== now.getMonth() ||
      periodStart.getFullYear() !== now.getFullYear()
    ) {
      await supabase
        .from("profiles")
        .update({
          generations_used_this_month: 0,
          current_period_start: new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          ).toISOString(),
        })
        .eq("id", user.id);
      profile.generations_used_this_month = 0;
    }

    // Vérifier limite pour plan gratuit
    if (profile.plan === "gratuit") {
      const limit = 5 + (profile.bonus_generations || 0);
      if (profile.generations_used_this_month >= limit) {
        return NextResponse.json(
          {
            error:
              "Limite de générations atteinte ce mois-ci. Passez à Pro pour un accès illimité.",
          },
          { status: 403 }
        );
      }
    }

    // ── Parse & validate body ──
    const body = (await req.json()) as GenerateRequest;
    const { description, contentType, tone, cta } = body;

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "La description est requise." },
        { status: 400 }
      );
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return NextResponse.json(
        {
          error: `La description ne doit pas dépasser ${MAX_DESCRIPTION_LENGTH} caractères.`,
        },
        { status: 400 }
      );
    }

    const validContentType = CONTENT_TYPES.some(
      (ct) => ct.id === contentType
    );
    if (!validContentType) {
      return NextResponse.json(
        { error: "Type de contenu invalide." },
        { status: 400 }
      );
    }

    const validTone = TONES.some((t) => t.id === tone);
    if (!validTone) {
      return NextResponse.json({ error: "Ton invalide." }, { status: 400 });
    }

    // ── Claude API ──
    const client = getAnthropicClient();
    if (!client) {
      return NextResponse.json(
        { error: "Erreur de configuration API. Contactez le support." },
        { status: 500 }
      );
    }

    const toneLabel = TONES.find((t) => t.id === tone)?.label || tone;

    const userPrompt = buildUserPrompt(
      contentType as ContentTypeId,
      description.trim(),
      toneLabel,
      cta?.trim() || undefined
    );

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Réponse invalide de l'IA. Réessayez." },
        { status: 500 }
      );
    }

    const result = textBlock.text;

    // ── Save generation to DB ──
    const { data: genRow } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        content_type: contentType,
        input_description: description.trim(),
        input_tone: tone,
        input_custom_tone: null,
        input_cta: cta?.trim() || null,
        output: result,
      })
      .select("id")
      .single();

    // ── Increment usage counter ──
    await supabase
      .from("profiles")
      .update({
        generations_used_this_month:
          profile.generations_used_this_month + 1,
      })
      .eq("id", user.id);

    return NextResponse.json({
      result,
      generationId: genRow?.id,
    } satisfies GenerateResponse);
  } catch (error: unknown) {
    console.error("Generation error:", error);

    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as { status: number; message?: string };
      if (apiError.status === 429) {
        return NextResponse.json(
          {
            error:
              "Trop de requêtes. Veuillez patienter quelques secondes.",
          },
          { status: 429 }
        );
      }
      if (apiError.status === 401) {
        return NextResponse.json(
          { error: "Erreur d'authentification API." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération." },
      { status: 500 }
    );
  }
}
