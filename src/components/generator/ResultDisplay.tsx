"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import { copyToClipboard, getShareUrl } from "@/lib/utils";

interface ResultDisplayProps {
  result: string;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(
      result,
      "Généré avec CopyPunch — copypunch.fr"
    );
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-card-border bg-card-bg"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border px-5 py-3">
        <h3 className="text-sm font-medium text-muted">Résultat</h3>
        <div className="flex items-center gap-2">
          {/* Favorite */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={isFavorite ? "text-red-500" : ""}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          {/* Share Twitter */}
          <a
            href={getShareUrl("twitter", result)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
            title="Partager sur Twitter"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Share LinkedIn */}
          <a
            href={getShareUrl("linkedin", result)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
            title="Partager sur LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-muted hover:text-foreground"
          >
            {copied ? (
              <>
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
                <span className="text-success">Copié !</span>
              </>
            ) : (
              <>
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
                Copier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none p-5 text-sm leading-relaxed">
        <Markdown>{result}</Markdown>
      </div>
    </motion.div>
  );
}
