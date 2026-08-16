import { courseWhatsAppMessages, type CourseLang } from "@/data/turkish-course";

/**
 * Reads NEXT_PUBLIC_WHATSAPP_NUMBER.
 * The value must be the international number with country code and no +,
 * spaces or punctuation. Missing or invalid values return null.
 */
export function getWhatsAppNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
  if (!raw) return null;
  if (!/^\d{8,15}$/.test(raw)) return null;
  return raw;
}

export function getWhatsAppUrl(lang: CourseLang): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const message = courseWhatsAppMessages[lang];
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
