"use client";

import { useEffect, useRef } from "react";
import { SafeLink } from "@/components/SafeLink";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { hasHttpUrl } from "@/lib/links";

type CategoryNavigationProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

const tabClass = (isActive: boolean) =>
  cn(
    "flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-[13.5px] font-medium whitespace-nowrap transition sm:text-[14px]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    isActive
      ? "bg-surface-2 text-foreground shadow-[0_2px_12px_-6px_rgba(0,0,0,0.9)]"
      : "bg-transparent text-foreground/65 hover:bg-foreground/6 hover:text-foreground",
  );

export function CategoryNavigation({
  activeId,
  onSelect,
}: CategoryNavigationProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>(
      `[data-category="${activeId}"]`,
    );
    if (!scroller || !active) return;

    /*
     * Only the strip may move. scrollIntoView is avoided here because this bar
     * is sticky: it would scroll the page to the bar's unstuck position.
     */
    const max = scroller.scrollWidth - scroller.clientWidth;
    if (max <= 0) return;

    const centred =
      active.offsetLeft + active.offsetWidth / 2 - scroller.clientWidth / 2;
    const physical = Math.max(0, Math.min(centred, max));
    /* RTL scrollLeft runs from -max (left end) to 0 (right end) in Chrome. */
    const isRtl = getComputedStyle(scroller).direction === "rtl";

    scroller.scrollTo({
      left: isRtl ? physical - max : physical,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeId, reducedMotion]);

  return (
    <nav
      aria-label={siteConfig.ui.categoriesNav}
      className="sticky top-0 z-40 -mx-4 border-b border-line bg-shell/88 px-4 py-2 backdrop-blur-xl sm:-mx-6 sm:px-6 sm:py-2.5"
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar flex touch-pan-x gap-1.5 overflow-x-auto overscroll-x-contain sm:gap-2"
      >
        {siteConfig.categories.map((category) => {
          const isActive = category.id === activeId;
          const href = category.hrefKey
            ? siteConfig.links[category.hrefKey]
            : undefined;
          const external = hasHttpUrl(href);

          const label = (
            <>
              {category.emoji ? (
                <span aria-hidden="true">{category.emoji}</span>
              ) : null}
              {category.label}
            </>
          );

          if (external) {
            return (
              <SafeLink
                key={category.id}
                href={href}
                data-category={category.id}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${siteConfig.ui.open}: ${category.label}`}
                className={tabClass(isActive)}
              >
                {label}
              </SafeLink>
            );
          }

          return (
            <button
              key={category.id}
              type="button"
              data-category={category.id}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelect(category.id)}
              className={tabClass(isActive)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
