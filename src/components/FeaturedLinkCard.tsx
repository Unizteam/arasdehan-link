import type { ReactNode } from "react";
import { CardMedia } from "@/components/CardMedia";
import { ExternalIcon, MailIcon } from "@/components/icons";
import { SafeLink } from "@/components/SafeLink";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { hasHttpUrl, hasLink, isMailto } from "@/lib/links";
import type { AccentId } from "@/types/site";

const accentText: Record<AccentId, string> = {
  neo: "text-accent-neo",
  uni: "text-accent-uni",
  etva: "text-accent-etva",
  tr: "text-accent-tr",
  tg: "text-accent-tg",
};

const accentFill: Record<AccentId, string> = {
  neo: "bg-accent-neo text-[#06231f]",
  uni: "bg-accent-uni text-[#1e1608]",
  etva: "bg-accent-etva text-[#150f2c]",
  tr: "bg-accent-tr text-[#1f0a06]",
  tg: "bg-accent-tg text-[#04121d]",
};

type FeaturedLinkCardProps = {
  href?: string;
  imageSrc?: string;
  imageAlt: string;
  objectPosition?: string;
  videoSrc?: string;
  posterSrc?: string;
  visual?: ReactNode;
  title: string;
  message: string;
  description?: string;
  meta?: string;
  ctaLabel: string;
  badge?: string;
  accent?: AccentId;
};

export function FeaturedLinkCard({
  href,
  imageSrc,
  imageAlt,
  objectPosition,
  videoSrc,
  posterSrc,
  visual,
  title,
  message,
  description,
  meta,
  ctaLabel,
  badge,
  accent = "neo",
}: FeaturedLinkCardProps) {
  const enabled = hasLink(href);

  return (
    <SafeLink
      href={href}
      aria-label={
        enabled ? ctaLabel : `${title} — ${siteConfig.ui.comingSoon}`
      }
      className="group block rounded-[16px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      disabledClassName="cursor-default"
    >
      <article className="overflow-hidden rounded-[16px] bg-surface ring-1 ring-line shadow-[0_14px_34px_-22px_rgba(0,0,0,0.85)] transition duration-300 group-hover:bg-surface-2">
        <div className="flex min-h-[136px] flex-row sm:min-h-[172px] md:min-h-[200px]">
          <div className="relative w-[38%] min-w-[116px] shrink-0 overflow-hidden bg-[#1b1b1a]">
            {imageSrc || videoSrc ? (
              <CardMedia
                image={imageSrc}
                imageAlt={imageAlt}
                objectPosition={objectPosition}
                video={videoSrc}
                poster={posterSrc}
                priority
                className="min-h-full"
              />
            ) : (
              visual
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3.5 sm:px-5 sm:py-4">
            {badge ? (
              <span className="mb-2 inline-flex w-fit rounded-full border border-line px-2.5 py-0.5 text-[10.5px] font-medium text-foreground/75">
                {badge}
              </span>
            ) : null}
            <p
              className={cn(
                "brand text-[10.5px] font-semibold tracking-[0.16em] uppercase sm:text-[11px]",
                accentText[accent],
              )}
            >
              {title}
            </p>
            <h3 className="mt-1.5 text-[1.05rem] leading-[1.55] font-semibold text-foreground sm:text-[1.32rem] sm:leading-[1.5]">
              {message}
            </h3>
            {description ? (
              <p className="mt-1.5 hidden text-[13px] leading-[1.75] text-muted sm:block">
                {description}
              </p>
            ) : null}
            {meta ? (
              <p className="mt-2 text-[12px] text-foreground/45">{meta}</p>
            ) : null}
            <span
              className={cn(
                "mt-3 inline-flex min-h-10 w-fit items-center gap-2 rounded-full px-3.5 text-[12.5px] font-semibold transition sm:mt-4 sm:min-h-11 sm:px-4 sm:text-[13px]",
                enabled
                  ? cn(accentFill[accent], "group-hover:brightness-110")
                  : "border border-line text-foreground/45",
              )}
            >
              {ctaLabel}
              {hasHttpUrl(href) ? <ExternalIcon className="h-3.5 w-3.5" /> : null}
              {isMailto(href) ? <MailIcon className="h-4 w-4" /> : null}
            </span>
          </div>
        </div>
      </article>
    </SafeLink>
  );
}
