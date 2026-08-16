import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function stroke(props: IconProps) {
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

export function OnlineIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function SpeakingIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M4 18V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8l-4 3v-3Z" />
      <path d="M19 8.5c1.2.8 2 2.1 2 3.5s-.8 2.7-2 3.5" />
    </svg>
  );
}

export function PracticeIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="M8 4h8l3 4-7 12L5 8l3-4Z" />
      <path d="M8 8h8" />
    </svg>
  );
}

export function GroupIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <circle cx="9" cy="8" r="2.4" />
      <circle cx="16" cy="9" r="2.1" />
      <path d="M4.5 18c.4-2.6 2.4-4 4.5-4s4.1 1.4 4.5 4" />
      <path d="M13.2 14.2c1.7-.4 3.6.6 4.3 2.8" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...stroke(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
