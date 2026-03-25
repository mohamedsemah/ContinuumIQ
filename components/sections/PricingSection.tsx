"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PricingSection() {
  const t = useTranslations("pricing");
  const [mounted, setMounted] = useState(false);
  const [copiedPlanKey, setCopiedPlanKey] = useState<string | null>(null);
  const contactCta = t("contact_cta");
  const requestQuotationCta = t("request_quotation");
  const contactEmail = "info@newvisiongroupus.com";

  useEffect(() => setMounted(true), []);

  const handleCopyEmail = async (planKey: string) => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedPlanKey(planKey);
      window.setTimeout(() => setCopiedPlanKey((current) => (current === planKey ? null : current)), 1800);
    } catch {
      setCopiedPlanKey(null);
    }
  };

  const plans = [
    {
      key: "starter",
      name: t("starter_name"),
      price: t("starter_price"),
      period: t("starter_period"),
      description: t("starter_desc"),
      features: [t("starter_f1"), t("starter_f2"), t("starter_f3"), t("starter_f4")],
      highlighted: false,
      ctaLabel: contactCta,
      ctaVariant: "secondary" as const,
    },
    {
      key: "growth",
      name: t("growth_name"),
      price: t("growth_price"),
      period: t("growth_period"),
      description: t("growth_desc"),
      features: [t("growth_f1"), t("growth_f2"), t("growth_f3"), t("growth_f4"), t("growth_f5")],
      highlighted: true,
      tag: t("growth_tag"),
      ctaLabel: contactCta,
      ctaVariant: "primary" as const,
    },
    {
      key: "enterprise",
      name: t("enterprise_name"),
      topCtaLabel: requestQuotationCta,
      description: t("enterprise_desc"),
      features: [t("enterprise_f1"), t("enterprise_f2"), t("enterprise_f3"), t("enterprise_f4"), t("enterprise_f5")],
      highlighted: false,
      ctaLabel: contactCta,
      ctaVariant: "secondary" as const,
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
        style={{
          background: "radial-gradient(42% 45% at 50% 10%, var(--color-teal-glow) 0%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} gradient />

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.key}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={cn(
                "glass relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
                plan.highlighted && "gradient-border glow-teal lg:-translate-y-2 lg:scale-[1.02]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-text-primary">{plan.name}</h3>
                {plan.tag ? <Badge className="shrink-0">{plan.tag}</Badge> : null}
              </div>

              {plan.price ? (
                <div className="mt-6 flex items-end gap-2">
                  <span className="stat-number text-4xl text-text-primary sm:text-5xl">{plan.price}</span>
                  {plan.period ? <span className="pb-1 text-sm text-text-muted">{plan.period}</span> : null}
                </div>
              ) : (
                <div className="mt-6">
                  <Link
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      `ContinuumIQ Pricing Inquiry - ${plan.name}`
                    )}`}
                    className={buttonVariants({
                      variant: plan.highlighted ? "primary" : "secondary",
                      size: "md",
                      className: "w-full sm:w-auto",
                    })}
                  >
                    {plan.topCtaLabel ?? contactCta}
                  </Link>
                </div>
              )}

              <p className="mt-4 min-h-12 text-sm leading-relaxed text-text-secondary sm:text-base">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                    `ContinuumIQ Pricing Inquiry - ${plan.name}`
                  )}`}
                  className={buttonVariants({
                    variant: plan.ctaVariant,
                    size: "md",
                    className: "w-full",
                  })}
                >
                  {plan.ctaLabel}
                </Link>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                  <span>{t("fallback_label")}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(plan.key)}
                    className="rounded-md border border-border px-2.5 py-1 text-text-secondary transition-colors hover:text-text-primary hover:border-teal/40"
                  >
                    {copiedPlanKey === plan.key ? t("fallback_copied") : t("fallback_copy")}
                  </button>
                  <Link
                    href="/contact"
                    className="rounded-md border border-border px-2.5 py-1 text-text-secondary transition-colors hover:text-text-primary hover:border-teal/40"
                  >
                    {t("fallback_open_contact")}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
