import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { EvidencePill } from "./evidence-pill";

const glyphs: Record<MediaAsset["kind"], string> = {
  image: "□",
  document: "≡",
  audio: "◉",
  object: "◇",
};

/**
 * One media slot.
 *
 * Renders the real thing when `src` is set, and an honest empty frame — with
 * its alt text, caption and evidence already written — when it is not. The
 * placeholders are the shopping list for Rob.
 */
export function MediaPlaceholder({ asset }: { asset: MediaAsset }) {
  if (asset.src) {
    return (
      <figure className="archive-media">
        <div className="archive-media__frame">
          <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <figcaption>
          {asset.caption}
          {asset.credit ? <span className="archive-media__credit"> {asset.credit}</span> : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="archive-placeholder">
      <div className="archive-placeholder__mark" aria-hidden="true">
        {glyphs[asset.kind]}
      </div>
      <p className="archive-placeholder__type">{asset.kind} space</p>
      <p>{asset.alt}</p>
      <figcaption>{asset.caption}</figcaption>
      <EvidencePill evidence={asset.evidence} />
    </figure>
  );
}
