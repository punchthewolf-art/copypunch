"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GenerationCard from "@/components/dashboard/GenerationCard";
import EmptyState from "@/components/dashboard/EmptyState";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useGenerations } from "@/hooks/useGenerations";
import { useUser } from "@/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";

type FilterMode = "all" | "favorites";

export default function DashboardPage() {
  const user = useUser();
  const { generations, isLoading, toggleFavorite, deleteGeneration } =
    useGenerations();
  const [filter, setFilter] = useState<FilterMode>("all");
  const [portalLoading, setPortalLoading] = useState(false);

  const filtered =
    filter === "favorites"
      ? generations.filter((g) => g.is_favorite)
      : generations;

  const remaining = Math.max(
    0,
    user.generationsLimit + user.bonusGenerations - user.generationsUsed
  );

  async function handleBillingPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Portal error:", error);
    } finally {
      setPortalLoading(false);
    }
  }

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
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Tableau de bord
                  </h1>
                  <Badge variant="default">
                    {user.plan.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-muted">
                  Retrouvez toutes vos générations et favoris.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {user.plan !== "gratuit" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    isLoading={portalLoading}
                    onClick={handleBillingPortal}
                  >
                    Gérer l&apos;abonnement
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Upsell Banner for Free Plan */}
          {user.plan === "gratuit" && !user.isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  Passez à Pro pour des générations illimitées
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Plus de limites, plus de types de contenu, sans
                  filigrane.
                </p>
              </div>
              <Link
                href="/tarifs"
                className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Voir les tarifs
              </Link>
            </motion.div>
          )}

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
              <p
                className={`text-2xl font-bold ${
                  remaining <= 1 ? "text-error" : "text-foreground"
                }`}
              >
                {user.generationsLimit === -1 ? "\u221E" : remaining}
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
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                filter === "all"
                  ? "border border-accent bg-accent-light text-accent"
                  : "border border-card-border bg-card-bg text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              Tout ({generations.length})
            </button>
            <button
              onClick={() => setFilter("favorites")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                filter === "favorites"
                  ? "border border-accent bg-accent-light text-accent"
                  : "border border-card-border bg-card-bg text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              Favoris (
              {generations.filter((g) => g.is_favorite).length})
            </button>
          </motion.div>

          {/* Generation List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Chargement...
              </div>
            </div>
          ) : filtered.length === 0 ? (
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
