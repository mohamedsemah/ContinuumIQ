"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "teal" | "amber" | "muted";
  title: string;
  subtitle?: string;
  gradient?: boolean;
  align?: "center" | "left";
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.12,
    },
  }),
} as const;

export function SectionHeader({
  badge,
  badgeVariant = "teal",
  title,
  subtitle,
  gradient = false,
  align = "center",
  className,
}: SectionHeaderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {badge && (
        <motion.div custom={0} variants={fadeUp}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </motion.div>
      )}

      <motion.h2
        custom={1}
        variants={fadeUp}
        className={cn(
          "font-display font-bold tracking-tight",
          "text-3xl sm:text-4xl lg:text-5xl",
          "max-w-3xl",
          gradient ? "gradient-text" : "text-text-primary"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          custom={2}
          variants={fadeUp}
          className="max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
