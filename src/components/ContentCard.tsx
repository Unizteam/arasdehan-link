import { cloneElement, isValidElement, type ReactNode } from "react";
import { CardMedia } from "@/components/CardMedia";
import { SafeLink } from "@/components/SafeLink";
import { siteConfig } from "@/data/site";
import { carouselDetailCard, carouselInlineCard } from "@/lib/carousel-card";
import { cn } from "@/lib/cn";
import { hasLink } from "@/lib/links";
import type { CardVariant } from "@/types/site";

type ContentCardProps = {
  variant: CardVariant;
  title: string;
  description?: string;
  href?: string;
  imageSrc?: string;
  imageAlt: string;
  objectPosition?: string;
  videoSrc?: string;
  posterSrc?: string;
  visual?: ReactNode;
  ctaLabel?: string;
  decorative?: boolean;
};

function withDecorativeVisual(visual: ReactNode, decorative: boolean) {
  if (!decorative || !visual || !isValidElement<{ decorative?: boolean }>(visual)) {
    return visual;
  }
  return cloneElement(visual, { decorative: true });
}

export function ContentCard({
  variant,
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  objectPosition,
  videoSrc,
  posterSrc,
  visual,
  ctaLabel,
  decorative = false,
}: ContentCardProps) {
  const enabled = hasLink(href);
  const isInline = variant === "inline";
  const isImageOnly =
    !isInline && !title.trim() && !(description?.trim() ?? "");
  const label = title.trim() || imageAlt;
  const widthClass = isInline ? carouselInlineCard.item : carouselDetailCard.item;
  const shellClass = cn(
    "overflow-hidden bg-surface",
    carouselDetailCard.radius,
    carouselDetailCard.ring,
    !isInline && carouselDetailCard.shell,
  );

  const hasMedia = !!(imageSrc || videoSrc);
  const mediaNode = withDecorativeVisual(visual, decorative);
  const media = hasMedia ? (
    <CardMedia
      image={imageSrc}
      imageAlt={imageAlt}
      objectPosition={objectPosition}
      video={decorative ? undefined : videoSrc}
      poster={posterSrc || imageSrc}
      className="h-full w-full object-cover"
    />
  ) : (
    mediaNode
  );

  const body = isInline ? (
    <div className="flex min-h-[116px] gap-3 p-3">
      <div className="h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[12px]">
        {media}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        {decorative ? (
          <p className="text-[14.5px] leading-6 font-semibold text-foreground">
            {title}
          </p>
        ) : (
          <h3 className="text-[14.5px] leading-6 font-semibold text-foreground">
            {title}
          </h3>
        )}
        {description ? (
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.7] text-muted">
            {description}
          </p>
        ) : null}
        {ctaLabel ? (
          <span
            className={cn(
              "mt-2 inline-flex min-h-8 w-fit items-center rounded-full border px-3 text-[12px] font-medium",
              enabled
                ? "border-foreground/25 text-foreground"
                : "border-line text-foreground/40",
            )}
          >
            {ctaLabel}
          </span>
        ) : null}
      </div>
    </div>
  ) : isImageOnly ? (
    <div className={carouselDetailCard.imageOnlyMedia}>{media}</div>
  ) : (
    <>
      <div className={carouselDetailCard.media}>{media}</div>
      <div className={carouselDetailCard.body}>
        {decorative ? (
          <p className={carouselDetailCard.title}>{title}</p>
        ) : (
          <h3 className={carouselDetailCard.title}>{title}</h3>
        )}
        {description ? (
          <p className={carouselDetailCard.description}>{description}</p>
        ) : (
          <div className={carouselDetailCard.description} aria-hidden="true" />
        )}
      </div>
    </>
  );

  if (decorative) {
    return (
      <div
        dir={siteConfig.direction}
        className={cn("shrink-0", widthClass)}
        aria-hidden="true"
      >
        <div className={shellClass}>{body}</div>
      </div>
    );
  }

  return (
    <div dir={siteConfig.direction} role="listitem" className={cn("shrink-0", widthClass)}>
      <SafeLink
        href={href}
        aria-label={enabled ? label : `${label} — ${siteConfig.ui.comingSoon}`}
        className={cn(
          shellClass,
          "block transition duration-300 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        )}
        disabledClassName="cursor-default hover:bg-surface"
      >
        {body}
      </SafeLink>
    </div>
  );
}
