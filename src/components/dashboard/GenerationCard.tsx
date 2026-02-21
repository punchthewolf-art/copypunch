"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import { CONTENT_TYPES, TONES } from "@/types";
import type { GenerationRow } from "@/types";
import { copyToClipboard, formatDate, truncate } from "@/lib/utils";

interface GenerationCardProps {
  generation: GenerationRow;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GenerationCard({
  generation,
  onToggleFavorite,
  onDelete,
}: GenerationCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const contentType = CONTENT_TYPES.find((ct) => ct.id === generation.content_type);
  const tone = TONES.find((t) => t.id === generation.input_tone);

  async function handleCopy() {
    const ok = await copyToClipboard(
      generation.output,
      "Généré avec CopyPunch — copypunch.fr"
    );
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border border-card-border bg-card-bg overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">{contentType?.emoji || "📝"}</span>
          <div>
            <p className="text-sm font-medium text-foreground">
              {contentType?.label || generation.content_type}
            </p>
            <p className="text-xs text-muted">
              {tone?.emoji} {tone?.label} · {formatDate(generation.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(generation.id)}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
            title={generation.is_favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={generation.is_favorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={generation.is_favorite ? "text-red-500" : ""}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
            title="Copier"
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-success"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete(generation.id)}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-error"
            title="Supprimer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-4 py-3">
        {/* Input summary */}
        <p className="mb-2 text-xs text-muted">
          <span className="font-medium">Description :</span>{" "}
          {truncate(generation.input_description, 100)}
        </p>

        {/* Output */}
        <div
          className={`prose prose-invert max-w-none text-sm leading-relaxed ${
            !expanded ? "line-clamp-4" : ""
          }`}
        >
          <Markdown>{generation.output}</Markdown>
        </div>

        {generation.output.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
