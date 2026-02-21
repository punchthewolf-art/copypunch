"use client";

import { motion } from "framer-motion";
import { CONTENT_TYPES } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function FormatsSection() {
  return (
    <section id="formats" className="py-24 sm:py-32 bg-card-bg/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="10 Formats"
          title="Un format pour chaque canal"
          subtitle="Du post LinkedIn au script YouTube, CopyPunch génère du copy optimisé pour chaque plateforme."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {CONTENT_TYPES.map((type) => (
            <motion.div key={type.id} variants={itemVariants}>
              <Card
                hover
                padding="md"
                className="text-center cursor-default"
              >
                <span className="text-3xl mb-3 block">{type.emoji}</span>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {type.label}
                </h3>
                <p className="text-xs text-muted">{type.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
