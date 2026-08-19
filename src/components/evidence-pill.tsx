import type { Evidence } from "@/content/types";

const labels = {
  verified: "Verified source",
  "research-lead": "Research lead",
  placeholder: "Archive placeholder",
} satisfies Record<Evidence["status"], string>;

export function EvidencePill({ evidence }: { evidence: Evidence }) {
  return (
    <span
      className={`evidence-pill evidence-pill--${evidence.status}`}
      title={evidence.note}
    >
      <span aria-hidden="true" className="evidence-pill__dot" />
      {labels[evidence.status]}
    </span>
  );
}
