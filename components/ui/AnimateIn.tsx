"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  stagger?: number;
  as?: "div" | "section" | "article" | "ul";
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export function AnimateIn({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  as = "div",
}: AnimateInProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Component = motion[as];

  return (
    <Component
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export function StaggerContainer({
  children,
  className,
  as = "div",
}: Omit<AnimateInProps, "variants" | "delay">) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Component = motion[as];

  return (
    <Component
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export function AnimateInChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={defaultVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
