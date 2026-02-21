"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { getCharacterInfo } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxChars?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, hint, error, maxChars, value, className = "", ...props }, ref) => {
    const charInfo = maxChars
      ? getCharacterInfo(String(value || ""), maxChars)
      : null;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {hint && <p className="text-xs text-muted">{hint}</p>}
        <textarea
          ref={ref}
          value={value}
          className={`
            w-full bg-card-bg border rounded-xl px-4 py-3
            text-foreground text-sm placeholder:text-muted
            focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50
            transition-all duration-200 resize-none
            ${error ? "border-error" : "border-card-border"}
            ${className}
          `}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error && <p className="text-xs text-error">{error}</p>}
          {charInfo && (
            <p
              className={`text-xs ml-auto ${
                charInfo.isOver
                  ? "text-error"
                  : charInfo.isNearLimit
                    ? "text-yellow-500"
                    : "text-muted"
              }`}
            >
              {charInfo.count}/{maxChars}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
