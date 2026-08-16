import type { ReactElement, SVGProps } from "react";
import type { SocialPlatform } from "@/types/site";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 8h.01M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.5-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22.5 12s0-3.4-.4-4.9c-.2-.8-.9-1.5-1.7-1.7C18.7 5 12 5 12 5s-6.7 0-8.4.4c-.8.2-1.5.9-1.7 1.7C1.5 8.6 1.5 12 1.5 12s0 3.4.4 4.9c.2.8.9 1.5 1.7 1.7C5.3 19 12 19 12 19s6.7 0 8.4-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.9.4-4.9Z" />
      <path d="m10 15 5.2-3L10 9v6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m21 5-8.4 14.4-3.3-7.2L3 9.6 21 5Z" />
      <path d="m9.3 12.2 11.7-7.2-8.2 9.8" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 5h5v5M19 5 10 14" />
      <path d="M19 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6.5A1.5 1.5 0 0 1 6 5h4.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7ZM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.53 3.69-8.21 8.23-8.21 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.8c0 4.54-3.69 8.24-8.2 8.24Zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

export const socialIcons: Record<
  SocialPlatform,
  (props: IconProps) => ReactElement
> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  youtube: YouTubeIcon,
  telegram: TelegramIcon,
};
