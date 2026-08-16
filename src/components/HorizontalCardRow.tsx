"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";
import { useAutoMarquee } from "@/hooks/useAutoMarquee";
import { useHorizontalWheel } from "@/hooks/useHorizontalWheel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const GAP = 12;
const CONTROL_HOLD_MS = 2000;
/* How long a click keeps stacking onto the previous paging target. */
const PENDING_WINDOW_MS = 800;

type HorizontalCardRowProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
};

function cloneChildren(children: ReactNode) {
  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child as ReactElement<{ decorative?: boolean }>, {
      key: `loop-${child.key ?? index}`,
      decorative: true,
    });
  });
}

export function HorizontalCardRow({
  ariaLabel,
  children,
  className,
}: HorizontalCardRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<{ target: number; at: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useHorizontalWheel(scrollerRef);
  const holdFor = useAutoMarquee(
    { scroller: scrollerRef, group: groupRef, clone: cloneRef },
    !reducedMotion,
  );

  /* Without the duplicated track there is no seamless wrap, so the controls
   * clamp at the edges and report an unavailable direction instead. */
  const seamless = !reducedMotion;

  const syncEdges = useCallback(() => {
    const track = scrollerRef.current;
    if (!track || seamless) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);
  }, [seamless]);

  useEffect(() => {
    if (seamless) return;
    const track = scrollerRef.current;
    if (!track) return;

    const frame = window.requestAnimationFrame(syncEdges);
    track.addEventListener("scroll", syncEdges, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener("scroll", syncEdges);
    };
  }, [seamless, syncEdges]);

  /* A seamless loop always has content in both directions. */
  const prevDisabled = !seamless && atStart;
  const nextDisabled = !seamless && atEnd;

  const page = useCallback(
    (direction: 1 | -1) => {
      const track = scrollerRef.current;
      const group = groupRef.current;
      const clone = cloneRef.current;
      if (!track || !group) return;

      holdFor(CONTROL_HOLD_MS);

      const card = group.firstElementChild as HTMLElement | null;
      const cardWidth = card ? card.getBoundingClientRect().width + GAP : 260;
      const perView = Math.max(1, Math.floor(track.clientWidth / cardWidth));
      const step = cardWidth * perView;
      const distance = clone ? clone.offsetLeft - group.offsetLeft : 0;
      const maxScroll = track.scrollWidth - track.clientWidth;

      /* Repeated clicks stack onto the pending target instead of restarting
       * from the position of an unfinished smooth scroll. */
      const now = performance.now();
      const pending = pendingRef.current;
      const inFlight = !!pending && now - pending.at < PENDING_WINDOW_MS;
      let base = inFlight && pending ? pending.target : track.scrollLeft;

      /* Rewinding a copy is only safe while the track is at rest; with a scroll
       * in flight the real position still trails the pending target. The auto
       * loop re-normalises seamlessly once motion resumes. */
      if (!inFlight && seamless && distance > 0) {
        if (base >= distance) {
          track.scrollLeft -= distance;
          base -= distance;
        } else if (base + direction * step < 0) {
          /* Jump forward one identical copy first: visually a no-op. */
          track.scrollLeft += distance;
          base += distance;
        }
      }

      let target = base + direction * step;

      target = Math.max(0, Math.min(target, maxScroll));
      pendingRef.current = { target, at: now };

      track.scrollTo({
        left: target,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [holdFor, reducedMotion, seamless],
  );

  const controlClass =
    "flex h-11 w-11 items-center justify-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";
  const enabledControl =
    "border-line bg-surface text-foreground hover:bg-surface-2 active:scale-95";
  const disabledControl =
    "border-transparent bg-surface/40 text-foreground/25 cursor-not-allowed";

  return (
    <div className={cn("relative", className)}>
      {/* Controls follow physical direction, so they stay LTR in an RTL page. */}
      <div dir="ltr" className="mb-2.5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={prevDisabled}
          aria-label={siteConfig.ui.prev}
          className={cn(controlClass, prevDisabled ? disabledControl : enabledControl)}
        >
          <ChevronLeftIcon className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={nextDisabled}
          aria-label={siteConfig.ui.next}
          className={cn(controlClass, nextDisabled ? disabledControl : enabledControl)}
        >
          <ChevronRightIcon className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        /* The track is mechanical: keep it LTR so scroll maths and the reveal
         * direction stay consistent regardless of document direction. */
        dir="ltr"
        className="no-scrollbar -mx-4 flex touch-pan-x overflow-x-auto overscroll-x-contain px-4 pb-1 sm:-mx-6 sm:px-6"
      >
        <div
          ref={groupRef}
          role="list"
          aria-label={ariaLabel}
          className="flex shrink-0 gap-3"
        >
          {children}
        </div>
        <div
          ref={cloneRef}
          className="marquee-clone ml-3 flex shrink-0 gap-3"
          aria-hidden="true"
          inert
        >
          {cloneChildren(children)}
        </div>
      </div>
    </div>
  );
}
