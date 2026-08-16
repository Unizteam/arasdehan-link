import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { hasHttpUrl, hasLink } from "@/lib/links";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
  disabledClassName?: string;
  children: ReactNode;
};

export function SafeLink({
  href,
  className,
  disabledClassName,
  children,
  ...props
}: SafeLinkProps) {
  if (!hasLink(href)) {
    return (
      <span
        id={props.id}
        title={props.title}
        aria-label={props["aria-label"]}
        role="link"
        aria-disabled="true"
        className={cn(className, disabledClassName)}
      >
        {children}
      </span>
    );
  }

  /* Only external pages open in a new tab; mail actions stay in place. */
  const external = hasHttpUrl(href);

  return (
    <a
      {...props}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}
