"use client";

import { TONES, type ToneId } from "@/types";

interface ToneSelectorProps {
  selected: ToneId;
  onChange: (id: ToneId) => void;
  disabled?: boolean;
}

export default function ToneSelector({
  selected,
  onChange,
  disabled,
}: ToneSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-muted">Ton</label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            disabled={disabled}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
              selected === tone.id
                ? "border-accent bg-accent-light text-accent"
                : "border-card-border bg-card-bg text-muted hover:border-muted hover:text-foreground"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {tone.emoji} {tone.label}
          </button>
        ))}
      </div>
    </div>
  );
}
