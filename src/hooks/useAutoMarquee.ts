"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const SPEED_PX_PER_SECOND = 26;
const RESUME_DELAY_MS = 2000;
const HOVER_RESUME_DELAY_MS = 900;
/* Anything larger than this between our written position and the observed one
 * came from the user, not from us. */
const MANUAL_SCROLL_TOLERANCE = 2;

type AutoMarqueeRefs = {
  scroller: RefObject<HTMLElement | null>;
  group: RefObject<HTMLElement | null>;
  clone: RefObject<HTMLElement | null>;
};

/**
 * Slowly translates a horizontal track so cards on the right enter the view.
 * Returns a `holdFor` handle so external controls can pause the motion.
 */
export function useAutoMarquee(
  { scroller, group, clone }: AutoMarqueeRefs,
  enabled: boolean,
) {
  const holdHandle = useRef<(ms: number) => void>(() => {});

  useEffect(() => {
    if (!enabled) {
      holdHandle.current = () => {};
      return;
    }

    const track = scroller.current;
    const firstGroup = group.current;
    const cloneGroup = clone.current;
    if (!track || !firstGroup || !cloneGroup) return;

    let frame = 0;
    let lastFrame = performance.now();
    let resumeAt = 0;
    let hovered = false;
    let onScreen = true;
    /* Sub-pixel accumulator: scrollLeft alone loses fractional steps. */
    let offset = track.scrollLeft;
    let written = track.scrollLeft;

    const holdFor = (ms: number) => {
      resumeAt = performance.now() + ms;
    };
    holdHandle.current = holdFor;

    const onPointerDown = () => holdFor(Number.MAX_SAFE_INTEGER);
    const onPointerRelease = () => holdFor(RESUME_DELAY_MS);
    const onInput = () => holdFor(RESUME_DELAY_MS);
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
      holdFor(HOVER_RESUME_DELAY_MS);
    };

    /* Never treat our own writes as user input: the scroll event is async, so
     * compare against the position we last observed after writing. */
    const onScroll = () => {
      if (Math.abs(track.scrollLeft - written) <= MANUAL_SCROLL_TOLERANCE) return;
      offset = track.scrollLeft;
      written = track.scrollLeft;
    };

    const loopDistance = () => cloneGroup.offsetLeft - firstGroup.offsetLeft;

    const tick = (now: number) => {
      const delta = Math.min(now - lastFrame, 50) / 1000;
      lastFrame = now;

      const canMove =
        !hovered &&
        onScreen &&
        now >= resumeAt &&
        document.visibilityState === "visible" &&
        track.scrollWidth > track.clientWidth + 8;

      if (canMove) {
        offset += SPEED_PX_PER_SECOND * delta;

        const distance = loopDistance();
        if (distance > 0 && offset >= distance) {
          offset -= distance;
        }

        track.scrollLeft = offset;
        written = track.scrollLeft;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(track);

    frame = window.requestAnimationFrame(tick);

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("touchstart", onPointerDown, { passive: true });
    /* Release is tracked on the window: a drag often ends outside the row. */
    window.addEventListener("pointerup", onPointerRelease);
    window.addEventListener("pointercancel", onPointerRelease);
    window.addEventListener("touchend", onPointerRelease, { passive: true });
    track.addEventListener("wheel", onInput, { passive: true });
    track.addEventListener("keydown", onInput);
    track.addEventListener("focusin", onPointerDown);
    track.addEventListener("focusout", onPointerRelease);
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      holdHandle.current = () => {};
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("pointerup", onPointerRelease);
      window.removeEventListener("pointercancel", onPointerRelease);
      window.removeEventListener("touchend", onPointerRelease);
      track.removeEventListener("wheel", onInput);
      track.removeEventListener("keydown", onInput);
      track.removeEventListener("focusin", onPointerDown);
      track.removeEventListener("focusout", onPointerRelease);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("scroll", onScroll);
    };
  }, [clone, enabled, group, scroller]);

  return useCallback((ms: number) => holdHandle.current(ms), []);
}
