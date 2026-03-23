"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2, Gauge, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as any;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as any;

function shouldEmphasizeWord(word: string, index: number) {
  const normalized = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const highlighted = new Set(["predict", "customer", "exit", "risk", "too", "late"]);

  return highlighted.has(normalized) || index === 1 || index === 2;
}

export function HeroSection() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const titleWords = t("title").split(" ");

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(52% 42% at 50% 20%, var(--color-teal-glow) 0%, transparent 80%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-14 left-[8%] h-40 w-40 rounded-full border border-teal/20 bg-teal/5"
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-28 right-[10%] h-24 w-24 rounded-2xl border border-teal-light/20 bg-teal/10"
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-[22%] h-16 w-16 rotate-12 border border-amber/20 bg-amber/5"
        animate={{ y: [0, -12, 0], x: [0, -8, 0], rotate: [12, 24, 12] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <Badge variant="teal">{t("badge")}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={mounted ? { opacity: 0, y: 18 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.06,
                  ease: "easeOut",
                }}
                className={cn("inline-block mr-3", shouldEmphasizeWord(word, index) && "gradient-text")}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
              {t("cta1")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/platform"
              className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
            >
              {t("cta2")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <StatCard value={t("stat1_value")} label={t("stat1_label")} icon={<ShieldCheck className="h-5 w-5" />} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard
              value={t("stat2_value")}
              suffix={t("stat2_unit")}
              label={t("stat2_label")}
              icon={<CalendarCheck2 className="h-5 w-5" />}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard value={t("stat3_value")} label={t("stat3_label")} icon={<TrendingUp className="h-5 w-5" />} />
          </motion.div>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-10 hidden h-48 w-48 rounded-full border border-teal/15 bg-gradient-to-br from-teal/10 to-transparent blur-2xl lg:block"
        />
        <Gauge aria-hidden className="pointer-events-none absolute bottom-18 right-18 hidden h-10 w-10 text-teal/30 lg:block" />
      </div>
    </section>
  );
}
