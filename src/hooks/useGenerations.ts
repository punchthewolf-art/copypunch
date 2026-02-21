"use client";

import { useState, useEffect, useRef } from "react";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/AuthProvider";
import type { GenerationRow } from "@/types";

export interface UseGenerationsReturn {
  generations: GenerationRow[];
  isLoading: boolean;
  error: string | null;
  addGeneration: (gen: GenerationRow) => void;
  toggleFavorite: (id: string) => void;
  deleteGeneration: (id: string) => void;
}

interface GenerationWithFavorites extends GenerationRow {
  favorites?: { id: string }[];
}

// Singleton module-level — createClient() est déjà un singleton
function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}

export function useGenerations(): UseGenerationsReturn {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<GenerationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const userId = user?.id;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const supabase = getSupabase();

      if (!supabase || (hasFetched.current && !userId)) {
        setGenerations([]);
        setIsLoading(false);
        return;
      }

      if (!userId) {
        setIsLoading(false);
        return;
      }

      hasFetched.current = true;
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("generations")
        .select("*, favorites!left(id)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Erreur lors du chargement des générations.");
        setIsLoading(false);
        return;
      }

      const mapped = ((data as GenerationWithFavorites[]) || []).map(
        (g) => ({
          id: g.id,
          user_id: g.user_id,
          content_type: g.content_type,
          input_description: g.input_description,
          input_tone: g.input_tone,
          input_custom_tone: g.input_custom_tone,
          input_cta: g.input_cta,
          output: g.output,
          created_at: g.created_at,
          is_favorite:
            Array.isArray(g.favorites) && g.favorites.length > 0,
        })
      );

      setGenerations(mapped);
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  function addGeneration(gen: GenerationRow) {
    setGenerations((prev) => [gen, ...prev]);
  }

  async function toggleFavorite(id: string) {
    const supabase = getSupabase();
    if (!userId || !supabase) return;
    const gen = generations.find((g) => g.id === id);
    if (!gen) return;

    // Optimistic update
    setGenerations((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, is_favorite: !g.is_favorite } : g
      )
    );

    if (gen.is_favorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("generation_id", id);
    } else {
      await supabase.from("favorites").insert({
        user_id: userId,
        generation_id: id,
      });
    }
  }

  async function deleteGeneration(id: string) {
    const supabase = getSupabase();
    if (!userId || !supabase) return;

    // Optimistic update
    setGenerations((prev) => prev.filter((g) => g.id !== id));

    await supabase
      .from("generations")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
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
