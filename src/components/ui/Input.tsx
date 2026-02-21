"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leftIcon, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {hint && <p className="text-xs text-muted">{hint}</p>}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-card-bg border rounded-xl px-4 py-2.5
              text-foreground text-sm placeholder:text-muted
              focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50
              transition-all duration-200
              ${leftIcon ? "pl-10" : ""}
              ${error ? "border-error" : "border-card-border"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
