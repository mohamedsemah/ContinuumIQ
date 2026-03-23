"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const PLATFORM_LINKS = [
  { key: "platform", href: "/platform" },
  { key: "industries", href: "/industries" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "pricing", href: "/pricing" },
  { key: "security", href: "/security" },
] as const;

const COMPANY_LINKS = [
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "resources", href: "/resources" },
] as const;

const RESOURCE_LINKS = [
  { key: "caseStudies", href: "/case-studies" },
  { key: "resources", href: "/resources" },
  { key: "security", href: "/security" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
} as const;

function FooterColumn({
  title,
  children,
  index,
}: {
  title: string;
  children: ReactNode;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <h3 className="font-display font-semibold text-sm text-text-primary mb-4 tracking-wide uppercase">
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
    </motion.div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-text-muted hover:text-teal transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial={mounted ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="gradient-text font-display text-xl font-bold tracking-tight">
                ContinuumIQ
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </motion.div>

          {/* Platform column */}
          <FooterColumn title={t("platformTitle")} index={1}>
            {PLATFORM_LINKS.map(({ key, href }) => (
              <FooterLink key={key} href={href}>
                {nav(key)}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Company column */}
          <FooterColumn title={t("companyTitle")} index={2}>
            {COMPANY_LINKS.map(({ key, href }) => (
              <FooterLink key={key} href={href}>
                {nav(key)}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Resources column */}
          <FooterColumn title={t("resourcesTitle")} index={3}>
            {RESOURCE_LINKS.map(({ key, href }) => (
              <FooterLink key={key} href={href}>
                {nav(key)}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">{t("copyright")}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {t("terms")}
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {t("cookies")}
              </Link>
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1.5",
                "rounded-full border border-amber/20 bg-amber/5 px-3 py-1",
                "text-xs font-medium text-amber"
              )}
            >
              <Shield className="h-3 w-3" />
              {t("confidential")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
