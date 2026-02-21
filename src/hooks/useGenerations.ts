"use client";

import { useState } from "react";
import type { GenerationRow } from "@/types";

// Phase 1 stub — local state only
// Phase 2 will fetch from Supabase

export interface UseGenerationsReturn {
  generations: GenerationRow[];
  isLoading: boolean;
  error: string | null;
  addGeneration: (gen: GenerationRow) => void;
  toggleFavorite: (id: string) => void;
  deleteGeneration: (id: string) => void;
}

export function useGenerations(): UseGenerationsReturn {
  const [generations, setGenerations] = useState<GenerationRow[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  function addGeneration(gen: GenerationRow) {
    setGenerations((prev) => [gen, ...prev]);
  }

  function toggleFavorite(id: string) {
    setGenerations((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, is_favorite: !g.is_favorite } : g
      )
    );
  }

  function deleteGeneration(id: string) {
    setGenerations((prev) => prev.filter((g) => g.id !== id));
  }

  return {
    generations,
    isLoading,
    error,
    addGeneration,
    toggleFavorite,
    deleteGeneration,
  };
}
