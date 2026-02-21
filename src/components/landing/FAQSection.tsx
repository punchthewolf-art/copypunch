"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "C'est quoi CopyPunch exactement ?",
    answer:
      "CopyPunch est un générateur de copywriting propulsé par l'IA. Vous décrivez votre produit ou service, vous choisissez un format (pub Facebook, email, LinkedIn, etc.) et un ton, et l'IA génère du copy professionnel et persuasif en quelques secondes.",
  },
  {
    question: "Est-ce que le copy généré est de bonne qualité ?",
    answer:
      "Oui. CopyPunch utilise un modèle d'IA avancé, spécialement paramétré pour le copywriting en français. Les textes sont naturels, percutants et utilisent les meilleures techniques de rédaction publicitaire (AIDA, PAS, storytelling, etc.).",
  },
  {
    question: "Combien de générations gratuites ai-je droit ?",
    answer:
      "Le plan gratuit vous donne 5 générations par mois avec 1 type de contenu. C'est suffisant pour tester l'outil et voir la qualité des résultats avant de passer à un plan supérieur.",
  },
  {
    question: "Est-ce que je peux annuler mon abonnement à tout moment ?",
    answer:
      "Absolument. Aucun engagement. Vous pouvez annuler votre abonnement Pro ou Business à tout moment depuis votre compte. Votre accès reste actif jusqu'à la fin de la période de facturation.",
  },
  {
    question: "Le contenu généré est-il unique ?",
    answer:
      "Oui. Chaque génération produit un texte original et unique. Le contenu n'est pas copié depuis une base de données. L'IA crée un nouveau texte à chaque fois, adapté à votre description spécifique.",
  },
  {
    question: "Dans quelles langues CopyPunch fonctionne-t-il ?",
    answer:
      "Actuellement, CopyPunch est optimisé exclusivement pour le français. C'est notre force : pas de traduction approximative, mais du copy natif, idiomatique et qui sonne juste pour le marché francophone.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-card-border last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted"
        >
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
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-card-bg/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="FAQ"
          title="Questions fréquentes"
          subtitle="Tout ce que vous devez savoir sur CopyPunch."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card-bg border border-card-border rounded-2xl px-6"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
