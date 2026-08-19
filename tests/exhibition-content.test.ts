import { describe, expect, it } from "vitest";
import { exhibition } from "../src/content/exhibition";

describe("exhibition content model", () => {
  it("reserves exactly ten unique Division One ledger entries", () => {
    expect(exhibition.ledger).toHaveLength(10);
    expect(new Set(exhibition.ledger.map((entry) => entry.number)).size).toBe(10);
    expect(exhibition.ledger.map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("keeps unknown ledger facts visibly marked as placeholders", () => {
    const unknownEntries = exhibition.ledger.filter((entry) => !entry.date);

    expect(unknownEntries).not.toHaveLength(0);
    expect(unknownEntries.every((entry) => entry.evidence.status === "placeholder")).toBe(true);
  });

  it("does not attach missing source identifiers to verified facts", () => {
    const knownSourceIds = new Set(exhibition.sources.map((source) => source.id));
    const evidenceRecords = [
      ...exhibition.timeline.map((entry) => entry.evidence),
      ...exhibition.lore.map((entry) => entry.evidence),
      ...exhibition.ledger.map((entry) => entry.evidence),
      ...exhibition.lineage.map((entry) => entry.evidence),
      ...exhibition.people.map((entry) => entry.evidence),
    ];

    for (const evidence of evidenceRecords) {
      for (const sourceId of evidence.sourceIds ?? []) {
        expect(knownSourceIds.has(sourceId)).toBe(true);
      }
    }
  });
});
