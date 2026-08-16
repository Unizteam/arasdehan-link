"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CardImageProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
};

export function CardImage({
  src,
  alt,
  objectPosition = "center",
  priority = false,
  className,
}: CardImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition }}
    />
  );
}

type CardVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

function usePrefersReducedData() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-data: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function CardVideo({ src, poster, className }: CardVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const reducedData = usePrefersReducedData();
  const staticOnly = reducedMotion || reducedData;

  useEffect(() => {
    if (staticOnly) return;
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [staticOnly]);

  if (staticOnly && poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover object-center", className)}
      />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={false}
      preload="metadata"
      aria-hidden="true"
      className={cn("h-full w-full object-cover object-center", className)}
    />
  );
}

type CardMediaProps = {
  image?: string;
  imageAlt: string;
  objectPosition?: string;
  video?: string;
  poster?: string;
  priority?: boolean;
  className?: string;
};

export function CardMedia({
  image,
  imageAlt,
  objectPosition,
  video,
  poster,
  priority,
  className,
}: CardMediaProps) {
  if (video) {
    return <CardVideo src={video} poster={poster} className={className} />;
  }

  if (image) {
    return (
      <CardImage
        src={image}
        alt={imageAlt}
        objectPosition={objectPosition}
        priority={priority}
        className={className}
      />
    );
  }

  return null;
}
