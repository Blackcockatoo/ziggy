import type { Source, TimelineEntry } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

const chapterLabels: Record<TimelineEntry["chapter"], string> = {
  opening: "Opening",
  "pre-cignall": "Before the sign",
  cignall: "Becoming Cignall",
  lotto: "Lotto",
  monkey: "Monkey",
  trading: "Trading",
  community: "Community",
  milestone: "Milestone",
};

/**
 * 1996 → 2026.
 *
 * The longer `story` sits behind a native `<details>`, so the whole timeline
 * reads and expands with no JavaScript at all.
 */
export function Timeline({
  entries,
  sources,
}: {
  entries: TimelineEntry[];
  sources: Source[];
}) {
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
          <li key={entry.id} className="timeline__entry" data-chapter={entry.chapter}>
            <div className="timeline__marker">
              <p className="timeline__year">{entry.year}</p>
              <p className="timeline__chapter">{chapterLabels[entry.chapter]}</p>
            </div>
            <div className="timeline__content">
              {entry.eyebrow ? <p className="eyebrow">{entry.eyebrow}</p> : null}
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              {entry.story ? (
                <details className="timeline__story">
                  <summary>The longer version</summary>
                  <p>{entry.story}</p>
                </details>
              ) : null}
              <EvidencePill evidence={entry.evidence} />
              {entry.evidence.note ? (
                <p className="timeline__note">{entry.evidence.note}</p>
              ) : null}
              <SourceList sourceIds={entry.evidence.sourceIds} sources={sources} />
              {entry.artefactIds?.length ? (
                <p className="timeline__artefacts">
                  Catalogue: <a href="#archive">{entry.artefactIds.join(", ")}</a>
                </p>
              ) : null}
            </div>
            {entry.media ? <MediaPlaceholder asset={entry.media} /> : <div aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </MuseumSection>
  );
}
