"use client";

import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Footer() {
  const reducedMotion = usePrefersReducedMotion();

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <footer className="mt-5 border-t border-line px-1 pt-6 pb-7 sm:pt-8 sm:pb-9">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center">
          <p className="brand text-[10px] tracking-[0.3em] text-muted uppercase">
            {siteConfig.ui.poweredBy}
          </p>
          <p className="brand mt-1.5 text-[1.5rem] leading-none font-bold tracking-[0.2em] text-foreground sm:text-[1.75rem]">
            ETVAVIDA
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-2.5 block h-px w-16 bg-gradient-to-r from-transparent via-foreground/35 to-transparent"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-3 border-t border-line pt-5 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-foreground/70">
            <span dir="ltr" className="ltr-token">
              © {siteConfig.year} {siteConfig.profile.name}
            </span>
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-[12px] text-foreground/70 transition hover:bg-foreground/6 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {siteConfig.ui.backToTop}
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
