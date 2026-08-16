import { socialIcons } from "@/components/icons";
import { SafeLink } from "@/components/SafeLink";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { hasHttpUrl } from "@/lib/links";

export function SocialLinks() {
  return (
    <ul className="flex items-center justify-center gap-3.5 sm:gap-5">
      {siteConfig.socials.map((social) => {
        const Icon = socialIcons[social.platform];
        const href = siteConfig.links[social.hrefKey];
        const enabled = hasHttpUrl(href);

        return (
          <li key={social.platform}>
            <SafeLink
              href={href}
              aria-label={
                enabled
                  ? social.label
                  : `${social.label} — ${siteConfig.ui.comingSoon}`
              }
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                enabled
                  ? "text-foreground hover:bg-foreground/8"
                  : "text-foreground/40",
              )}
              disabledClassName="cursor-default hover:bg-transparent"
            >
              <Icon className="h-[21px] w-[21px]" />
            </SafeLink>
          </li>
        );
      })}
    </ul>
  );
}
