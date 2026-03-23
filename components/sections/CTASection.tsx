"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
} as any;

export function CTASection() {
  const t = useTranslations("cta_section");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding noise-bg relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 20%, var(--color-teal-glow) 0%, rgba(10,14,23,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-surface/50 px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: t("stat1_value"), label: t("stat1_label") },
              { value: t("stat2_value"), label: t("stat2_label") },
              { value: t("stat3_value"), label: t("stat3_label") },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                custom={index + 1}
                variants={fadeUp}
                initial={mounted ? "hidden" : false}
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="rounded-2xl border border-teal/20 bg-background/50 px-4 py-6"
              >
                <p className="stat-number text-5xl gradient-text sm:text-6xl">{item.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mx-auto mt-10 max-w-3xl font-display text-2xl font-semibold text-text-primary sm:text-3xl"
          >
            {t("action")}
          </motion.p>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8"
          >
            <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg", className: "h-14 px-10 text-lg" })}>
              {t("button")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
