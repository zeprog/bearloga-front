import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant
  children: ReactNode
}

export function Button({
  variant = "primary",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer"
  const variants: Record<Variant, string> = {
    primary: "bg-main-green-color text-font-primary-button-color hover:bg-primary-button-hover active:bg-primary-button-focus disabled:bg-primary-button-disabled-bg disabled:text-fontsubtitlecolor",
    secondary: "bg-secondary-button-bg text-main-green-color border border-solid border-secondary-button-border hover:bg-secondary-button-hover active:bg-secondary-button-focus",
    ghost: "bg-transparent text-fontsubtitlecolor hover:bg-ghost-button-hover active:bg-ghost-button-focus",
  }

  return (
    <button
      className={cn(
        base,
        variants[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}