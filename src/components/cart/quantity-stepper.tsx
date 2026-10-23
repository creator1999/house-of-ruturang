"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const compact = size === "sm";

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-background">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={compact ? "size-9" : "size-11"}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>
      <span
        className={
          compact
            ? "w-8 text-center text-sm tabular-nums"
            : "w-10 text-center text-sm tabular-nums"
        }
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={compact ? "size-9" : "size-11"}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
