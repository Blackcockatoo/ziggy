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
 * The wall text explaining both the spirit of the gift and the exhibition's
 * own research rules.
 *
 * The first job is to remove pressure from Rob and Carla: this is something
 * made for them to enjoy, not a project they have been volunteered to run.
 * The documented / lore distinction then explains how the history is handled.
 */
export function ResearchKey() {
  return (
    <aside className="research-key" aria-labelledby="research-key-title">
      <div className="research-key__statement">
        <p className="eyebrow">Before you wander in</p>
        <h2 id="research-key-title">A tribute first. A project only if you ever want it to be.</h2>
        <p>
          This is an unofficial, no-strings love job made because the shop has a story worth
          celebrating. Rob and Carla are not being asked to launch anything, approve a brand,
          manage an archive, or turn this into work.
        </p>
        <p>
          Browse it like an unusually overbuilt digital scrapbook. Keep what makes you smile,
          ignore what does not, and if something is wrong, one correction is enough. The rest
          is simply the result of somebody getting a little carried away.
        </p>
        <p>
          Underneath the fun, the history is handled carefully. A suburb remembers more than it
          writes down, so the exhibition says what is <strong>documented</strong>, what is{" "}
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
