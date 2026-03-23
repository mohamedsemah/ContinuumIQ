"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-display font-semibold tracking-tight",
    "rounded-xl transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-teal-dark via-teal to-teal-light",
          "text-background",
          "shadow-[0_0_24px_var(--color-teal-glow)]",
        ].join(" "),
        secondary: [
          "gradient-border",
          "text-text-primary",
          "hover:bg-surface-elevated",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "text-text-secondary",
          "hover:text-text-primary hover:bg-surface/60",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariantProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{
          scale: 1.02,
          boxShadow:
            variant === "primary"
              ? "0 0 40px var(--color-teal-glow), 0 0 80px rgba(77, 182, 172, 0.15)"
              : undefined,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--color-teal-glow) 0%, transparent 70%)",
            }}
          />
        )}
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="relative z-10">{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
