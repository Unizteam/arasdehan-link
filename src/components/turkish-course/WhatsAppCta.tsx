"use client";

import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type WhatsAppCtaProps = {
  href: string | null;
  unavailableLabel: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "header" | "final";
  className?: string;
  "aria-label"?: string;
};

const variants = {
  primary:
    "min-h-12 px-5 text-[14px] sm:min-h-[3.15rem] sm:px-6 bg-[#c43a32] text-[#f7f1e8] shadow-[0_16px_36px_-18px_rgba(196,58,50,0.85)] hover:bg-[#d2473e] hover:brightness-105",
  secondary:
    "min-h-12 px-5 text-[14px] sm:min-h-[3.15rem] sm:px-6 border border-foreground/20 bg-foreground/6 text-foreground hover:border-foreground/35 hover:bg-foreground/10",
  header:
    "min-h-10 w-10 px-0 sm:min-h-11 sm:w-auto sm:px-4 bg-[#c43a32] text-[#f7f1e8] hover:bg-[#d2473e] hover:brightness-105",
  final:
    "min-h-12 px-6 text-[14.5px] sm:min-h-[3.15rem] bg-[#f2ede4] text-[#1a1210] hover:bg-white",
};

export function WhatsAppCta({
  href,
  unavailableLabel,
  children,
  variant = "primary",
  className,
  "aria-label": ariaLabel,
}: WhatsAppCtaProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold transition duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    "disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    className,
  );

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={ariaLabel}
        title={unavailableLabel}
        className={classes}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={classes}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </a>
  );
}
