import type { Source, TimelineEntry } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";

export function Timeline({ entries, sources }: { entries: TimelineEntry[]; sources: Source[] }) {
  const sourceMap = new Map(sources.map((source) => [source.id, source]));

  return (
    <MuseumSection
      id="story"
      index="01"
      eyebrow="The long view"
      title="1996 → 2026"
      intro="Not a corporate history. A sequence of mornings, objects, interruptions and reasons people remember the place."
    >
      <ol className="timeline">
        {entries.map((entry) => (
          <li key={entry.id} className="timeline__entry">
            <p className="timeline__year">{entry.year}</p>
            <div className="timeline__content">
              {entry.eyebrow ? <p className="eyebrow">{entry.eyebrow}</p> : null}
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <EvidencePill evidence={entry.evidence} />
              {entry.evidence.sourceIds?.length ? (
                <ul className="source-links" aria-label="Sources">
                  {entry.evidence.sourceIds.map((sourceId) => {
                    const source = sourceMap.get(sourceId);
                    return source ? (
                      <li key={source.id}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.publisher}: {source.label}
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </div>
            {entry.media ? <MediaPlaceholder asset={entry.media} /> : <div aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </MuseumSection>
  );
}
