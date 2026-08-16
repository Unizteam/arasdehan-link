"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/site";

export function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function sharePage() {
    const url = window.location.href;
    const payload = {
      title: siteConfig.profile.name,
      text: siteConfig.profile.bio,
      url,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(payload);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={className}>
      <div className="relative">
        <button
          type="button"
          onClick={sharePage}
          aria-label={siteConfig.ui.share}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-foreground/6 text-foreground transition hover:bg-foreground/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <ShareIcon className="h-4 w-4" />
        </button>
        <span
          role="status"
          aria-live="polite"
          className={cn(
            "pointer-events-none absolute top-12 left-0 rounded-full bg-foreground px-3 py-1 text-xs font-medium whitespace-nowrap text-[#171716] shadow-lg transition",
            copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          {copied ? siteConfig.ui.linkCopied : ""}
        </span>
      </div>
    </div>
  );
}
