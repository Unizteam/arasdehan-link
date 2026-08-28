"use client";

import { useState } from "react";
import Link from "next/link";
import { CardImage } from "@/components/CardMedia";
import { TurkishFlagBadge } from "@/components/TurkishFlagBadge";
import {
  ChevronDownIcon,
  GroupIcon,
  OnlineIcon,
  PracticeIcon,
  SpeakingIcon,
} from "@/components/turkish-course/CourseIcons";
import { WhatsAppCta } from "@/components/turkish-course/WhatsAppCta";
import { courseContent, type CourseLang } from "@/data/turkish-course";
import { useCourseLanguage } from "@/hooks/useCourseLanguage";
import { cn } from "@/lib/cn";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const formatIcons = {
  online: OnlineIcon,
  speaking: SpeakingIcon,
  practice: PracticeIcon,
  group: GroupIcon,
} as const;

export function TurkishCoursePage() {
  const { lang, setLang, dir } = useCourseLanguage();
  const copy = courseContent[lang];
  const whatsappHref = getWhatsAppUrl(lang);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      dir={dir}
      lang={lang}
      id="top"
      className={cn(
        "course-backdrop min-h-screen text-foreground",
        lang === "tr" && "font-brand",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-[#171716] focus:outline-2 focus:outline-offset-2"
      >
        {copy.skip}
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-[#121211]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 min-[400px]:gap-3 min-[400px]:px-4 sm:px-6">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2 rounded-full py-1 pe-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <TurkishFlagBadge
              className="h-7 w-7 sm:h-8 sm:w-8"
              label={copy.flagLabel}
            />
            <span
              dir="ltr"
              className="brand text-[13.5px] font-semibold tracking-tight min-[400px]:text-[15px] sm:text-[17px]"
            >
              {copy.brand}
            </span>
          </a>

          <nav
            aria-label={copy.pageNav}
            className="ms-2 hidden items-center gap-1 lg:flex"
          >
            <HeaderNavLinks copy={copy} />
          </nav>

          <div className="ms-auto flex shrink-0 items-center gap-2">
            <LanguageSwitcher
              lang={lang}
              label={copy.language}
              onChange={setLang}
            />
            <WhatsAppCta
              href={whatsappHref}
              unavailableLabel={copy.whatsappUnavailable}
              variant="header"
              aria-label={copy.headerCta}
            >
              <span className="hidden sm:inline">{copy.headerCta}</span>
            </WhatsAppCta>
          </div>
        </div>

        <nav
          aria-label={copy.pageNav}
          className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-3 py-2 min-[400px]:px-4 lg:hidden"
        >
          <HeaderNavLinks copy={copy} compact />
        </nav>
      </header>

      <main id="main">
        <section className="relative isolate min-h-[32rem] overflow-hidden sm:min-h-[38rem] lg:min-h-[42rem]">
          <div className="absolute inset-0">
            <CardImage
              src="/media/turkish/hero.webp"
              alt=""
              objectPosition="center 22%"
              priority
              className="scale-[1.04]"
            />
            <div className="course-hero-veil absolute inset-0" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-4 pb-12 pt-16 sm:min-h-[38rem] sm:px-6 sm:pb-16 lg:min-h-[42rem] lg:pb-20">
            <p className="course-fade text-[11px] font-semibold tracking-[0.22em] text-[#e8b2ab] uppercase">
              <span dir="ltr" className="brand">
                {copy.heroEyebrow}
              </span>
            </p>
            <h1 className="course-fade course-fade-delay-1 mt-3 max-w-none text-[1.5rem] leading-[1.4] font-semibold text-[#f7f1e8] min-[390px]:text-[1.7rem] sm:max-w-[18ch] sm:text-[2.7rem] sm:leading-[1.28] lg:text-[3.15rem]">
              {copy.heroTitle}
            </h1>
            <p className="course-fade course-fade-delay-2 mt-4 max-w-xl text-[15px] leading-[1.9] text-[#f2ede4]/80 sm:text-[17px]">
              {copy.heroDescription}
            </p>
            <div className="course-fade course-fade-delay-3 mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <WhatsAppCta
                href={whatsappHref}
                unavailableLabel={copy.whatsappUnavailable}
                variant="primary"
                className="w-full sm:w-auto"
              >
                {copy.heroPrimary}
              </WhatsAppCta>
              <a
                href="#info"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-foreground/20 bg-foreground/8 px-5 text-[14px] font-semibold text-foreground backdrop-blur-sm transition hover:border-foreground/35 hover:bg-foreground/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:min-h-[3.15rem] sm:w-auto sm:px-6"
              >
                {copy.heroSecondary}
              </a>
            </div>
            {!whatsappHref ? (
              <p className="course-fade course-fade-delay-3 mt-4 max-w-md text-[13px] text-[#f2ede4]/65">
                {copy.whatsappUnavailable}
              </p>
            ) : null}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <section
            id="info"
            aria-labelledby="info-heading"
            className="scroll-mt-32 border-t border-line py-14 sm:scroll-mt-24 sm:py-16"
          >
            <span
              aria-hidden="true"
              className="mb-3 block h-px w-10 bg-[#c43a32]"
            />
            <h2
              id="info-heading"
              dir={copy.businessTitleDir}
              className="max-w-2xl text-[1.4rem] leading-[1.45] font-semibold sm:text-[1.85rem]"
            >
              {copy.businessTitle}
            </h2>
            <p
              dir={copy.businessBodyDir}
              className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-foreground/88 sm:text-[16px]"
            >
              {copy.businessDescription}
            </p>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.85] text-muted sm:text-[15px]">
              {copy.businessContact}
            </p>
          </section>

          <section
            id="audience"
            aria-labelledby="audience-heading"
            className="scroll-mt-32 border-t border-line py-14 sm:scroll-mt-24 sm:py-16"
          >
            <SectionIntro
              titleId="audience-heading"
              title={copy.audienceHeading}
            />
            <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2">
              {copy.audience.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 rounded-[18px] bg-surface px-4 py-4 ring-1 ring-line sm:px-5 sm:py-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c43a32] shadow-[0_0_0_4px_rgba(196,58,50,0.16)]"
                  />
                  <p className="text-[14.5px] leading-[1.8] text-foreground/90">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="format"
            aria-labelledby="format-heading"
            className="scroll-mt-32 border-t border-line py-14 sm:scroll-mt-24 sm:py-16"
          >
            <SectionIntro titleId="format-heading" title={copy.formatHeading} />
            <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4">
              {copy.format.map((item) => {
                const Icon = formatIcons[item.id];
                return (
                  <li
                    key={item.id}
                    className="rounded-[18px] bg-surface px-4 py-5 ring-1 ring-line sm:px-5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#c43a32]/12 text-[#e8b2ab]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-[13px] leading-[1.7] font-semibold sm:text-[15px]">
                      {item.title}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section
            id="faq"
            aria-labelledby="faq-heading"
            className="scroll-mt-32 border-t border-line py-14 sm:scroll-mt-24 sm:py-16"
          >
            <SectionIntro titleId="faq-heading" title={copy.faqHeading} />
            <div className="mt-8 overflow-hidden rounded-[20px] bg-surface ring-1 ring-line">
              {copy.faq.map((item, index) => {
                const open = openFaq === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                  <div
                    key={item.q}
                    className={cn(
                      index > 0 && "border-t border-line",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenFaq((current) =>
                            current === index ? null : index,
                          )
                        }
                        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-4 text-start text-[15px] leading-[1.7] font-semibold transition hover:bg-foreground/4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground sm:min-h-16 sm:gap-4 sm:px-6 sm:text-[16px]"
                      >
                        <span className="min-w-0 flex-1">{item.q}</span>
                        <ChevronDownIcon
                          className={cn(
                            "h-5 w-5 shrink-0 text-muted transition duration-200",
                            open && "rotate-180 text-foreground",
                          )}
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!open}
                      className="px-4 pb-5 sm:px-6"
                    >
                      <p className="max-w-2xl text-[14px] leading-[1.9] text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            id="contact"
            aria-labelledby="cta-heading"
            className="scroll-mt-32 border-t border-line py-14 sm:scroll-mt-24 sm:py-16"
          >
            <div className="course-cta relative overflow-hidden rounded-[24px] px-5 py-10 sm:px-10 sm:py-12">
              <h2
                id="cta-heading"
                className="max-w-xl text-[1.45rem] leading-[1.45] font-semibold sm:text-[1.85rem]"
              >
                {copy.ctaHeading}
              </h2>
              <p className="mt-3 max-w-lg text-[14.5px] leading-[1.9] text-[#f2ede4]/78">
                {copy.ctaDescription}
              </p>
              <div className="mt-7">
                <WhatsAppCta
                  href={whatsappHref}
                  unavailableLabel={copy.whatsappUnavailable}
                  variant="final"
                >
                  {copy.ctaButton}
                </WhatsAppCta>
              </div>
              {!whatsappHref ? (
                <p className="mt-4 max-w-md text-[13px] text-[#f2ede4]/65">
                  {copy.whatsappUnavailable}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[12.5px] text-foreground/65">
            <span dir="ltr" className="ltr-token">
              {copy.brand}
            </span>
          </p>
          <Link
            href="/"
            className="inline-flex min-h-10 items-center rounded-full px-3 text-[13px] text-foreground/70 transition hover:bg-foreground/6 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {copy.home}
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SectionIntro({ titleId, title }: { titleId: string; title: string }) {
  return (
    <div>
      <span
        aria-hidden="true"
        className="mb-3 block h-px w-10 bg-[#c43a32]"
      />
      <h2
        id={titleId}
        className="max-w-xl text-[1.4rem] leading-[1.45] font-semibold sm:text-[1.7rem]"
      >
        {title}
      </h2>
    </div>
  );
}

function HeaderNavLinks({
  copy,
  compact = false,
}: {
  copy: (typeof courseContent)[CourseLang];
  compact?: boolean;
}) {
  const items = [
    { href: "#info", label: copy.nav.info },
    { href: "#format", label: copy.nav.format },
    { href: "#faq", label: copy.nav.faq },
  ];

  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "inline-flex items-center rounded-full text-foreground/70 transition hover:bg-foreground/6 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
            compact
              ? "min-h-10 shrink-0 px-3 text-[13px] font-medium whitespace-nowrap"
              : "min-h-10 px-3.5 text-[13.5px] font-medium",
          )}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

function LanguageSwitcher({
  lang,
  label,
  onChange,
}: {
  lang: CourseLang;
  label: string;
  onChange: (lang: CourseLang) => void;
}) {
  const options: Array<{ id: CourseLang; text: string; dir: "rtl" | "ltr" }> = [
    { id: "fa", text: "فارسی", dir: "rtl" },
    { id: "tr", text: "Türkçe", dir: "ltr" },
  ];

  return (
    <div
      role="group"
      aria-label={label}
      className="flex rounded-full bg-foreground/6 p-0.5 ring-1 ring-line"
    >
      {options.map((option) => {
        const selected = lang === option.id;
        return (
          <button
            key={option.id}
            type="button"
            dir={option.dir}
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex min-h-9 items-center rounded-full px-2 text-[11.5px] font-medium transition min-[400px]:px-2.5 min-[400px]:text-[12px] sm:min-h-10 sm:px-3 sm:text-[12.5px]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
              selected
                ? "bg-surface-2 text-foreground shadow-[0_2px_10px_-6px_rgba(0,0,0,0.9)]"
                : "text-foreground/60 hover:text-foreground",
            )}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}
