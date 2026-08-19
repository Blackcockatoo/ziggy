import type { PersonRecord, Source } from "@/content/types";
import { isPubliclyClearable, permissionLabels } from "@/lib/evidence";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

/**
 * The Gang.
 *
 * Not a team page. Former staff are people who moved on, so every record shows
 * its permission state and nothing personal renders until that permission
 * exists. `data-cleared` is what the accessibility and content tests read.
 */
export function Gang({ staff, sources }: { staff: PersonRecord[]; sources: Source[] }) {
  return (
    <MuseumSection
      id="gang"
      index="06"
      eyebrow="Not an org chart"
      title="The Gang"
      intro="Everyone who ever worked a shift here: first jobs, long service, lockdown mornings and the people who kept the place human."
      tone="ink"
    >
      <div className="people-grid">
        {staff.map((person) => {
          const cleared = isPubliclyClearable(person.evidence);
          return (
            <article
              key={person.id}
              className="person-card"
              data-cleared={cleared ? "true" : "false"}
            >
              <MediaPlaceholder asset={person.media} />
              <div className="person-card__copy">
                <p className="eyebrow">
                  {person.era ?? person.years ?? "Years to confirm"}
                </p>
                <h3>
                  {person.name}
                  {person.nickname && cleared ? (
                    <span className="person-card__nickname"> “{person.nickname}”</span>
                  ) : null}
                </h3>
                <p className="person-card__role">{person.role}</p>
                {person.years ? <p className="person-card__years">{person.years}</p> : null}

                {cleared && person.anecdote ? <p>{person.anecdote}</p> : null}
                {cleared && person.favouriteMemory ? (
                  <blockquote>“{person.favouriteMemory}”</blockquote>
                ) : null}
                {cleared && person.whereabouts ? (
                  <p className="person-card__whereabouts">Now: {person.whereabouts}</p>
                ) : null}
                {!cleared && person.memoryPrompt ? (
                  <p className="person-card__prompt">{person.memoryPrompt}</p>
                ) : null}

                <div className="person-card__labels">
                  <EvidencePill evidence={person.evidence} />
                  {person.evidence.permission ? (
                    <span
                      className={`permission-pill permission-pill--${person.evidence.permission}`}
                    >
                      {permissionLabels[person.evidence.permission]}
                    </span>
                  ) : null}
                </div>
                <SourceList sourceIds={person.evidence.sourceIds} sources={sources} />
              </div>
            </article>
          );
        })}
      </div>
      <p className="people-grid__note">
        Nothing personal is published here without permission. Names, photographs,
        nicknames and anecdotes stay hidden until the person they belong to says yes.
      </p>
    </MuseumSection>
  );
}
