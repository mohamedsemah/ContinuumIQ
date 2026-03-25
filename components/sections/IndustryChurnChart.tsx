"use client";

import { motion } from "framer-motion";
import { BarChart3, Building2, Landmark, ShoppingBag, Wifi } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { SectionHeader } from "@/components/ui/SectionHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
  }),
} as any;

function parseRateMidpoint(rate: string): number {
  const normalized = rate.replace("%", "").replace(/[–—-]/g, ",").replace(/،/g, ",").trim();
  const parts = normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 2) {
    const [a, b] = parts.map(Number);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return (a + b) / 2;
    }
  }

  // Fallback for single percentages and comma thousand separators.
  return Number(normalized.replace(/,/g, ""));
}

export function IndustryChurnChart() {
  const t = useTranslations("industries");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const industries = useMemo(
    () => [
      { key: "Telecom", name: t("telecom"), rate: t("telecom_rate"), note: t("telecom_note"), icon: Wifi },
      {
        key: "Financial Services",
        name: t("finance"),
        rate: t("finance_rate"),
        note: t("finance_note"),
        icon: Landmark,
      },
      { key: "Retail", name: t("retail"), rate: t("retail_rate"), note: t("retail_note"), icon: ShoppingBag },
      { key: "SaaS", name: t("saas"), rate: t("saas_rate"), note: t("saas_note"), icon: Building2 },
    ],
    [t]
  );

  const chartOption = useMemo<EChartsOption>(
    () => ({
      backgroundColor: "transparent",
      grid: { left: 120, right: 28, top: 24, bottom: 24 },
      xAxis: {
        type: "value",
        min: 0,
        max: 30,
        axisLine: { lineStyle: { color: "rgba(148,163,184,0.35)" } },
        splitLine: { lineStyle: { color: "rgba(148,163,184,0.14)" } },
        axisLabel: { color: "#94A3B8", formatter: "{value}%" },
      },
      yAxis: {
        type: "category",
        data: industries.map((item) => item.key),
        axisLabel: { color: "#F1F5F9", fontSize: 13, fontWeight: 600 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: "rgba(17,24,39,0.95)",
        borderColor: "rgba(77,182,172,0.35)",
        textStyle: { color: "#F1F5F9" },
        formatter: (params: unknown) => {
          const first = (params as { dataIndex: number }[])[0];
          const entry = industries[first.dataIndex];
          return `${entry.name}<br/><strong>${entry.rate}</strong> churn`;
        },
      },
      series: [
        {
          type: "bar",
          data: industries.map((item) => parseRateMidpoint(item.rate)),
          barWidth: 24,
          borderRadius: [0, 8, 8, 0],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: "#80CBC4" },
              { offset: 0.45, color: "#4DB6AC" },
              { offset: 1, color: "#00897B" },
            ]),
            shadowColor: "rgba(77,182,172,0.28)",
            shadowBlur: 18,
          },
          label: {
            show: true,
            position: "right",
            color: "#F1F5F9",
            fontWeight: 700,
            formatter: ({ dataIndex }: { dataIndex: number }) => industries[dataIndex]?.rate ?? "",
          },
          animationDuration: 1100,
          animationEasing: "cubicOut",
        },
      ],
    }),
    [industries]
  );

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          custom={0}
          variants={fadeUp}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="glass mt-12 overflow-hidden rounded-2xl border border-border p-4 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
            <BarChart3 className="h-4 w-4 text-teal" />
            <span>Annual churn range by industry</span>
          </div>
          <ReactECharts option={chartOption} style={{ height: 420, width: "100%" }} />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.article
                key={industry.key}
                custom={index + 1}
                variants={fadeUp}
                initial={mounted ? "hidden" : false}
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary">{industry.name}</h3>
                <p className="mt-1 stat-number text-3xl gradient-text">{industry.rate}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{industry.note}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
