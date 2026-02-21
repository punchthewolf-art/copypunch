"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Aucune génération pour le moment",
  description = "Commencez par générer votre premier copy avec le générateur.",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border bg-card-bg/50 px-6 py-16 text-center"
    >
      <div className="mb-4 text-4xl">📝</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      <a
        href="/generateur"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Aller au générateur
      </a>
    </motion.div>
  );
}
