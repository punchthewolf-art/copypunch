"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const floatingWords = [
  { text: "Accroche", x: "10%", y: "20%", delay: 0 },
  { text: "CTA", x: "85%", y: "15%", delay: 0.5 },
  { text: "Conversion", x: "75%", y: "75%", delay: 1 },
  { text: "Persuasion", x: "5%", y: "70%", delay: 1.5 },
  { text: "Impact", x: "50%", y: "85%", delay: 0.8 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-light)_0%,_transparent_70%)]" />

      {/* Floating words */}
      {floatingWords.map((word) => (
        <motion.span
          key={word.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: word.delay, duration: 1 },
            y: { delay: word.delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute text-sm font-medium text-accent pointer-events-none select-none hidden md:block"
          style={{ left: word.x, top: word.y }}
        >
          {word.text}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" animated>
            Propulsé par l&apos;IA Claude
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
        >
          Du copy qui{" "}
          <span className="gradient-text">frappe fort</span>
          <br />
          en un clic.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Décrivez votre produit, choisissez un format, et obtenez du
          copywriting professionnel et persuasif en quelques secondes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" variant="primary" href="/generateur">
            Générer mon premier copy
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
          <Button size="lg" variant="outline" href="/#formats">
            Voir une démo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-card-border border-2 border-background flex items-center justify-center text-xs text-muted"
              >
                {String.fromCodePoint(0x1f600 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted">
            <span className="text-foreground font-semibold">+2 400</span>{" "}
            copywriters utilisent déjà CopyPunch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
