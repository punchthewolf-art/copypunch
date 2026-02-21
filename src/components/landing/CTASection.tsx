"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-card-bg to-card-bg border border-accent/20 p-8 sm:p-12 md:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-5xl mb-6 block">&#x1F94A;</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Prêt à écrire du copy
              <br />
              <span className="gradient-text">qui frappe ?</span>
            </h2>
            <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
              Rejoignez les +2 400 copywriters et entrepreneurs qui utilisent
              CopyPunch pour générer du contenu qui convertit.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="primary" href="/generateur">
                Commencer gratuitement
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <p className="text-xs text-muted">
                Gratuit. Sans carte bancaire. 5 générations/mois.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
