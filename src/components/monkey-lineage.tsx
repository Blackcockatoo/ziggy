import type { LineageEntry } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";

export function MonkeyLineage({ entries }: { entries: LineageEntry[] }) {
  return (
    <MuseumSection
      id="lineage"
      index="04"
      eyebrow="A royal succession"
      title="Ziggy → Archie"
      intro="Two names, at least two eras, and several details the archive still needs to settle."
      tone="red"
    >
      <div className="lineage">
        {entries.map((entry, index) => (
          <article key={entry.id} className="lineage__entry">
            <MediaPlaceholder asset={entry.media} />
            <div>
              <p className="eyebrow">{entry.era}</p>
              <h3>{entry.name}</h3>
              <p className="lineage__role">{entry.role}</p>
              <p>{entry.body}</p>
              <EvidencePill evidence={entry.evidence} />
            </div>
            {index < entries.length - 1 ? (
              <span className="lineage__arrow" aria-hidden="true">
                →
              </span>
            ) : null}
          </article>
        ))}
      </div>
    </MuseumSection>
  );
}
