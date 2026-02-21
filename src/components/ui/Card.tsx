"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  hover = false,
  glow = false,
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`
        bg-card-bg border border-card-border rounded-2xl
        ${paddingStyles[padding]}
        ${hover ? "transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30" : ""}
        ${glow ? "shadow-lg shadow-accent/10 border-accent/20" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
