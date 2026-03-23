"use client";

import { motion, type Variants } from "framer-motion";
import { BarChart3, Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AboutSection() {
  const t = useTranslations("about");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const moatCards = [
    { title: t("moat1_title"), text: t("moat1_text"), icon: TrendingUp, accent: "text-teal" },
    { title: t("moat2_title"), text: t("moat2_text"), icon: Landmark, accent: "text-amber" },
    { title: t("moat3_title"), text: t("moat3_text"), icon: ShieldCheck, accent: "text-teal-light" },
    { title: t("moat4_title"), text: t("moat4_text"), icon: BarChart3, accent: "text-amber-light" },
  ];

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <motion.article variants={fadeUpVariants} className="glass rounded-2xl border-l-4 border-l-teal p-6 sm:p-7">
            <h3 className="font-display text-2xl font-semibold text-text-primary">{t("mission_title")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{t("mission_text")}</p>
          </motion.article>

          <motion.article
            variants={fadeUpVariants}
            className="glass rounded-2xl border-l-4 border-l-amber p-6 sm:p-7"
          >
            <h3 className="font-display text-2xl font-semibold text-text-primary">{t("vision_title")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{t("vision_text")}</p>
          </motion.article>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {moatCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article key={card.title} variants={fadeUpVariants} className="glass rounded-2xl p-6">
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated ${card.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-display text-xl font-semibold text-text-primary">{card.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{card.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
