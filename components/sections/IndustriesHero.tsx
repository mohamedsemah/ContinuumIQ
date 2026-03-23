"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function IndustriesHero() {
  const t = useTranslations("industries");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(42% 30% at 50% 30%, var(--color-teal-glow) 0%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants}>
            <Badge>{t("badge")}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="gradient-text mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
