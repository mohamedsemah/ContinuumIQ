"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function parseAnimatedValue(value: string): {
  numericValue: number | null;
  textSuffix: string;
  decimalPlaces: number;
  formatWithGrouping: boolean;
} {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) {
    return { numericValue: null, textSuffix: "", decimalPlaces: 0, formatWithGrouping: false };
  }

  const rawNumber = match[1];
  const textSuffix = match[2];
  const commaParts = rawNumber.split(",");
  const hasDot = rawNumber.includes(".");
  const hasComma = rawNumber.includes(",");

  if (hasDot && hasComma) {
    const parsed = Number(rawNumber.replace(/,/g, ""));
    return Number.isFinite(parsed)
      ? { numericValue: parsed, textSuffix, decimalPlaces: 2, formatWithGrouping: false }
      : { numericValue: null, textSuffix, decimalPlaces: 0, formatWithGrouping: false };
  }

  if (hasComma) {
    const isThousandsGrouped = commaParts.length > 1 && commaParts.slice(1).every((part) => part.length === 3);
    if (isThousandsGrouped) {
      const parsed = Number(rawNumber.replace(/,/g, ""));
      return Number.isFinite(parsed)
        ? { numericValue: parsed, textSuffix, decimalPlaces: 0, formatWithGrouping: true }
        : { numericValue: null, textSuffix, decimalPlaces: 0, formatWithGrouping: false };
    }

    // Range-like values such as 15,25% should not be numerically animated.
    return { numericValue: null, textSuffix, decimalPlaces: 0, formatWithGrouping: false };
  }

  const parsed = Number(rawNumber);
  if (!Number.isFinite(parsed)) {
    return { numericValue: null, textSuffix, decimalPlaces: 0, formatWithGrouping: false };
  }

  const decimalPlaces = hasDot ? rawNumber.split(".")[1]?.length ?? 0 : 0;
  return { numericValue: parsed, textSuffix, decimalPlaces, formatWithGrouping: false };
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [mounted, setMounted] = useState(false);
  const [displayed, setDisplayed] = useState(value);

  const { numericValue, textSuffix, decimalPlaces, formatWithGrouping } = parseAnimatedValue(value);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.01,
  });

  const display = useTransform(spring, (current) => {
    if (numericValue === null) return value;
    const rounded = decimalPlaces > 0 ? Number(current.toFixed(decimalPlaces)) : Math.round(current);
    const formatted =
      formatWithGrouping
        ? Number(rounded).toLocaleString("en-US")
        : decimalPlaces > 0
          ? Number(rounded).toFixed(decimalPlaces)
          : Number(rounded).toString();
    return formatted + textSuffix;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && numericValue !== null) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayed(v));
    return unsubscribe;
  }, [display]);

  if (numericValue === null) {
    return (
      <motion.span
        ref={ref}
        initial={mounted ? { opacity: 0, scale: 0.8 } : false}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {value}
      </motion.span>
    );
  }

  return <span ref={ref}>{isInView ? displayed : "0" + textSuffix}</span>;
}

export function StatCard({
  value,
  label,
  icon,
  suffix,
  prefix,
  className,
}: StatCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-6 sm:p-8",
        "hover:border-teal/30 transition-colors duration-300",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--color-teal-glow) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        {icon && (
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
            {icon}
          </div>
        )}

        <div className="stat-number text-4xl sm:text-5xl text-teal">
          {prefix}
          <AnimatedNumber value={value} />
          {suffix}
        </div>

        <p className="text-sm text-text-secondary font-medium leading-snug">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
