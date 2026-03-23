"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCheck, CircleX, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

function CapabilityList({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={
        positive
          ? "rounded-2xl border border-teal/20 bg-teal/5 p-6 sm:p-7"
          : "rounded-2xl border border-amber/20 bg-amber/5 p-6 sm:p-7"
      }
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className={
            positive
              ? "flex h-10 w-10 items-center justify-center rounded-xl bg-teal/12 text-teal"
              : "flex h-10 w-10 items-center justify-center rounded-xl bg-amber/12 text-amber"
          }
        >
          {positive ? <ListChecks className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        </div>
        <h3 className="font-display text-2xl font-semibold text-text-primary">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              positive
                ? "flex items-start gap-3 rounded-xl border border-teal/15 bg-background/30 p-3"
                : "flex items-start gap-3 rounded-xl border border-amber/15 bg-background/30 p-3"
            }
          >
            <span
              className={
                positive
                  ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal/15 text-xs font-bold text-teal"
                  : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber/15 text-xs font-bold text-amber"
              }
            >
              {index + 1}
            </span>
            <span className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary sm:text-base">
              {positive ? (
                <CheckCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              ) : (
                <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              )}
              <span>{item}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function GapSection() {
  const t = useTranslations("gap");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={container}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <CapabilityList
            positive
            title={t("existing_title")}
            items={[t("existing_1"), t("existing_2"), t("existing_3")]}
          />
          <CapabilityList
            positive={false}
            title={t("missing_title")}
            items={[t("missing_1"), t("missing_2"), t("missing_3")]}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="gradient-border mt-8 rounded-2xl p-6 sm:p-8"
        >
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{t("conclusion")}</p>
        </motion.div>
      </div>
    </section>
  );
}
