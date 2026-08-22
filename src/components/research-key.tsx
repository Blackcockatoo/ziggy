import type { EvidenceStatus } from "@/content/types";
import { evidenceClass, evidenceDescriptions } from "@/lib/evidence";
import { EvidencePill } from "./evidence-pill";

const statuses: EvidenceStatus[] = [
  "verified",
  "strongly-supported",
  "probable",
  "needs-confirmation",
  "anecdotal",
  "placeholder",
];

/**
 * The wall text explaining the exhibition's own rules.
 *
 * The documented / lore distinction is the point of the whole build, so it is
 * stated at the entrance rather than buried in a footer.
 */
export function ResearchKey() {
  return (
    <aside className="research-key" aria-labelledby="research-key-title">
      <div className="research-key__statement">
        <p className="eyebrow">Editorial rule</p>
        <h2 id="research-key-title">No folklore disguised as fact.</h2>
        <p>
          A suburb remembers more than it writes down. This exhibition keeps both, and
          says which is which: what is <strong>documented</strong>, what is{" "}
          <strong>local lore</strong>, and which frames are still empty.
        </p>
      </div>
      <dl className="research-key__legend">
        {statuses.map((status) => (
          <div key={status} data-evidence-class={evidenceClass(status)}>
            <dt>
              <EvidencePill evidence={{ status }} />
            </dt>
            <dd>{evidenceDescriptions[status]}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
