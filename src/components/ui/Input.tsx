"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
}

export function Input({ error = false, disabled = false, className, value: valueProp, onChange, ...props }: InputProps) {
  const [value, setValue] = useState(String(valueProp ?? ""));
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(error);
  const valueStr = String(value ?? "");
  const showFocusGreen = (!hasError || valueStr.length > 0) && isFocused;

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(String(valueProp));
    }
  }, [valueProp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const base = "px-4 py-2 rounded-xl border font-medium outline-none transition-colors w-full placeholder-fontsubtitlecolor font-inter-sans";

  const states = cn(
    base,
    "bg-input-bg text-fonttitlecolor border-input-border",
    !disabled && "hover:border-input-border-hover",
    disabled &&
      "bg-input-disabled-bg border-input-border-disabled text-input-text-disabled placeholder-input-text-disabled cursor-not-allowed",
    hasError && "border-input-error-border",
    showFocusGreen && "border-input-border-focus focus:shadow-[0_0_0_1px_var(--input-border-focus-box-shadow)]",
    className
  );

  return (
    <div className="w-full">
      <input
        className={states}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {hasError && typeof error === "string" && (
        <p className="mt-1 text-input-error-border text-sm font-inter-sans">{error}</p>
      )}
    </div>
  );
}