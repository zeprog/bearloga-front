"use client"

import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface TitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export function Title({
  as: Component = 'h2',
  size = 'md',
  className,
  children,
  "aria-label": ariaLabel,
}: TitleProps) {
  const sizes: Record<NonNullable<TitleProps["size"]>, string> = {
    sm: 'text-lg font-medium',
    md: 'text-xl font-semibold',
    lg: "text-2xl font-bold",
    xl: "text-3xl font-bold tracking-tight",
  }

  const level = Number(Component.replace("h", ""));

  return (
    <Component
      className={cn(
        "text-fonttitlecolor font-inter-sans",
        sizes[size],
        className
      )}
      role="heading"
      aria-level={level}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}