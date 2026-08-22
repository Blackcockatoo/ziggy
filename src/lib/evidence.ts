import type {
  Evidence,
  EvidenceClass,
  EvidenceStatus,
  PermissionStatus,
} from "@/content/types";

/**
 * Presentation rules for the exhibition's honesty labels.
 *
 * The status set is deliberately finer-grained than the public distinction.
 * Visitors see documented fact, local lore, or an empty frame; researchers
 * see which of the six statuses produced that classification.
 */
export const evidenceLabels: Record<EvidenceStatus, string> = {
  verified: "Documented",
  "strongly-supported": "Strongly supported",
  probable: "Probable",
  "needs-confirmation": "Needs confirming",
  anecdotal: "Local lore",
  placeholder: "Archive slot",
};

export const evidenceDescriptions: Record<EvidenceStatus, string> = {
  verified: "Supported by a source you can go and read.",
  "strongly-supported": "Substantially supported, with a source limitation still stated.",
  probable: "A reasonable inference from the evidence, not yet pinned down.",
  "needs-confirmation": "A research lead awaiting the archive or an interview.",
  anecdotal: "Told, repeated and believed locally. Not documented.",
  placeholder: "An empty frame, kept empty on purpose.",
};

const classByStatus: Record<EvidenceStatus, EvidenceClass> = {
  verified: "documented",
  "strongly-supported": "documented",
  probable: "documented",
  "needs-confirmation": "lore",
  anecdotal: "lore",
  placeholder: "empty",
};

export function evidenceClass(status: EvidenceStatus): EvidenceClass {
  return classByStatus[status];
}

export const permissionLabels: Record<PermissionStatus, string> = {
  granted: "Permission granted",
  pending: "Permission pending",
  "not-required": "No permission required",
  withheld: "Permission withheld",
};

/**
 * True when a record may show a named person's words, likeness or history.
 *
 * Anything without explicit permission is treated as not clearable, which is
 * the right default for former staff and customers.
 */
export function isPubliclyClearable(evidence: Evidence): boolean {
  return (
    evidence.permission === "granted" || evidence.permission === "not-required"
  );
}
