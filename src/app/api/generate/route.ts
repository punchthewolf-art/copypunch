import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { CONTENT_TYPES, TONES } from "@/types";
import type { ContentTypeId, GenerateRequest, GenerateResponse, GenerateErrorResponse } from "@/types";

const MAX_DESCRIPTION_LENGTH = 2000;

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse | GenerateErrorResponse>> {
  try {
    // Parse body
    const body = (await req.json()) as GenerateRequest;
    const { description, contentType, tone, cta } = body;

    // Validate description
    if (!description || typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json({ error: "La description est requise." }, { status: 400 });
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return NextResponse.json(
        { error: `La description ne doit pas depasser ${MAX_DESCRIPTION_LENGTH} caracteres.` },
        { status: 400 }
      );
    }

    // Validate content type
    const validContentType = CONTENT_TYPES.some((ct) => ct.id === contentType);
    if (!validContentType) {
      return NextResponse.json({ error: "Type de contenu invalide." }, { status: 400 });
    }

    // Validate tone
    const validTone = TONES.some((t) => t.id === tone);
    if (!validTone) {
      return NextResponse.json({ error: "Ton invalide." }, { status: 400 });
    }

    // Get Claude client
    const client = getAnthropicClient();
    if (!client) {
      return NextResponse.json(
        { error: "Erreur de configuration API. Contactez le support." },
        { status: 500 }
      );
    }

    // Get tone label for the prompt
    const toneLabel = TONES.find((t) => t.id === tone)?.label || tone;

    // Build prompt
    const userPrompt = buildUserPrompt(
      contentType as ContentTypeId,
      description.trim(),
      toneLabel,
      cta?.trim() || undefined
    );

    // Call Claude API
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Extract text from response
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Reponse invalide de l'IA. Reessayez." },
        { status: 500 }
      );
    }

    const result = textBlock.text;

    // TODO Phase 2: save generation to Supabase
    // TODO Phase 2: check usage limits

    return NextResponse.json({ result } satisfies GenerateResponse);
  } catch (error: unknown) {
    console.error("Generation error:", error);

    // Handle Anthropic API errors
    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as { status: number; message?: string };
      if (apiError.status === 429) {
        return NextResponse.json(
          { error: "Trop de requetes. Veuillez patienter quelques secondes." },
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
      { error: "Une erreur est survenue lors de la generation." },
      { status: 500 }
    );
  }
}
