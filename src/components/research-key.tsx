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
 * The pressure-release valve at the entrance.
 *
 * The gift is explained first in ordinary language. The evidence system is
 * still available, but deliberately tucked behind a disclosure so nobody has
 * to learn the curator's machinery just to enjoy the tribute.
 */
export function ResearchKey() {
  return (
    <aside className="research-key" aria-labelledby="research-key-title">
      <div className="research-key__statement">
        <p className="eyebrow">The only bit you actually need to know</p>
        <h2 id="research-key-title">This is a present, not a new responsibility.</h2>
        <p>
          It exists because thirty years in one Frankston shop felt worth making a fuss about.
          Nobody asked for a website, an archive, a brand system, songs, paperwork or a monkey
          bureaucracy. That part happened because the maker got extremely carried away.
        </p>
        <p>
          <strong>Rob and Carla do not owe this project anything.</strong> No meeting. No launch.
          No approvals. No archive homework. No business decision. No polite obligation to use
          any of the ideas. Looking through it and having a laugh is a complete outcome.
        </p>
        <p>
          If something here is useful later, brilliant. If only one picture or one joke survives,
          also brilliant. If the whole thing stays exactly what it is — an absurdly elaborate
          thank-you for a shop that became part of Frankston — then it has already done its job.
        </p>
        <p>
          The historical bits are kept careful underneath all that. Anything uncertain is labelled
          as uncertain; the stranger Ziggy material is allowed to be art without pretending it is fact.
        </p>
      </div>

      <details style={{ alignSelf: "start", width: "100%" }}>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: 800,
            lineHeight: 1.4,
          }}
        >
          Optional nerd bit: how the history is labelled
        </summary>
        <p style={{ margin: "10px 0 14px", lineHeight: 1.55 }}>
          You never need to learn this system. It is simply how the exhibition keeps documented
          material, local lore and creative invention from getting accidentally mixed together.
        </p>
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
      </details>
    </aside>
  );
}
