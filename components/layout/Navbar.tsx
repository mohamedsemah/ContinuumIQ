"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "platform", href: "/platform" },
  { key: "industries", href: "/industries" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "pricing", href: "/pricing" },
  { key: "security", href: "/security" },
  { key: "resources", href: "/resources" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const SCROLLED_ON = 28;
    const SCROLLED_OFF = 12;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > SCROLLED_ON) return true;
        if (prev && y < SCROLLED_OFF) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function switchLocale(target: "en" | "ar") {
    setLangOpen(false);
    router.replace(pathname, { locale: target });
  }

  const isRTL = locale === "ar";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border/50",
          "transform-gpu [backface-visibility:hidden] [will-change:transform,opacity]",
          "transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-surface/70 backdrop-blur-xl shadow-lg shadow-background/50 border-border"
            : "bg-transparent backdrop-blur-0 shadow-none border-border/40"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2 shrink-0"
          >
            <span className="gradient-text font-display text-xl font-bold tracking-tight">
              ContinuumIQ
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                    isActive
                      ? "text-teal"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {t(key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-teal"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm",
                  "text-text-secondary hover:text-text-primary transition-colors",
                  "hover:bg-surface-elevated"
                )}
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium uppercase">{locale}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    langOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute top-full mt-1 z-20 w-32 rounded-xl overflow-hidden",
                        "glass shadow-xl shadow-background/50",
                        isRTL ? "left-0" : "right-0"
                      )}
                    >
                      <button
                        onClick={() => switchLocale("en")}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                          locale === "en"
                            ? "text-teal bg-teal/5"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                        )}
                      >
                        <span className="text-base">EN</span>
                        <span>English</span>
                      </button>
                      <button
                        onClick={() => switchLocale("ar")}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                          locale === "ar"
                            ? "text-teal bg-teal/5"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                        )}
                      >
                        <span className="text-base">AR</span>
                        <span>العربية</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              {t("bookDemo")}
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              {t("getStarted")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex lg:hidden items-center justify-center h-10 w-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed top-0 bottom-0 z-50 w-80 max-w-[85vw] lg:hidden",
                "bg-surface border-border flex flex-col",
                isRTL ? "left-0 border-r" : "right-0 border-l"
              )}
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-border">
                <span className="gradient-text font-display text-lg font-bold">
                  ContinuumIQ
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ key, href }, i) => {
                    const isActive =
                      href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(href);

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-teal/10 text-teal"
                              : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                          )}
                        >
                          {t(key)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Drawer footer */}
              <div className="border-t border-border p-4 space-y-3">
                {/* Language switch */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-elevated">
                  <button
                    onClick={() => switchLocale("en")}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
                      locale === "en"
                        ? "bg-teal/10 text-teal"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLocale("ar")}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
                      locale === "ar"
                        ? "bg-teal/10 text-teal"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    AR
                  </button>
                </div>

                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "secondary", size: "md", className: "w-full" })}
                >
                  {t("bookDemo")}
                </Link>
                <Link
                  href="/pricing"
                  className={buttonVariants({ variant: "primary", size: "md", className: "w-full" })}
                >
                  {t("getStarted")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
