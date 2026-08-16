/** Shared sizing tokens for horizontal carousel detail cards. */
export const carouselDetailCard = {
  /** Outer flex item — ~82vw mobile peek, ~280px tablet, ~300px desktop */
  item: "w-[82vw] shrink-0 sm:w-[280px] md:w-[300px]",
  /** Fixed total height so text length cannot stretch cards */
  shell: "flex h-[252px] flex-col sm:h-[260px]",
  media: "relative h-[148px] w-full shrink-0 overflow-hidden bg-[#1b1b1a] sm:h-[156px]",
  imageOnlyMedia:
    "relative h-full w-full shrink-0 overflow-hidden bg-[#1b1b1a]",
  body: "flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-3",
  title:
    "line-clamp-2 min-h-[3rem] text-[14.5px] leading-6 font-semibold text-foreground",
  description:
    "mt-1 line-clamp-2 min-h-[2.55rem] text-[12.5px] leading-[1.7] text-muted",
  radius: "overflow-hidden rounded-[16px]",
  ring: "ring-1 ring-line shadow-[0_14px_30px_-24px_rgba(0,0,0,0.9)]",
} as const;

export const carouselInlineCard = {
  item: "w-[78vw] shrink-0 sm:w-[340px] md:w-[376px]",
} as const;
