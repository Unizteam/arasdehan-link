"use client";

import { CategoryNavigation } from "@/components/CategoryNavigation";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProjectSection } from "@/components/ProjectSection";
import { sectionIds, siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LinkInBioPage() {
  const { activeId, select } = useActiveSection(sectionIds);
  const reducedMotion = usePrefersReducedMotion();

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    select(id);
    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="page-backdrop min-h-screen px-2 py-2 sm:px-6 sm:py-10">
      <div className="shell-surface mx-auto w-full max-w-[860px] rounded-[20px] ring-1 ring-line sm:rounded-[26px]">
        <div className="px-4 sm:px-6">
          <ProfileHeader
            onExplore={() => scrollToSection(sectionIds[0] ?? "")}
          />
          <CategoryNavigation activeId={activeId} onSelect={scrollToSection} />

          <main>
            {siteConfig.sections.map((section) => (
              <ProjectSection key={section.id} section={section} />
            ))}
            <ContactSection />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
