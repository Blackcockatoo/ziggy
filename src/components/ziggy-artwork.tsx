import Image from "next/image";
import type { Artwork } from "@/content/artwork";

/**
 * Renders one piece of interpretive artwork.
 *
 * Intrinsic dimensions come from the manifest, so nothing shifts while an image
 * loads. An artwork whose manifest `alt` is an empty string is decorative and
 * is hidden from assistive technology — `decorative` can also force that at a
 * particular usage, for a piece that is meaningful elsewhere.
 */
export function ZiggyArtwork({
  artwork,
  sizes,
  className,
  priority = false,
  decorative = false,
}: {
  artwork: Artwork;
  /** Required-in-practice: tell the browser how wide this will actually render. */
  sizes: string;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const alt = decorative ? "" : artwork.alt;

  return (
    <Image
      className={className}
      src={artwork.src}
      width={artwork.width}
      height={artwork.height}
      sizes={sizes}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      priority={priority}
      loading={priority ? undefined : "lazy"}
    />
  );
}
