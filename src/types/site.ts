export type LinkKey =
  | "NEOTRACKED_URL"
  | "UNIELITEZ_URL"
  | "ETVAVIDA_URL"
  | "TURKISH_COURSE_URL"
  | "TELEGRAM_URL"
  | "INSTAGRAM_URL"
  | "LINKEDIN_URL"
  | "GITHUB_URL"
  | "YOUTUBE_URL"
  | "CONTACT_EMAIL";

export type SocialPlatform =
  | "instagram"
  | "linkedin"
  | "github"
  | "youtube"
  | "telegram";

export type CardVariant = "poster" | "detail" | "inline";

export type AccentId = "neo" | "uni" | "etva" | "tr" | "tg";

export type VisualKey =
  | "avatar"
  | "neotracked-hero"
  | "neotracked-daily"
  | "neotracked-countdown"
  | "neotracked-language"
  | "neotracked-mind"
  | "neotracked-analytics"
  | "unielitez-hero"
  | "uni-turkiye"
  | "uni-europe"
  | "uni-compare"
  | "uni-scholarships"
  | "uni-match"
  | "etvavida-hero"
  | "service-web"
  | "service-mobile"
  | "service-social"
  | "service-brand"
  | "service-product"
  | "service-strategy"
  | "turkish-hero"
  | "turkish-daily"
  | "turkish-uni"
  | "turkish-work"
  | "turkish-speaking"
  | "turkish-persian"
  | "telegram-hero";

export type SiteLinks = Record<LinkKey, string>;

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  hrefKey: LinkKey;
};

export type HorizontalItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  video?: string;
  poster?: string;
  visualKey?: VisualKey;
  hrefKey?: LinkKey;
  ctaLabel?: string;
};

export type FeaturedContent = {
  title: string;
  message: string;
  description?: string;
  meta?: string;
  ctaLabel?: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  video?: string;
  poster?: string;
  visualKey?: VisualKey;
  badge?: string;
};

export type CategorySection = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  accent: AccentId;
  hrefKey: LinkKey;
  featured: FeaturedContent;
  row?: {
    ariaLabel: string;
    variant: CardVariant;
    items: HorizontalItem[];
  };
};

export type SiteConfig = {
  year: number;
  locale: string;
  direction: "rtl" | "ltr";
  /** ISO 8601 target for the NeoTracked countdown card. */
  countdownTarget: string;
  profile: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    avatarAlt?: string;
    avatarObjectPosition?: string;
  };
  links: SiteLinks;
  socials: SocialLink[];
  categories: Array<{
    id: string;
    emoji: string;
    label: string;
    hrefKey?: LinkKey;
  }>;
  sections: CategorySection[];
  contact: {
    heading: string;
    title: string;
    message: string;
    ctaHint: string;
  };
  ui: {
    explore: string;
    share: string;
    linkCopied: string;
    comingSoon: string;
    open: string;
    prev: string;
    next: string;
    backToTop: string;
    poweredBy: string;
    categoriesNav: string;
  };
};
