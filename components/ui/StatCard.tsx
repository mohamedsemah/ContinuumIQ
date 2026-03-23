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

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [mounted, setMounted] = useState(false);
  const [displayed, setDisplayed] = useState(value);

  const numericMatch = value.match(/^([\d.]+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : null;
  const textSuffix = numericMatch ? value.slice(numericMatch[0].length) : "";
  const hasDecimal = numericMatch ? numericMatch[1].includes(".") : false;

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.01,
  });

  const display = useTransform(spring, (current) => {
    if (numericValue === null) return value;
    const formatted = hasDecimal ? current.toFixed(1) : Math.round(current).toString();
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
