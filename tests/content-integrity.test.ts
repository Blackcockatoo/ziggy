import { describe, expect, it } from "vitest";
import {
  exhibition,
  lotteryExclusions,
  unplacedWins,
} from "../src/content/exhibition";
import { evidenceClass } from "../src/lib/evidence";
import type { Evidence } from "../src/content/types";

const knownSourceIds = new Set(exhibition.sources.map((source) => source.id));

/** Every evidence record in the exhibition, with a path for readable failures. */
function allEvidence(): Array<{ path: string; evidence: Evidence }> {
  const records: Array<{ path: string; evidence: Evidence }> = [];
  const push = (path: string, evidence?: Evidence) => {
    if (evidence) records.push({ path, evidence });
  };

  push("identity/approximate-mornings", exhibition.identity.approximateMornings.evidence);
  exhibition.timeline.forEach((entry) => {
    push(`timeline/${entry.id}`, entry.evidence);
    push(`timeline/${entry.id}/media`, entry.media?.evidence);
  });
  exhibition.lore.forEach((item) => push(`lore/${item.id}`, item.evidence));
  exhibition.ledger.forEach((entry) => {
    push(`ledger/${entry.number}`, entry.evidence);
    push(`ledger/${entry.number}/media`, entry.media?.evidence);
  });
  unplacedWins.forEach((entry) => push(`unplaced/${entry.draw}`, entry.evidence));
  exhibition.monkeys.forEach((monkey) => {
    push(`monkeys/${monkey.id}`, monkey.evidence);
    push(`monkeys/${monkey.id}/media`, monkey.media.evidence);
  });
  exhibition.counterObjects.forEach((object) =>
    push(`counterObjects/${object.id}`, object.evidence),
  );
  exhibition.memories.forEach((memory) => push(`memories/${memory.id}`, memory.evidence));
  [...exhibition.principals, ...exhibition.staff].forEach((person) => {
    push(`people/${person.id}`, person.evidence);
    push(`people/${person.id}/media`, person.media.evidence);
  });
  exhibition.community.forEach((record) => push(`community/${record.id}`, record.evidence));
  exhibition.artefacts.forEach((artefact) => {
    push(`artefacts/${artefact.catalogue}`, artefact.evidence);
    push(`artefacts/${artefact.catalogue}/media`, artefact.media.evidence);
  });

  return records;
}

