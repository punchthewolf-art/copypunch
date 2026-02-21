"use client";

import { motion } from "framer-motion";
import { PLAN_LIST } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Tarifs"
          title="Simple, transparent, sans surprise"
          subtitle="Commencez gratuitement. Passez à Pro quand votre copy génère des résultats."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PLAN_LIST.map((plan) => (
            <motion.div key={plan.id} variants={itemVariants}>
              <Card
                hover
                glow={plan.popular}
                padding="lg"
                className={`relative h-full flex flex-col ${
                  plan.popular ? "border-accent/40" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Le plus populaire</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price === 0 ? "0" : plan.price.toFixed(2)}
                    </span>
                    <span className="text-muted text-sm">
                      {plan.price === 0 ? "" : "\u20AC / mois"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent shrink-0 mt-0.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  fullWidth
                  size="md"
                  href={plan.id === "gratuit" ? "/generateur" : "/auth/register"}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
