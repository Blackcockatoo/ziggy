import type { PersonRecord } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";

export function Gang({ people }: { people: PersonRecord[] }) {
  return (
    <MuseumSection
      id="gang"
      index="07"
      eyebrow="Not an org chart"
      title="The Gang"
      intro="Owners, staff, first shifts, last shifts and the people who kept the place human."
      tone="ink"
    >
      <div className="people-grid">
        {people.map((person) => (
          <article key={person.id} className="person-card">
            <MediaPlaceholder asset={person.media} />
            <div className="person-card__copy">
              <p className="eyebrow">{person.years ?? "Years to confirm"}</p>
              <h3>{person.name}</h3>
              <p className="person-card__role">{person.role}</p>
              <p>{person.memoryPrompt}</p>
              <EvidencePill evidence={person.evidence} />
            </div>
          </article>
        ))}
      </div>
    </MuseumSection>
  );
}
