import type { MonkeyRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MediaPlaceholder } from "./media-placeholder";
import { SourceList } from "./source-list";

const statusLabels: Record<MonkeyRecord["status"], string> = {
  incumbent: "Incumbent",
  missing: "Missing",
  retired: "Retired",
  unconfirmed: "Unconfirmed",
};

/**
 * The succession.
 *
 * Ziggy → ? → Archie, treated with the straight face a contested civic
 * dynasty deserves. The unconfirmed link in the middle is rendered as an
 * actual gap in the line rather than smoothed over.
 */
export function MonkeySuccession({
  monkeys,
  sources,
}: {
  monkeys: MonkeyRecord[];
  sources: Source[];
}) {
  return (
    <div className="succession">
      <h3 className="succession__title">The succession</h3>
      <p className="succession__line" aria-hidden="true">
        {monkeys.map((monkey, index) => (
          <span key={monkey.id}>
            {monkey.status === "unconfirmed" ? "?" : monkey.name}
            {index < monkeys.length - 1 ? <b> → </b> : null}
          </span>
        ))}
      </p>

      <ol className="lineage">
        {monkeys.map((monkey) => (
          <li key={monkey.id} className="lineage__entry" data-status={monkey.status}>
            <MediaPlaceholder asset={monkey.media} />
            <div className="lineage__copy">
              <p className="eyebrow">
                {monkey.reign} · {statusLabels[monkey.status]}
              </p>
              <h4>
                {monkey.name}
                {monkey.aliases.length > 0 ? (
                  <span className="lineage__aliases"> (also {monkey.aliases.join(", ")})</span>
                ) : null}
              </h4>
              <p className="lineage__role">{monkey.role}</p>
              <p>{monkey.body}</p>
              {monkey.openQuestions?.length ? (
                <details className="lineage__questions">
                  <summary>Open questions ({monkey.openQuestions.length})</summary>
                  <ul>
                    {monkey.openQuestions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
              <EvidencePill evidence={monkey.evidence} />
              <SourceList sourceIds={monkey.evidence.sourceIds} sources={sources} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
