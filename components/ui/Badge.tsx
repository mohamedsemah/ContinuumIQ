"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "teal" | "amber" | "muted";
}

export function Badge({ children, className, variant = "teal" }: BadgeProps) {
  const variantStyles = {
    teal: "bg-teal/10 text-teal border-teal/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    muted: "bg-surface-elevated text-text-secondary border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "rounded-full border px-3.5 py-1",
        "text-xs font-medium font-display tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "teal" && "bg-teal",
          variant === "amber" && "bg-amber",
          variant === "muted" && "bg-text-muted"
        )}
      />
      {children}
    </span>
  );
}
