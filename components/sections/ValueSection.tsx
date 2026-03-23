"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Building2, ShoppingCart, Signal, TrendingUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeader } from "@/components/ui/SectionHeader";

const retentionData = [
  { month: "M1", baseline: 100, optimized: 101 },
  { month: "M2", baseline: 98, optimized: 102 },
  { month: "M3", baseline: 96, optimized: 104 },
  { month: "M4", baseline: 94, optimized: 106 },
  { month: "M5", baseline: 92, optimized: 109 },
  { month: "M6", baseline: 90, optimized: 112 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
} as any;

function ValueCard({
  icon,
  title,
  valueA,
  valueB,
}: {
  icon: ReactNode;
  title: string;
  valueA: string;
  valueB?: string;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-3 stat-number text-4xl gradient-text">{valueA}</p>
      {valueB ? <p className="mt-2 text-sm text-text-secondary">{valueB}</p> : null}
    </div>
  );
}

export function ValueSection() {
  const t = useTranslations("value");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ValueCard
              icon={<Signal className="h-5 w-5" />}
              title={t("telecom_title")}
              valueA={t("telecom_1pct")}
              valueB={`1% churn reduction, ${t("telecom_2pct")} at 2%`}
            />
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ValueCard
              icon={<ShoppingCart className="h-5 w-5" />}
              title={t("retail_title")}
              valueA="$50M"
              valueB={t("retail_value")}
            />
          </motion.div>
          <motion.div
            custom={2}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ValueCard
              icon={<Building2 className="h-5 w-5" />}
              title={t("saas_title")}
              valueA={t("saas_arr")}
              valueB={`${t("saas_ltv")} through improved retention`}
            />
          </motion.div>
        </div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 rounded-2xl border border-amber/25 bg-gradient-to-r from-amber/12 to-transparent p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h3 className="font-display text-2xl font-bold text-amber-light">{t("compound")}</h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">{t("compound_detail")}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber/10 px-4 py-2 text-sm font-semibold text-amber">
              <BadgeDollarSign className="h-4 w-4" />
              Compounding returns
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr]">
          <motion.div
            custom={4}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="glass rounded-2xl p-4 sm:p-6"
          >
            <h4 className="mb-4 font-display text-lg font-semibold text-text-primary">Compound retention trajectory</h4>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retentionData}>
                  <defs>
                    <linearGradient id="optimizedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4DB6AC" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4DB6AC" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="baselineFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748B" stopOpacity={0.26} />
                      <stop offset="95%" stopColor="#64748B" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                  <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17,24,39,0.95)",
                      borderColor: "rgba(77,182,172,0.4)",
                      borderRadius: "12px",
                    }}
                    labelStyle={{ color: "#F1F5F9" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="#64748B"
                    fill="url(#baselineFill)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="optimized"
                    stroke="#4DB6AC"
                    fill="url(#optimizedFill)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="gradient-border rounded-2xl p-6 sm:p-8"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="stat-number text-5xl gradient-text">12%+</p>
            <h4 className="mt-2 font-display text-xl font-semibold text-text-primary">Valuation impact</h4>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">{t("valuation")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
