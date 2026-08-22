import type { PersonRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { SourceList } from "./source-list";

/**
 * Rob and Carla.
 *
 * The quietest room. No founder bio, no achievements, no adjectives doing work
 * that a photograph will do better. The public record supplies the frame;
 * personal wording and what gets shown remain theirs.
 */
export function Principals({
  people,
  sources,
}: {
  people: PersonRecord[];
  sources: Source[];
}) {
  return (
    <section id="rob-and-carla" className="principals" aria-labelledby="principals-title">
      <div className="principals__inner">
        <p className="section-heading__index" aria-hidden="true">
          09
        </p>
        <h2 id="principals-title">Someone still has to unlock the door.</h2>

        <div className="principals__grid">
          {people.map((person) => (
            <article key={person.id} className="principal">
              <MediaPlaceholder asset={person.media} />
              <h3>{person.name}</h3>
              <p className="principal__role">{person.role}</p>
              {person.bio ? <p>{person.bio}</p> : null}
              {person.memoryPrompt ? (
                <p className="principal__prompt">{person.memoryPrompt}</p>
              ) : null}
              <EvidencePill evidence={person.evidence} />
              <SourceList sourceIds={person.evidence.sourceIds} sources={sources} />
            </article>
          ))}
        </div>

        <p className="principals__close">
          Streets change. Signs change. Rules change. Customers grow older. Thirty years is
          not one grand gesture — it is the decision to turn the key again tomorrow morning.
        </p>
        <strong className="principals__last-line">They do.</strong>
        <p className="principals__note">
          Working exhibition copy. Rob and Carla can correct it, replace it with their own
          words, add a photograph, or leave the room exactly as it is.
        </p>
      </div>
    </section>
  );
}
