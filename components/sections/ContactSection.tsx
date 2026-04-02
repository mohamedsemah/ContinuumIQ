"use client";

import { motion, type Variants } from "framer-motion";
import { Globe2, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  buildDemoMailtoHref,
  type CompanySizeKey,
  type IndustryKey,
} from "@/lib/contactForm";
import { trackEvent, trackFormSubmit } from "@/lib/analytics";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fieldClassName =
  "w-full rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-teal/60 focus:ring-2 focus:ring-teal/25";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companySize, setCompanySize] = useState<"" | CompanySizeKey>("");
  const [industry, setIndustry] = useState<"" | IndustryKey>("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorKind, setErrorKind] = useState<"generic" | "config" | null>(null);

  useEffect(() => setMounted(true), []);

  const formComplete =
    name.trim() &&
    email.trim() &&
    company.trim() &&
    companySize &&
    industry &&
    message.trim();

  const mailtoHref = formComplete
    ? buildDemoMailtoHref({
          to: t("email"),
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          companySize,
          industry,
          message: message.trim(),
        })
    : null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorKind(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      companySize,
      industry,
      message: message.trim(),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as {
        sent?: boolean;
        error?: string;
      } | null;

      const succeeded = res.ok && data && !data.error && data.sent === true;

      if (succeeded) {
        setStatus("success");
        trackFormSubmit("contact_demo");
        trackEvent({ name: "demo_request", properties: { source: "api" } });
        return;
      }

      if (res.status === 503) {
        setErrorKind("config");
      } else {
        setErrorKind("generic");
      }
      setStatus("error");
    } catch {
      setErrorKind("generic");
      setStatus("error");
    }
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-teal-glow) 0%, transparent 72%)",
          filter: "blur(22px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5"
        >
          <motion.article variants={fadeUpVariants} className="glass rounded-2xl p-6 sm:p-8 lg:col-span-3">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate={false}>
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text-secondary">
                  {t("name_label")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClassName}
                  required
                  maxLength={120}
                  disabled={status === "submitting"}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text-secondary">
                    {t("email_label")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClassName}
                    required
                    maxLength={254}
                    disabled={status === "submitting"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-medium text-text-secondary">
                    {t("company_label")}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={fieldClassName}
                    required
                    maxLength={200}
                    disabled={status === "submitting"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-size" className="mb-2 block text-sm font-medium text-text-secondary">
                    {t("size_label")}
                  </label>
                  <select
                    id="contact-size"
                    name="companySize"
                    className={cn(fieldClassName, "appearance-none bg-[linear-gradient(45deg,transparent_50%,#80CBC4_50%),linear-gradient(135deg,#80CBC4_50%,transparent_50%)] bg-[length:8px_8px,8px_8px] bg-[position:calc(100%-20px)_55%,calc(100%-14px)_55%] bg-no-repeat pr-10")}
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value as CompanySizeKey | "")}
                    required
                    disabled={status === "submitting"}
                  >
                    <option value="" disabled>
                      {t("size_placeholder")}
                    </option>
                    <option value="small">{t("size_small")}</option>
                    <option value="mid">{t("size_mid")}</option>
                    <option value="large">{t("size_large")}</option>
                    <option value="enterprise">{t("size_enterprise")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-industry" className="mb-2 block text-sm font-medium text-text-secondary">
                    {t("industry_label")}
                  </label>
                  <select
                    id="contact-industry"
                    name="industry"
                    className={cn(fieldClassName, "appearance-none bg-[linear-gradient(45deg,transparent_50%,#80CBC4_50%),linear-gradient(135deg,#80CBC4_50%,transparent_50%)] bg-[length:8px_8px,8px_8px] bg-[position:calc(100%-20px)_55%,calc(100%-14px)_55%] bg-no-repeat pr-10")}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as IndustryKey | "")}
                    required
                    disabled={status === "submitting"}
                  >
                    <option value="" disabled>
                      {t("industry_placeholder")}
                    </option>
                    <option value="telecom">Telecommunications</option>
                    <option value="financial-services">Financial Services</option>
                    <option value="saas">SaaS</option>
                    <option value="retail">Retail</option>
                    <option value="mobility">Mobility</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text-secondary">
                  {t("message_label")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={fieldClassName}
                  required
                  maxLength={5000}
                  disabled={status === "submitting"}
                />
              </div>

              {status === "success" && (
                <p role="status" className="rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal-light">
                  {t("success")}
                </p>
              )}

              {status === "error" && errorKind && (
                <p role="alert" className="rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber-light">
                  {errorKind === "config" ? t("error_config") : t("error_generic")}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={buttonVariants({ variant: "primary", size: "md", className: "w-full sm:w-auto" })}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      {t("submitting")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </button>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[12rem]">
                  <p className="text-xs text-text-muted">{t("mailto_help")}</p>
                  {mailtoHref ? (
                    <a
                      href={mailtoHref}
                      onClick={() => {
                        trackEvent({ name: "demo_request", properties: { source: "mailto" } });
                      }}
                      className={buttonVariants({
                        variant: "secondary",
                        size: "md",
                        className: "w-full justify-center text-center sm:w-auto",
                      })}
                    >
                      {t("mailto_button")}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "md", className: "w-full cursor-not-allowed justify-center opacity-50 sm:w-auto" })
                      )}
                      aria-disabled
                    >
                      {t("mailto_button")}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </motion.article>

          <motion.aside variants={fadeUpVariants} className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:col-span-2">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{t("badge")}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">ContinuumIQ</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal/12 text-teal">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text-muted">Email</p>
                    <a href={`mailto:${t("email")}`} className="text-sm font-medium text-text-primary hover:text-teal">
                      {t("email")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber/12 text-amber">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text-muted">Website</p>
                    <a
                      href={`https://${t("website")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-text-primary hover:text-amber"
                    >
                      {t("website")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-14 -right-16 h-48 w-48 rounded-full border border-teal/25"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 right-4 h-24 w-24 rounded-2xl border border-amber/25 bg-amber/8"
            />
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
