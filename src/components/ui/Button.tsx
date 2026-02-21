"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white glow-button hover:bg-accent-hover focus-visible:ring-accent",
  secondary:
    "bg-card-bg text-foreground border border-card-border hover:border-muted focus-visible:ring-card-border",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-card-bg focus-visible:ring-card-border",
  outline:
    "bg-transparent text-foreground border border-card-border hover:bg-card-bg focus-visible:ring-card-border",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      href,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = `
      inline-flex items-center justify-center font-medium
      transition-colors duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background
      disabled:opacity-50 disabled:cursor-not-allowed
      cursor-pointer
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

    const content = isLoading ? (
      <span className="flex items-center gap-2">
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Chargement...
      </span>
    ) : (
      <>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    // Render as Next.js Link for internal routes
    if (href && !disabled && !isLoading) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    // Render as button (default)
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
