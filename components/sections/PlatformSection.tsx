"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CircleCheckBig,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut", delay: index * 0.08 },
  }),
} as any;

const nodeVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: index * 0.14, ease: "easeOut" },
  }),
} as any;

export function PlatformSection() {
  const t = useTranslations("platform");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const capabilities = [
    { title: t("capability1_title"), text: t("capability1_text"), icon: BrainCircuit },
    { title: t("capability2_title"), text: t("capability2_text"), icon: ChartNoAxesCombined },
    { title: t("capability3_title"), text: t("capability3_text"), icon: Activity },
    { title: t("capability4_title"), text: t("capability4_text"), icon: Sparkles },
    { title: t("capability5_title"), text: t("capability5_text"), icon: Building2 },
    { title: t("capability6_title"), text: t("capability6_text"), icon: ShieldCheck },
  ];

  const stack = [t("stack1"), t("stack2"), t("stack3"), t("stack4"), t("stack5")];

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-teal-glow) 0%, transparent 68%)",
          filter: "blur(12px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.article
                key={capability.title}
                custom={index}
                variants={cardVariants}
                initial={mounted ? "hidden" : false}
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 0 40px var(--color-teal-glow)" }}
                className="glass group rounded-2xl p-6 transition-shadow duration-300"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{capability.text}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-12 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8"
        >
          <h3 className="font-display text-2xl font-semibold text-text-primary">{t("stack_title")}</h3>

          <div className="relative mt-8">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-teal/45 to-transparent lg:block" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              {stack.map((node, index) => (
                <motion.div
                  key={node}
                  custom={index}
                  variants={nodeVariants}
                  initial={mounted ? "hidden" : false}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative flex min-h-24 items-center gap-3 rounded-xl border border-teal/20 bg-background/50 px-4 py-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                    <CircleCheckBig className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium leading-snug text-text-secondary">{node}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
