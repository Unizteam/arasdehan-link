"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

/* LTR mechanical row: روز (left) → ساعت → دقیقه → ثانیه (right) */
const UNITS = [
  { key: "days", label: "روز" },
  { key: "hours", label: "ساعت" },
  { key: "minutes", label: "دقیقه" },
  { key: "seconds", label: "ثانیه" },
] as const;

type Remaining = Record<(typeof UNITS)[number]["key"], number>;

const ZERO: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

type CountdownState = {
  remaining: Remaining;
  ended: boolean;
};

const SERVER_SNAPSHOT: CountdownState = { remaining: ZERO, ended: false };

function toPersianDigits(value: number, pad: number) {
  const raw = Math.max(0, value).toString().padStart(pad, "0");
  return raw.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

function computeRemaining(targetMs: number, now = Date.now()): Remaining {
  const diff = Math.max(0, targetMs - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function getCountdownState(targetMs: number, now = Date.now()): CountdownState {
  return {
    remaining: computeRemaining(targetMs, now),
    ended: targetMs <= now,
  };
}

function statesEqual(a: CountdownState, b: CountdownState) {
  return (
    a.ended === b.ended &&
    a.remaining.days === b.remaining.days &&
    a.remaining.hours === b.remaining.hours &&
    a.remaining.minutes === b.remaining.minutes &&
    a.remaining.seconds === b.remaining.seconds
  );
}

function useCountdownState(targetMs: number, enabled: boolean): CountdownState {
  const [state, setState] = useState<CountdownState>(SERVER_SNAPSHOT);

  useEffect(() => {
    if (!enabled || Number.isNaN(targetMs)) return;

    const tick = () => {
      const next = getCountdownState(targetMs);
      setState((prev) => (statesEqual(prev, next) ? prev : next));
    };

    tick();
    const id = window.setInterval(tick, 1000);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, targetMs]);

  return enabled ? state : SERVER_SNAPSHOT;
}

type NeoTrackedCountdownLiveProps = {
  className?: string;
  decorative?: boolean;
};

export function NeoTrackedCountdownLive({
  className,
  decorative = false,
}: NeoTrackedCountdownLiveProps) {
  const targetMs = new Date(siteConfig.countdownTarget).getTime();
  const enabled = !decorative && !Number.isNaN(targetMs);
  const { remaining, ended } = useCountdownState(targetMs, enabled);
  const display = decorative ? ZERO : remaining;
  const showEnded = enabled && ended;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-center bg-[#141816] px-1.5 py-2 sm:px-3",
        className,
      )}
      aria-hidden={decorative ? true : undefined}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(69,210,192,0.08),transparent_70%)]"
      />

      <div
        dir="ltr"
        className="relative grid grid-cols-4 gap-0.5 sm:gap-1.5"
        role="timer"
        aria-live="off"
      >
        {UNITS.map((unit) => {
          const pad = unit.key === "days" ? 4 : 2;
          const value = display[unit.key];
          const accent = unit.key === "seconds";

          return (
            <div key={unit.key} className="flex min-w-0 flex-col items-center gap-0.5">
              <div
                className={cn(
                  "flex h-[34px] w-full items-center justify-center rounded-[9px] border border-line/80 bg-surface/90 px-0.5 sm:h-auto sm:rounded-[12px] sm:py-2",
                  accent && "border-accent-neo/35 bg-accent-neo/10",
                )}
              >
                <span
                  dir="ltr"
                  className={cn(
                    "tabular-nums [unicode-bidi:isolate] text-[13px] font-semibold tracking-tight sm:text-[17px]",
                    accent ? "text-accent-neo" : "text-foreground",
                  )}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {toPersianDigits(value, pad)}
                </span>
              </div>
              <span className="text-[8.5px] text-muted sm:text-[10px]">{unit.label}</span>
            </div>
          );
        })}
      </div>

      {showEnded ? (
        <p className="relative mt-1.5 text-center text-[10px] font-semibold text-accent-neo sm:text-[11px]">
          زمان به پایان رسید
        </p>
      ) : null}
    </div>
  );
}
