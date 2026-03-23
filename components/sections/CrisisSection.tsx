"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, Siren, TrendingDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as any;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
} as any;

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="glass relative overflow-hidden rounded-2xl border-l-4 border-l-teal p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 100% at 0% 0%, var(--color-teal-glow) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
          {icon}
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">{text}</p>
      </div>
    </motion.article>
  );
}

export function CrisisSection() {
  const t = useTranslations("crisis");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={container}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <StatCard value={t("stat1_value")} label={t("stat1_label")} icon={<TrendingDown className="h-5 w-5" />} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard value={t("stat2_value")} label={t("stat2_label")} icon={<AlertTriangle className="h-5 w-5" />} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard value={t("stat3_value")} label={t("stat3_label")} icon={<Siren className="h-5 w-5" />} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <InsightCard icon={<Lightbulb className="h-5 w-5" />} title={t("insight_title")} text={t("insight_text")} />
          <InsightCard
            icon={<AlertTriangle className="h-5 w-5" />}
            title={t("imperative_title")}
            text={t("imperative_text")}
          />
        </motion.div>
      </div>
    </section>
  );
}
