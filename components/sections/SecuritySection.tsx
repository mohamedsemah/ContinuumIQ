"use client";

import { motion, type Variants } from "framer-motion";
import { EyeOff, FileCheck, Globe, KeyRound, Lock, ServerCog, Shield, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
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

export function SecuritySection() {
  const t = useTranslations("security");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const featureCards = [
    { title: t("feature1_title"), text: t("feature1_text"), icon: Shield },
    { title: t("feature2_title"), text: t("feature2_text"), icon: Globe },
    { title: t("feature3_title"), text: t("feature3_text"), icon: Lock },
    { title: t("feature4_title"), text: t("feature4_text"), icon: KeyRound },
    { title: t("feature5_title"), text: t("feature5_text"), icon: EyeOff },
    { title: t("feature6_title"), text: t("feature6_text"), icon: FileCheck },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-teal-glow) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article key={card.title} variants={fadeUpVariants} className="glass rounded-2xl p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/12 text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{card.text}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <motion.article variants={fadeUpVariants} className="glass rounded-2xl p-6 sm:p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber/12 text-amber">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-display text-2xl font-semibold text-text-primary">{t("uptime")}</h4>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{t("uptime_text")}</p>
          </motion.article>

          <motion.article variants={fadeUpVariants} className="glass rounded-2xl p-6 sm:p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/12 text-teal">
              <ServerCog className="h-5 w-5" />
            </div>
            <h4 className="font-display text-2xl font-semibold text-text-primary">{t("architecture")}</h4>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{t("architecture_text")}</p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
