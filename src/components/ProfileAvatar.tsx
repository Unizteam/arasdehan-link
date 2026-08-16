import { ProfileVisual } from "@/components/visuals/Visuals";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const RING_CLASS =
  "overflow-hidden rounded-full ring-1 ring-foreground/15 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.9)]";

const CONTACT_RING_CLASS =
  "overflow-hidden rounded-full ring-4 ring-surface shadow-[0_12px_30px_-14px_rgba(0,0,0,0.95)]";

type ProfileAvatarProps = {
  variant: "header" | "contact";
  className?: string;
};

export function ProfileAvatar({ variant, className }: ProfileAvatarProps) {
  const { profile } = siteConfig;
  const src = profile.avatar;
  const alt = profile.avatarAlt ?? `تصویر پروفایل ${profile.name}`;
  const objectPosition = profile.avatarObjectPosition ?? "50% 18%";

  const sizeClass =
    variant === "header"
      ? "h-[92px] w-[92px] sm:h-[104px] sm:w-[104px]"
      : "h-[80px] w-[80px] sm:h-[92px] sm:w-[92px]";

  const ringClass = variant === "header" ? RING_CLASS : CONTACT_RING_CLASS;

  return (
    <div className={cn(ringClass, sizeClass, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={variant === "header" ? 104 : 92}
          height={variant === "header" ? 104 : 92}
          decoding="async"
          loading={variant === "header" ? "eager" : "lazy"}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <ProfileVisual />
      )}
    </div>
  );
}
