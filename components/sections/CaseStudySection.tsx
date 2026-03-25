"use client";

import { motion } from "framer-motion";
import { Award, Building2, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CIRCLE_RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function asPercentNumber(value: string): number {
  const normalized = value.replace("%", "").replace(/،/g, ",").trim();

  if (normalized.includes(".") && normalized.includes(",")) {
    return Number(normalized.replace(/,/g, ""));
  }

  if (normalized.includes(",")) {
    const parts = normalized.split(",").map((part) => part.trim());
    const isThousandsGrouped = parts.length > 1 && parts.slice(1).every((part) => part.length === 3);
    if (isThousandsGrouped) {
      return Number(parts.join(""));
    }

    if (parts.length === 2) {
      return Number(`${parts[0]}.${parts[1]}`);
    }
  }

  return Number(normalized);
}

function MetricRing({
  label,
  value,
  color = "#4DB6AC",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const numeric = asPercentNumber(value);
  const strokeOffset = CIRCUMFERENCE * (1 - Math.min(Math.max(numeric / 100, 0), 1));

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="94" height="94" viewBox="0 0 94 94" className="-rotate-90">
        <circle cx="47" cy="47" r={CIRCLE_RADIUS} fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="8" />
        <motion.circle
          cx="47"
          cy="47"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={mounted ? { strokeDashoffset: CIRCUMFERENCE } : false}
          whileInView={{ strokeDashoffset: strokeOffset }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <p className="stat-number text-2xl text-text-primary">{value}</p>
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
    </div>
  );
}

function CaseCard({
  company,
  market,
  precision,
  auc,
  accuracy,
}: {
  company: string;
  market: string;
  precision: string;
  auc: string;
  accuracy: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.article
      initial={mounted ? { opacity: 0, y: 24 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-text-primary">{company}</h3>
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-teal/10 px-3 py-1 text-sm text-teal">
            <Globe className="h-4 w-4" />
            <span>{market}</span>
          </div>
        </div>

        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber">
          <Award className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricRing label="Precision" value={precision} color="#4DB6AC" />
        <MetricRing label="AUC" value={auc} color="#80CBC4" />
        <MetricRing label="Accuracy" value={accuracy} color="#FFD166" />
      </div>
    </motion.article>
  );
}

export function CaseStudySection() {
  const t = useTranslations("caseStudies");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <CaseCard
            company={t("case1_company")}
            market={t("case1_market")}
            precision={t("case1_precision")}
            auc={t("case1_auc")}
            accuracy={t("case1_accuracy")}
          />
          <CaseCard
            company={t("case2_company")}
            market={t("case2_market")}
            precision={t("case2_precision")}
            auc={t("case2_auc")}
            accuracy={t("case2_accuracy")}
          />
        </div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          className="mt-8 rounded-2xl border border-border bg-surface/40 p-6 text-center sm:p-8"
        >
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <Building2 className="h-5 w-5" />
          </div>
          <p className="mx-auto max-w-4xl text-base leading-relaxed text-text-secondary sm:text-lg">{t("conclusion")}</p>
        </motion.div>
      </div>
    </section>
  );
}
