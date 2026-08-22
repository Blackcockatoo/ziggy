import type { CommunityRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

const categoryLabels: Record<CommunityRecord["category"], string> = {
  raffle: "Raffle",
  club: "Club",
  fundraiser: "Fundraiser",
  school: "School",
  street: "Street",
  trading: "Trading",
};

/**
 * Around Town.
 *
 * A scrapbook drawer, not a corporate responsibility statement. Each record is
 * a specific dated thing, or an open request for one.
 */
export function AroundTown({
  records,
  sources,
}: {
  records: CommunityRecord[];
  sources: Source[];
}) {
  return (
    <MuseumSection
      id="around-town"
      index="08"
      eyebrow="The shop beyond the shop"
      title="Around Town"
      intro="The small civic acts and changing street details that rarely make a company history — and should not be turned into one."
    >
      <div className="community-list">
        {records.map((record, index) => (
          <article key={record.id} className="community-item">
            <span className="community-item__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="community-item__copy">
              <p className="eyebrow">
                {categoryLabels[record.category]}
                {record.year ? ` · ${record.year}` : ""}
              </p>
              <h3>{record.title}</h3>
              <p>{record.detail}</p>
              <SourceList sourceIds={record.evidence.sourceIds} sources={sources} />
            </div>
            <EvidencePill evidence={record.evidence} />
          </article>
        ))}
      </div>
    </MuseumSection>
  );
}
