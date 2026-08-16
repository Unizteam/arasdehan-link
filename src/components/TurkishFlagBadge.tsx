import { cn } from "@/lib/cn";

type TurkishFlagBadgeProps = {
  className?: string;
  label?: string;
};

/** Circular Turkish flag for the Türkçe Kursum section heading. */
export function TurkishFlagBadge({
  className,
  label = "پرچم ترکیه",
}: TurkishFlagBadgeProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex shrink-0">
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
        className={cn(
          "h-7 w-7 shrink-0 rounded-full shadow-[0_2px_10px_-3px_rgba(0,0,0,0.65)] ring-1 ring-white/15 sm:h-9 sm:w-9",
          className,
        )}
      >
        <circle cx="20" cy="20" r="20" fill="#E30A17" />
        <circle cx="17.5" cy="20" r="7.5" fill="#ffffff" />
        <circle cx="19.5" cy="20" r="6" fill="#E30A17" />
        <polygon
          fill="#ffffff"
          points="27,20 29.2,21.6 28.4,19 30.6,17.4 27.8,17.4 27,14.8 26.2,17.4 23.4,17.4 25.6,19 24.8,21.6"
        />
      </svg>
    </span>
  );
}
