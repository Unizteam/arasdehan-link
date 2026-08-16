export function hasHttpUrl(value: string | undefined): value is string {
  if (!value || !value.trim()) return false;

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Same-origin app routes such as `/turkish-course`. */
export function isInternalPath(value: string | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
}

export function isMailto(value: string | undefined): value is string {
  return !!value && value.trim().toLowerCase().startsWith("mailto:");
}

/** A link is usable when it is an external page, an internal route, or an email action. */
export function hasLink(value: string | undefined): value is string {
  return hasHttpUrl(value) || isMailto(value) || isInternalPath(value);
}

export function hasEmail(value: string | undefined): value is string {
  if (!value || !value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}
