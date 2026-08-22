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

const archivePriorities = [
  {
    label: "Essential",
    items: [
      "Earliest shop image or paper",
      "One monkey image, clipping or object clue",
      "Several candid shop photographs",
      "One surviving object",
      "Access to any messy box, folder or phone album",
    ],
  },
  {
    label: "Useful",
    items: [
      "Up to three important people",
      "One genuine community connection",
      "Old Lotto material",
      "One image or story showing a major change",
    ],
  },
  {
    label: "Bonus",
    items: [
      "Uniforms or key tags",
      "Handwritten signs, receipts or invoices",
      "Staff jokes or strange memorabilia",
      "A short casual voice note",
    ],
  },
] as const;

/**
 * The Object Archive.
 *
 * A catalogue rather than a gallery: catalogue number, object type, date
 * range, provenance and evidence on every record, whether or not the object
 * itself has arrived. The public-facing request stays short; the detailed
 * internal register remains available behind one disclosure.
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
      index="08"
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

      <section className="archive-request" aria-labelledby="archive-request-title">
        <div className="archive-request__intro">
          <p className="eyebrow">The human pieces only</p>
          <h3 id="archive-request-title">A small, gentle ask</h3>
          <p>
            No sorting. No scanning. No captions. No homework. Phone photographs and
            approximate dates are enough.
          </p>
        </div>
        <div className="archive-request__grid">
          {archivePriorities.map((group) => (
            <article key={group.label}>
              <h4>{group.label}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <details className="archive-register">
        <summary>Open the full internal accession register</summary>
        <p>
          The detailed catalogue remains useful to the curator. It is not a checklist Rob
          or Carla are expected to complete.
        </p>
        {groups.map((holding) => {
          const records = artefacts.filter((item) => item.holding === holding);
          if (records.length === 0) return null;

          return (
            <section
              key={holding}
              className="archive-group"
              aria-labelledby={`archive-${holding}`}
            >
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
                        <SourceList
                          sourceIds={artefact.evidence.sourceIds}
                          sources={sources}
                        />
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </details>
    </MuseumSection>
  );
}
