"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GeneratorForm from "@/components/generator/GeneratorForm";
import { motion } from "framer-motion";

export default function GenerateurPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Générateur de{" "}
              <span className="gradient-text">copy</span>
            </h1>
            <p className="mt-3 text-muted">
              Décrivez votre produit, choisissez le format et le ton.
              L&apos;IA fait le reste.
            </p>
          </motion.div>

          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <GeneratorForm />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
