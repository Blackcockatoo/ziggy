import type { CommunityRecord } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";

export function AroundTown({ records }: { records: CommunityRecord[] }) {
  return (
    <MuseumSection
      id="around-town"
      index="08"
      eyebrow="The shop beyond the shop"
      title="Around Town"
      intro="A drawer for the small civic acts and changing street details that rarely make a company history."
    >
      <div className="community-list">
        {records.map((record, index) => (
          <article key={record.id} className="community-item">
            <span className="community-item__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{record.title}</h3>
              <p>{record.detail}</p>
            </div>
            <EvidencePill evidence={record.evidence} />
          </article>
        ))}
      </div>
    </MuseumSection>
  );
}
