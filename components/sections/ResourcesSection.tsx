"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
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

export function ResourcesSection() {
  const t = useTranslations("resources");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items = [
    {
      title: t("item1_title"),
      description: t("item1_desc"),
      tag: t("item1_tag"),
      isWhitePaper: true,
      href: "/contact",
    },
    {
      title: t("item2_title"),
      description: t("item2_desc"),
      tag: t("item2_tag"),
      isWhitePaper: false,
      href: "/contact",
    },
    {
      title: t("item3_title"),
      description: t("item3_desc"),
      tag: t("item3_tag"),
      isWhitePaper: false,
      href: "/contact",
    },
    {
      title: t("item4_title"),
      description: t("item4_desc"),
      tag: t("item4_tag"),
      isWhitePaper: false,
      href: "/contact",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUpVariants}
              whileHover={{ y: -6 }}
              className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform duration-300"
            >
              <div>
                <Badge
                  variant={item.isWhitePaper ? "amber" : "teal"}
                  className={cn("mb-4", item.isWhitePaper && "bg-amber/15 text-amber-light border-amber/30")}
                >
                  {item.tag}
                </Badge>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">{item.description}</p>
              </div>

              <div className="mt-7">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal-light"
                >
                  {item.isWhitePaper ? t("download") : t("read")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
