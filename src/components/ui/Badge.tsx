"use client";

import { motion } from "framer-motion";

type BadgeVariant = "default" | "accent" | "success" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card-bg text-foreground border-card-border",
  accent: "bg-accent-light text-accent border-accent/30",
  success: "bg-success/10 text-success border-success/30",
  muted: "bg-card-bg text-muted border-card-border",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
  animated = false,
}: BadgeProps) {
  const Wrapper = animated ? motion.span : "span";
  const animationProps = animated
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Wrapper
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1 text-xs font-medium
        border rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
      {...animationProps}
    >
      {children}
    </Wrapper>
  );
}