describe("sourcing integrity", () => {
  it("only cites sources that exist in the register", () => {
    for (const { path, evidence } of allEvidence()) {
      for (const sourceId of evidence.sourceIds ?? []) {
        expect(knownSourceIds.has(sourceId), `${path} cites unknown source ${sourceId}`).toBe(
          true,
        );
      }
    }
  });

  it("never marks a documented or strongly supported claim without a source", () => {
    for (const { path, evidence } of allEvidence()) {
      if (
        evidence.status !== "verified" &&
        evidence.status !== "strongly-supported"
      ) {
        continue;
      }
      expect(evidence.sourceIds?.length ?? 0, `${path} is verified with no source`).toBeGreaterThan(
        0,
      );
    }
  });

  it("classifies unverified material as lore or as an empty slot, never as documented", () => {
    for (const { path, evidence } of allEvidence()) {
      if (
        evidence.status === "verified" ||
        evidence.status === "strongly-supported" ||
        evidence.status === "probable"
      ) {
        continue;
      }
      expect(evidenceClass(evidence.status), `${path}`).not.toBe("documented");
    }
  });

  it("gives every source a publisher and a usable label", () => {
    for (const source of exhibition.sources) {
      expect(source.label.length).toBeGreaterThan(0);
      expect(source.publisher.length).toBeGreaterThan(0);
      if (source.url) expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it("keeps the mornings counter approximate and free of an invented day", () => {
    expect(exhibition.identity.approximateMornings.evidence.status).not.toBe("verified");
    expect(exhibition.identity.approximateMornings.display).toContain("≈");
  });
});

describe("the luck ledger", () => {
  it("reserves exactly ten numbered Division One slots", () => {
    expect(exhibition.ledger).toHaveLength(10);
    expect(exhibition.ledger.map((entry) => entry.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("does not let an incomplete win masquerade as a verified one", () => {
    const incomplete = exhibition.ledger.filter((entry) => !entry.date || !entry.prize);

    expect(incomplete.length).toBeGreaterThan(0);
    for (const entry of incomplete) {
      expect(entry.evidence.status, `win ${entry.number}`).not.toBe("verified");
      expect(entry.evidence.status, `win ${entry.number}`).not.toBe("probable");
    }
  });

  it("requires a source on any win presented as fact", () => {
    for (const entry of [...exhibition.ledger, ...unplacedWins]) {
      if (entry.evidence.status !== "verified") continue;
      expect(entry.date, `win ${entry.number} claims verified`).toBeTruthy();
      expect(entry.evidence.sourceIds?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps sourced-but-unplaced wins out of the numbered sequence", () => {
    const numbered = new Set(exhibition.ledger.map((entry) => entry.number));
    for (const entry of unplacedWins) {
      expect(numbered.has(entry.number)).toBe(false);
    }
  });

  it("recovers only the supported earlier draws without assigning sequence numbers", () => {
    expect(unplacedWins.map((entry) => entry.draw)).toEqual(["3621", "3945", "4223"]);
    expect(exhibition.ledger.slice(0, 9).every((entry) => entry.draw === undefined)).toBe(
      true,
    );
  });

  it("keeps the supported tenth-win figure and preserves different-retailer exclusions", () => {
    expect(exhibition.ledger[9].draw).toBe("4685");
    expect(exhibition.ledger[9].prize).toBe("$3,127,800.49");
    expect(lotteryExclusions).toHaveLength(3);
    for (const exclusion of lotteryExclusions) {
      expect(exclusion.retailer).not.toContain("8 Thompson Street");
      for (const sourceId of exclusion.sourceIds) {
        expect(knownSourceIds.has(sourceId)).toBe(true);
      }
    }
  });
});

describe("oral history", () => {
  it("never publishes a recorded fragment without permission", () => {
    for (const memory of exhibition.memories) {
      if (!memory.fragment) continue;
      expect(memory.evidence.permission, `memory ${memory.id}`).toBe("granted");
    }
  });

  it("gives every memory a prompt, so an empty record still asks its question", () => {
    for (const memory of exhibition.memories) {
      expect(memory.prompt.length, `memory ${memory.id}`).toBeGreaterThan(0);
    }
  });

  it("attaches counter memories to counter objects that exist", () => {
    const objectIds = new Set(exhibition.counterObjects.map((object) => object.id));
    for (const memory of exhibition.memories) {
      if (!memory.objectId) continue;
      expect(objectIds.has(memory.objectId), `memory ${memory.id}`).toBe(true);
    }
  });

  it("requires permission before a staff member's personal detail is published", () => {
    for (const person of exhibition.staff) {
      const hasPersonalDetail = Boolean(
        person.nickname || person.anecdote || person.favouriteMemory || person.whereabouts,
      );
      if (!hasPersonalDetail) continue;
      expect(person.evidence.permission, `staff ${person.id}`).toBe("granted");
    }
  });
});

describe("the object archive", () => {
  it("gives every artefact a unique catalogue number", () => {
    const numbers = exhibition.artefacts.map((artefact) => artefact.catalogue);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("uses the MS-<year|XXXX>-<sequence> catalogue format", () => {
    for (const artefact of exhibition.artefacts) {
      expect(artefact.catalogue, artefact.title).toMatch(/^MS-(\d{4}|XXXX)-\d{3}$/);
    }
  });

  it("writes alt text and a caption for every media slot, filled or empty", () => {
    for (const artefact of exhibition.artefacts) {
      expect(artefact.media.alt.length, artefact.catalogue).toBeGreaterThan(0);
      expect(artefact.media.caption.length, artefact.catalogue).toBeGreaterThan(0);
    }
  });

  it("only points at related records that exist", () => {
    const ids = new Set([
      ...exhibition.timeline.map((entry) => entry.id),
      ...exhibition.monkeys.map((monkey) => monkey.id),
      ...exhibition.principals.map((person) => person.id),
      ...exhibition.staff.map((person) => person.id),
      ...exhibition.counterObjects.map((object) => object.id),
    ]);

    for (const artefact of exhibition.artefacts) {
      for (const related of artefact.relatedIds ?? []) {
        expect(ids.has(related), `${artefact.catalogue} → ${related}`).toBe(true);
      }
    }
  });
});

describe("the timeline", () => {
  it("runs in chronological order", () => {
    const keys = exhibition.timeline.map((entry) => entry.sortKey);
    expect([...keys].sort((a, b) => a - b)).toEqual(keys);
  });

  it("gives every entry a unique id", () => {
    const ids = exhibition.timeline.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only references artefacts that are in the catalogue", () => {
    const catalogue = new Set(exhibition.artefacts.map((artefact) => artefact.catalogue));
    for (const entry of exhibition.timeline) {
      for (const artefactId of entry.artefactIds ?? []) {
        expect(catalogue.has(artefactId), `${entry.id} → ${artefactId}`).toBe(true);
      }
    }
  });

  it("only references Division One wins that exist in the ledger", () => {
    const numbers = new Set(exhibition.ledger.map((entry) => entry.number));
    for (const entry of exhibition.timeline) {
      for (const win of entry.winNumbers ?? []) {
        expect(numbers.has(win), `${entry.id} → win ${win}`).toBe(true);
      }
    }
  });

  it("keeps registry dates separate from the supported opening frame", () => {
    const opening = exhibition.timeline.find((entry) => entry.id === "opening");
    const registry = exhibition.timeline.find((entry) => entry.id === "before-cignall");

    expect(opening?.year).toBe("Est. 1996");
    expect(opening?.story).toContain("No day or month has been invented");
    expect(registry?.title).toBe("The names in the public record");
    expect(registry?.story).toContain("do not establish");
  });
});

describe("the monkey record", () => {
  it("keeps the succession ambiguity visible rather than resolving it", () => {
    const unconfirmed = exhibition.monkeys.filter(
      (monkey) => monkey.status === "unconfirmed" || monkey.evidence.status !== "verified",
    );
    expect(unconfirmed.length).toBeGreaterThan(0);
  });

  it("keeps historical Ziggie and Archie separate from exhibition Ziggy", () => {
    const ziggie = exhibition.monkeys.find((monkey) => monkey.id === "ziggy");
    expect(ziggie?.name).toBe("Ziggie");
    expect(ziggie?.aliases.join(" ")).not.toContain("Ziggy");
    expect(exhibition.monkeys.map((monkey) => monkey.name)).toContain("Archie");
  });
});
