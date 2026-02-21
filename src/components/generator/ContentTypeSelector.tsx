"use client";

import { CONTENT_TYPES, type ContentTypeId } from "@/types";

interface ContentTypeSelectorProps {
  selected: ContentTypeId;
  onChange: (id: ContentTypeId) => void;
  disabled?: boolean;
}

export default function ContentTypeSelector({
  selected,
  onChange,
  disabled,
}: ContentTypeSelectorProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-muted">
        Type de contenu
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {CONTENT_TYPES.map((ct) => (
          <button
            key={ct.id}
            type="button"
            onClick={() => onChange(ct.id)}
            disabled={disabled}
            className={`rounded-lg border p-3 text-left transition-all ${
              selected === ct.id
                ? "border-accent bg-accent-light"
                : "border-card-border bg-card-bg hover:border-muted"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span className="text-lg">{ct.emoji}</span>
            <p
              className={`mt-1 text-xs font-medium leading-tight ${
                selected === ct.id ? "text-accent" : "text-foreground"
              }`}
            >
              {ct.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
