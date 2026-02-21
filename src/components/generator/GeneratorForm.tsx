"use client";

import { useState } from "react";
import type { ContentTypeId, ToneId, GenerateResponse, GenerateErrorResponse } from "@/types";
import { getCharacterInfo } from "@/lib/utils";
import ContentTypeSelector from "./ContentTypeSelector";
import ToneSelector from "./ToneSelector";
import ResultDisplay from "./ResultDisplay";

const MAX_CHARS = 2000;

export default function GeneratorForm() {
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<ContentTypeId>("facebook-instagram-ad");
  const [tone, setTone] = useState<ToneId>("professionnel");
  const [cta, setCta] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const charInfo = getCharacterInfo(description, MAX_CHARS);
  const canSubmit = description.trim().length > 0 && !charInfo.isOver && !isLoading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          contentType,
          tone,
          cta: cta.trim() || undefined,
        }),
      });

      const data: GenerateResponse | GenerateErrorResponse = await res.json();

      if (!res.ok || "error" in data) {
        setError((data as GenerateErrorResponse).error || "Une erreur est survenue.");
      } else {
        setResult((data as GenerateResponse).result);
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-muted"
          >
            Décrivez votre produit ou service
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex : Une application mobile de méditation guidée pour les entrepreneurs stressés..."
            rows={4}
            disabled={isLoading}
            className="w-full resize-y rounded-lg border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder-muted/50 transition-colors focus:border-accent focus:outline-none disabled:opacity-50"
          />
          <div className="mt-1 flex justify-end">
            <span
              className={`text-xs ${
                charInfo.isOver
                  ? "text-error"
                  : charInfo.isNearLimit
                  ? "text-yellow-500"
                  : "text-muted"
              }`}
            >
              {charInfo.count.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content Type */}
        <ContentTypeSelector
          selected={contentType}
          onChange={setContentType}
          disabled={isLoading}
        />

        {/* Tone */}
        <ToneSelector selected={tone} onChange={setTone} disabled={isLoading} />

        {/* CTA optionnel */}
        <div>
          <label htmlFor="cta" className="mb-2 block text-sm font-medium text-muted">
            Appel à l&apos;action souhaité{" "}
            <span className="text-muted/60">(optionnel)</span>
          </label>
          <input
            id="cta"
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder='Ex : "Essayez gratuitement", "Achetez maintenant"...'
            disabled={isLoading}
            className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder-muted/50 transition-colors focus:border-accent focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="glow-button flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center gap-1">
              <span className="loading-dot inline-block h-2 w-2 rounded-full bg-white" />
              <span className="loading-dot inline-block h-2 w-2 rounded-full bg-white" />
              <span className="loading-dot inline-block h-2 w-2 rounded-full bg-white" />
            </span>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Générer
            </>
          )}
        </button>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted">
          <span className="loading-dot inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="loading-dot inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="loading-dot inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="ml-2">Génération en cours...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      {/* Result */}
      {result && !isLoading && <ResultDisplay result={result} />}
    </div>
  );
}
