import type { ArtefactRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

const typeLabels: Record<ArtefactRecord["objectType"], string> = {
  document: "Document",
  photograph: "Photograph",
  object: "Object",
  signage: "Signage",
  ephemera: "Ephemera",
  tool: "Tool",
  textile: "Textile",
  press: "Press",
  artwork: "Artwork",
};

const holdingLabels: Record<ArtefactRecord["holding"], string> = {
  held: "In archive",
  wanted: "Wanted",
  lost: "Lost",
};

/**
 * The Object Archive.
 *
 * A catalogue rather than a gallery: catalogue number, object type, date
 * range, provenance and evidence on every record, whether or not the object
 * itself has arrived. Grouped by holding so the "wanted" list reads as what it
 * is — the request to Rob.
 */
export function ObjectArchive({
  artefacts,
  sources,
}: {
  artefacts: ArtefactRecord[];
  sources: Source[];
}) {
  const groups: ArtefactRecord["holding"][] = ["held", "wanted", "lost"];
  const counts = {
    held: artefacts.filter((item) => item.holding === "held").length,
    wanted: artefacts.filter((item) => item.holding === "wanted").length,
    lost: artefacts.filter((item) => item.holding === "lost").length,
  };

  return (
    <MuseumSection
      id="archive"
      index="09"
      eyebrow="Accession register"
      title="The Object Archive"
      intro="Thirty years of ordinary objects, catalogued as if they mattered — because in about a decade they will."
    >
      <dl className="archive-summary">
        <div>
          <dt>In archive</dt>
          <dd>{String(counts.held).padStart(2, "0")}</dd>
        </div>
        <div>
          <dt>Wanted</dt>
          <dd>{String(counts.wanted).padStart(2, "0")}</dd>
        </div>
        <div>
          <dt>Lost</dt>
          <dd>{String(counts.lost).padStart(2, "0")}</dd>
        </div>
      </dl>

      {groups.map((holding) => {
        const records = artefacts.filter((item) => item.holding === holding);
        if (records.length === 0) return null;

        return (
          <section key={holding} className="archive-group" aria-labelledby={`archive-${holding}`}>
            <h3 id={`archive-${holding}`} className="archive-group__title">
              {holdingLabels[holding]}
            </h3>
            <ul className="artefact-grid">
              {records.map((artefact) => (
                <li key={artefact.id}>
                  <article className="artefact-card" data-holding={artefact.holding}>
                    <MediaPlaceholder asset={artefact.media} />
                    <div className="artefact-card__copy">
                      <p className="artefact-card__catalogue">{artefact.catalogue}</p>
                      <h4>{artefact.title}</h4>
                      <dl className="artefact-card__fields">
                        <div>
                          <dt>Type</dt>
                          <dd>{typeLabels[artefact.objectType]}</dd>
                        </div>
                        <div>
                          <dt>Date</dt>
                          <dd>{artefact.dateRange}</dd>
                        </div>
                        <div>
                          <dt>Holding</dt>
                          <dd>{holdingLabels[artefact.holding]}</dd>
                        </div>
                        {artefact.provenance ? (
                          <div>
                            <dt>Provenance</dt>
                            <dd>{artefact.provenance}</dd>
                          </div>
                        ) : null}
                      </dl>
                      <p className="artefact-card__description">{artefact.description}</p>
                      {artefact.tags?.length ? (
                        <ul className="artefact-card__tags" aria-label="Tags">
                          {artefact.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      ) : null}
                      <EvidencePill evidence={artefact.evidence} />
                      <SourceList sourceIds={artefact.evidence.sourceIds} sources={sources} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </MuseumSection>
  );
}
