import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { EvidencePill } from "./evidence-pill";

export function MediaPlaceholder({ asset }: { asset: MediaAsset }) {
  if (asset.src) {
    return (
      <figure className="archive-media">
        <div className="archive-media__frame">
          <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <figcaption>{asset.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="archive-placeholder">
      <div className="archive-placeholder__mark" aria-hidden="true">
        {asset.kind === "image" ? "□" : asset.kind === "audio" ? "◉" : "≡"}
      </div>
      <p className="archive-placeholder__type">{asset.kind} space</p>
      <p>{asset.alt}</p>
      <figcaption>{asset.caption}</figcaption>
      <EvidencePill evidence={asset.evidence} />
    </figure>
  );
}
