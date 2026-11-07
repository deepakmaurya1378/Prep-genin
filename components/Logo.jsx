import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700"], display: "swap" });

/**
 * Prep-Genin brand logo ("Facet Spark"): an AI sparkle cut like a gem,
 * with light and shadow facets, followed by the wordmark.
 *
 * variant: "auto" follows light/dark theme, "light" is for dark backgrounds.
 * size: "sm" | "md" | "lg"
 * showText: false renders just the mark.
 */
export function LogoMark({ size = 32, variant = "auto", className = "" }) {
  const light =
    variant === "light" ? "fill-[#6b8bff]" : "fill-[#2f5bff] dark:fill-[#6b8bff]";
  const shadow =
    variant === "light" ? "fill-[#3d5cf0]" : "fill-[#1736c9] dark:fill-[#3d5cf0]";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path className={light} d="M16 16L16 2L19.5 12.5zM16 16L30 16L19.5 19.5zM16 16L16 30L12.5 19.5zM16 16L2 16L12.5 12.5z" />
      <path className={shadow} d="M16 16L19.5 12.5L30 16zM16 16L19.5 19.5L16 30zM16 16L12.5 19.5L2 16zM16 16L12.5 12.5L16 2z" />
    </svg>
  );
}

export default function Logo({ variant = "auto", size = "md", showText = true, className = "" }) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 30, text: "text-[1.4rem]" },
    lg: { icon: 36, text: "text-[1.75rem]" },
  }[size];

  const textColor = variant === "light" ? "text-white" : "text-slate-900 dark:text-white";

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <LogoMark size={sizes.icon} variant={variant} />
      {showText && (
        <span
          className={`${jakarta.className} ${sizes.text} ${textColor} font-bold leading-none tracking-[-0.04em]`}
        >
          PrepGenin
        </span>
      )}
    </span>
  );
}
