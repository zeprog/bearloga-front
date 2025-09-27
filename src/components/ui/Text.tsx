"use client"

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TextVariant = "main" | "main-bold" | "small" | "caption";

interface TextProps {
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export function Text({
  variant = 'main',
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: TextProps) {
  const variants: Record<TextVariant, string> = {
    "main": "text-base font-normal",
    "main-bold": "text-base font-semibold",
    "small": "text-sm font-normal",
    "caption": "text-xs font-normal",
  }

  return (
    <p
      className={cn("text-fonttitlecolor font-inter-sans", variants[variant], className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </p>
  )
}