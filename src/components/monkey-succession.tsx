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
 * Two names and a replacement story, without pretending the available
 * evidence supplies a family tree.
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
      <h3 className="succession__title">Names in the record</h3>
      <p className="succession__line" aria-hidden="true">
        <span>Ziggie / Archie / replacement history — relationship unresolved</span>
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
