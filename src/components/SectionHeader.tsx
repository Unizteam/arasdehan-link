import type { ReactNode } from "react";

import { ChevronLeftIcon } from "@/components/icons";

import { SafeLink } from "@/components/SafeLink";

import { siteConfig } from "@/data/site";

import { hasHttpUrl } from "@/lib/links";



type SectionHeaderProps = {

  emoji: string;

  title: string;

  subtitle?: string;

  href?: string;

  titleLeading?: ReactNode;

  titleDir?: "ltr" | "rtl";

};



export function SectionHeader({

  emoji,

  title,

  subtitle,

  href,

  titleLeading,

  titleDir,

}: SectionHeaderProps) {

  const enabled = hasHttpUrl(href);



  return (

    <div className="mb-3.5 sm:mb-4">

      <div className="flex items-center justify-between gap-2">

        <h2 className="flex min-w-0 items-center gap-2 text-[1.22rem] leading-[1.5] font-semibold text-foreground sm:text-[1.55rem]">

          {titleLeading ? (

            <span

              dir={titleDir ?? "ltr"}

              className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3"

            >

              {titleLeading}

              <span className="min-w-0">{title}</span>

            </span>

          ) : (

            <>

              {emoji ? (

                <span aria-hidden="true" className="shrink-0 text-[1.05em] leading-none">

                  {emoji}

                </span>

              ) : null}

              <span className="min-w-0">{title}</span>

            </>

          )}

        </h2>

        {enabled ? (

          <SafeLink

            href={href}

            aria-label={`${siteConfig.ui.open}: ${title}`}

            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/70 transition hover:bg-foreground/8 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

          >

            <ChevronLeftIcon className="h-5 w-5" />

          </SafeLink>

        ) : null}

      </div>

      {subtitle ? (

        <p className="mt-1 max-w-xl text-[13px] leading-[1.8] text-muted sm:text-[14px]">

          {subtitle}

        </p>

      ) : null}

    </div>

  );

}

