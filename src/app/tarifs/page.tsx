"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/landing/PricingSection";
import { motion } from "framer-motion";

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Tarifs simples et{" "}
              <span className="gradient-text">transparents</span>
            </h1>
            <p className="mt-3 text-lg text-muted">
              Commencez gratuitement. Passez à Pro quand vous êtes prêt.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <PricingSection />

          {/* FAQ-like trust section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Questions fréquentes sur les tarifs
              </h2>
              <div className="space-y-3 text-left">
                <div className="rounded-lg border border-card-border bg-card-bg p-4">
                  <p className="text-sm font-medium text-foreground">
                    Puis-je changer de plan à tout moment ?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Oui, vous pouvez upgrader ou downgrader à tout moment.
                    Le changement est effectif immédiatement.
                  </p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-4">
                  <p className="text-sm font-medium text-foreground">
                    Y a-t-il un engagement ?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Non, aucun engagement. Vous pouvez annuler à tout moment
                    depuis votre espace client.
                  </p>
                </div>
                <div className="rounded-lg border border-card-border bg-card-bg p-4">
                  <p className="text-sm font-medium text-foreground">
                    Que se passe-t-il si j&apos;atteins ma limite gratuite ?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Vous serez invité à passer au plan Pro pour continuer
                    à générer du contenu. Vos générations existantes restent accessibles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
