import { ContentCard } from "@/components/ContentCard";
import { FeaturedLinkCard } from "@/components/FeaturedLinkCard";
import { HorizontalCardRow } from "@/components/HorizontalCardRow";
import { SectionHeader } from "@/components/SectionHeader";
import { TurkishFlagBadge } from "@/components/TurkishFlagBadge";
import { NeoTrackedCountdownLive } from "@/components/visuals/NeoTrackedCountdownLive";
import { ProjectVisual } from "@/components/visuals/Visuals";
import { siteConfig } from "@/data/site";
import { hasEmail, mailtoHref } from "@/lib/links";
import type { CategorySection, HorizontalItem, LinkKey } from "@/types/site";

/** Email keys become mail actions; everything else is used as a plain URL. */
function resolveHref(hrefKey: LinkKey) {
  const value = siteConfig.links[hrefKey];
  if (hrefKey === "CONTACT_EMAIL") {
    return hasEmail(value) ? mailtoHref(value) : "";
  }
  return value;
}

function renderRowVisual(item: HorizontalItem) {
  if (item.visualKey === "neotracked-countdown") {
    return <NeoTrackedCountdownLive className="h-full w-full" />;
  }

  if (item.visualKey) {
    return <ProjectVisual visualKey={item.visualKey} />;
  }

  return undefined;
}

export function ProjectSection({ section }: { section: CategorySection }) {
  const href = resolveHref(section.hrefKey);
  const featured = section.featured;
  const hasFeaturedMedia = !!(featured.image || featured.video);

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-[68px] border-t border-line pt-6 pb-1 sm:scroll-mt-[76px] sm:pt-8 sm:pb-2"
    >
      <div id={`${section.id}-heading`}>
        <SectionHeader
          emoji={section.emoji}
          title={section.title}
          subtitle={section.subtitle}
          href={href}
          titleLeading={
            section.id === "turkish-course" ? (
              <TurkishFlagBadge className="h-7 w-7 sm:h-9 sm:w-9" />
            ) : undefined
          }
          titleDir={section.id === "turkish-course" ? "ltr" : undefined}
        />
      </div>

      <FeaturedLinkCard
        href={href}
        imageSrc={featured.image}
        imageAlt={featured.imageAlt ?? featured.title}
        objectPosition={featured.objectPosition}
        videoSrc={featured.video}
        posterSrc={featured.poster}
        visual={
          hasFeaturedMedia || !featured.visualKey ? undefined : (
            <ProjectVisual visualKey={featured.visualKey} />
          )
        }
        title={featured.title}
        message={featured.message}
        description={featured.description}
        meta={featured.meta}
        ctaLabel={featured.ctaLabel}
        badge={featured.badge}
        accent={section.accent}
      />

      {section.row ? (
        <HorizontalCardRow ariaLabel={section.row.ariaLabel} className="mt-4">
          {section.row.items.map((item) => {
            const itemHref = item.hrefKey ? resolveHref(item.hrefKey) : href;
            const customVisual = renderRowVisual(item);
            const hasMedia = !!(item.image || item.video) && !customVisual;

            return (
              <ContentCard
                key={item.id}
                variant={section.row!.variant}
                title={item.title}
                description={item.description}
                href={itemHref}
                imageSrc={hasMedia ? item.image : undefined}
                imageAlt={item.imageAlt ?? item.title}
                objectPosition={item.objectPosition}
                videoSrc={hasMedia ? item.video : undefined}
                posterSrc={item.poster}
                visual={customVisual}
                ctaLabel={item.ctaLabel}
              />
            );
          })}
        </HorizontalCardRow>
      ) : null}
    </section>
  );
}
