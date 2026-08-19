import type { Evidence } from "@/content/types";
import { evidenceClass, evidenceDescriptions, evidenceLabels } from "@/lib/evidence";

/**
 * The exhibition's honesty label.
 *
 * Every claim carries one. The `data-evidence-class` attribute exposes the
 * documented / lore / empty distinction for styling and for tests.
 */
export function EvidencePill({ evidence }: { evidence: Evidence }) {
  const label = evidenceLabels[evidence.status];
  const description = evidence.note ?? evidenceDescriptions[evidence.status];

  return (
    <span
      className={`evidence-pill evidence-pill--${evidence.status}`}
      data-evidence-class={evidenceClass(evidence.status)}
      title={description}
    >
      <span aria-hidden="true" className="evidence-pill__dot" />
      {label}
      <span className="visually-hidden">. {description}</span>
    </span>
  );
}
