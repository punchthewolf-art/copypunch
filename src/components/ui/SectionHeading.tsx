"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-medium text-accent bg-accent-light border border-accent/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
