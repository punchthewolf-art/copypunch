"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GenerationCard from "@/components/dashboard/GenerationCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { useGenerations } from "@/hooks/useGenerations";
import { useUser } from "@/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";

type FilterMode = "all" | "favorites";

export default function DashboardPage() {
  const user = useUser();
  const { generations, toggleFavorite, deleteGeneration } = useGenerations();
  const [filter, setFilter] = useState<FilterMode>("all");

  const filtered =
    filter === "favorites"
      ? generations.filter((g) => g.is_favorite)
      : generations;

  const remaining = Math.max(
    0,
    user.generationsLimit + user.bonusGenerations - user.generationsUsed
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Tableau de bord
            </h1>
            <p className="mt-2 text-muted">
              Retrouvez toutes vos générations et favoris.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 grid grid-cols-3 gap-4"
          >
            <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {generations.length}
              </p>
              <p className="text-xs text-muted">Générations</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {generations.filter((g) => g.is_favorite).length}
              </p>
              <p className="text-xs text-muted">Favoris</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
              <p className={`text-2xl font-bold ${remaining <= 1 ? "text-error" : "text-foreground"}`}>
                {user.generationsLimit === -1 ? "∞" : remaining}
              </p>
              <p className="text-xs text-muted">Restantes</p>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 flex gap-2"
          >
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === "all"
                  ? "border border-accent bg-accent-light text-accent"
                  : "border border-card-border bg-card-bg text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              Tout ({generations.length})
            </button>
            <button
              onClick={() => setFilter("favorites")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === "favorites"
                  ? "border border-accent bg-accent-light text-accent"
                  : "border border-card-border bg-card-bg text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              Favoris ({generations.filter((g) => g.is_favorite).length})
            </button>
          </motion.div>

          {/* Generation List */}
          {filtered.length === 0 ? (
            <EmptyState
              title={
                filter === "favorites"
                  ? "Aucun favori"
                  : "Aucune génération"
              }
              description={
                filter === "favorites"
                  ? "Ajoutez des générations à vos favoris pour les retrouver ici."
                  : "Commencez par générer votre premier copy avec le générateur."
              }
            />
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((gen) => (
                  <GenerationCard
                    key={gen.id}
                    generation={gen}
                    onToggleFavorite={toggleFavorite}
                    onDelete={deleteGeneration}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
