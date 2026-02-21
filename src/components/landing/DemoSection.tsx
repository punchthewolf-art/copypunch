"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const demoExamples = [
  {
    id: "facebook-instagram-ad",
    label: "Pub Facebook",
    emoji: "\uD83D\uDCF1",
    input: "Application de méditation guidée pour les entrepreneurs stressés",
    output: `**Vous aussi, vous scrollez à 2h du mat' au lieu de dormir ?** \uD83D\uDE34

L'entrepreneuriat, c'est excitant. Mais on ne vous avait pas prévenu pour l'insomnie, l'anxiété et cette petite voix qui ne s'arrête jamais.

**MindFlow** transforme vos 10 minutes de pause en séance de décompression profonde.

\u2705 Méditations conçues par des neuroscientifiques
\u2705 Programmes adaptés au rythme des entrepreneurs
\u2705 Résultats dès la première semaine

*"J'ai retrouvé mes nuits. Et mes idées." — Thomas R., fondateur*

\uD83D\uDC49 **Essayez 14 jours gratuits** — votre cerveau vous remerciera.`,
  },
  {
    id: "linkedin-post",
    label: "Post LinkedIn",
    emoji: "\uD83D\uDCBC",
    input: "SaaS de gestion de projet pour équipes marketing",
    output: `J'ai passé 6 mois à chercher l'outil parfait pour mon équipe marketing.

Trello ? Trop simple.
Monday ? Trop cher.
Notion ? Trop complexe.

Puis on a découvert **MarketFlow**.

En 3 semaines :
\u2192 -40% de réunions inutiles
\u2192 +65% de projets livrés dans les temps
\u2192 Une équipe qui respire enfin

Le secret ? Un outil conçu PAR des marketeurs, POUR des marketeurs.

Pas de courbe d'apprentissage interminable.
Pas de features dont personne ne se sert.
Juste ce qu'il faut, là où il faut.

Si votre équipe marketing perd du temps à "s'organiser"...
Le problème n'est pas l'équipe. C'est l'outil.

\uD83D\uDC49 Lien en commentaire.

#Marketing #ProductivitéMarketing #SaaS #GestionDeProjet #MarketingDigital`,
  },
  {
    id: "email-marketing",
    label: "Email",
    emoji: "\uD83D\uDCE7",
    input: "Formation en ligne pour apprendre le freelancing",
    output: `**Objet :** Votre patron ne vous le dira jamais...

**Preheader :** La compétence n\u00B01 qui manque à 90% des freelances

---

Bonjour,

Il y a 2 ans, j'ai quitté mon CDI avec 0 client et 0 méthode.

Aujourd'hui ? 8 500\u20AC/mois en freelance, 4 jours par semaine.

La différence ? **Ce n'est pas le talent.**

C'est une méthode en 5 étapes que personne n'enseigne :

1. Trouver sa niche rentable (pas "sa passion")
2. Créer une offre irrésistible en 48h
3. Décrocher ses 3 premiers clients SANS réseau
4. Automatiser sa prospection
5. Passer de freelance à consultant premium

**FreelanceAccelerator** condense 2 ans d'apprentissage en 6 semaines.

\uD83C\uDF93 420 élèves formés | 94% de satisfaction | Garantie 30 jours

[DÉMARRER MA FORMATION \u2192]`,
  },
];

export default function DemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = demoExamples[activeIndex];

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Démo"
          title="Voyez la magie en action"
          subtitle="De la description au copy prêt à publier, en quelques secondes."
        />

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {demoExamples.map((example, i) => (
            <Button
              key={example.id}
              variant={activeIndex === i ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveIndex(i)}
            >
              {example.emoji} {example.label}
            </Button>
          ))}
        </div>

        {/* Demo cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-error" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-2 text-xs text-muted font-mono">
                Entrée
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-input"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-muted mb-2 uppercase tracking-wide">
                  Description du produit
                </p>
                <p className="text-sm text-foreground leading-relaxed bg-background/50 rounded-lg p-4 border border-card-border">
                  {active.input}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-xs text-muted">
                    Format:{" "}
                    <span className="text-foreground font-medium">
                      {active.label}
                    </span>
                  </span>
                  <span className="text-xs text-muted">
                    Ton:{" "}
                    <span className="text-foreground font-medium">
                      Persuasif
                    </span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Output */}
          <Card padding="lg" glow>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-2 text-xs text-accent font-mono">
                Résultat CopyPunch
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-output"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line max-h-[400px] overflow-y-auto pr-2">
                  {active.output}
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
}
