import { describe, expect, it } from "vitest";
import { fortunes } from "../src/content/fortunes/library";
import { categoryProfiles } from "../src/content/fortunes/categories";
import {
  classifyQuestion,
  drawFortune,
  fortuneSerial,
  hashQuestion,
} from "../src/lib/fortune-engine";
import type { FortuneCategory } from "../src/content/fortunes/types";

describe("question classification", () => {
  it("routes shop-relevant questions to the right drawer", () => {
    expect(classifyQuestion("Should I quit my job?")).toBe("work");
    expect(classifyQuestion("Will I win the lotto?")).toBe("luck");
    expect(classifyQuestion("Should I leave Frankston?")).toBe("frankston");
    expect(classifyQuestion("Can I afford the rent?")).toBe("money");
    expect(classifyQuestion("Should I ring my mother?")).toBe("family");
    expect(classifyQuestion("Do I text my ex?")).toBe("love");
    expect(classifyQuestion("Was it a mistake?")).toBe("regret");
  });

  it("falls back to mysterious nonsense rather than guessing", () => {
    expect(classifyQuestion("Is this a terrible plan?")).toBe("mystery");
    expect(classifyQuestion("")).toBe("mystery");
    expect(classifyQuestion("   ")).toBe("mystery");
  });

  it("matches whole words, not fragments of longer ones", () => {
    // "bet" must not fire on "better"; "pay" must not fire on "paying attention".
    expect(classifyQuestion("Is my nan getting better?")).toBe("family");
  });

  it("is case and whitespace insensitive", () => {
    expect(classifyQuestion("  SHOULD I QUIT MY JOB?  ")).toBe("work");
    expect(hashQuestion("  FRANKSTON  ")).toBe(hashQuestion("frankston"));
  });
});

describe("drawing a fortune", () => {
  it("gives the same first answer to the same question every time", () => {
    const first = drawFortune({ question: "Should I quit my job?", library: fortunes });
    const second = drawFortune({ question: "Should I quit my job?", library: fortunes });

    expect(second).toEqual(first);
    expect(first.category).toBe("work");
  });

  it("returns a complete, non-empty ticket", () => {
    const ticket = drawFortune({ question: "Will I get rich?", library: fortunes });

    expect(ticket.answer.length).toBeGreaterThan(0);
    expect(ticket.kicker.length).toBeGreaterThan(0);
    expect(ticket.question).toBe("Will I get rich?");
    expect(ticket.sourceIds.length).toBeGreaterThan(0);
    expect(ticket.serial).toMatch(/^ZG-[A-Z]{3}-[0-9A-Z]+-\d{2}$/);
  });

  it("only ever prints lines that exist in the handwritten library", () => {
    const answers = new Set(fortunes.map((fortune) => fortune.answer));
    const kickers = new Set(fortunes.map((fortune) => fortune.kicker));

    for (const question of ["Should I move?", "Will I be ok?", "asdf", "Is the shop lucky?"]) {
      for (let drawIndex = 0; drawIndex < 12; drawIndex += 1) {
        const ticket = drawFortune({ question, library: fortunes, drawIndex });
        expect(answers.has(ticket.answer)).toBe(true);
        expect(kickers.has(ticket.kicker)).toBe(true);
      }
    }
  });

  it("stays inside the classified drawer, including on remixes", () => {
    const byId = new Map(fortunes.map((fortune) => [fortune.id, fortune]));

    for (let drawIndex = 0; drawIndex < 25; drawIndex += 1) {
      const ticket = drawFortune({
        question: "Should I quit my job?",
        library: fortunes,
        drawIndex,
      });
      expect(ticket.category).toBe("work");
      for (const id of ticket.sourceIds) {
        expect(byId.get(id)?.category).toBe("work");
      }
    }
  });

  it("never recombines a line whose halves were written to stay together", () => {
    const byId = new Map(fortunes.map((fortune) => [fortune.id, fortune]));
    const questions = [
      "Should I quit my job?",
      "Will I win?",
      "Do I still love them?",
      "What is the meaning of it?",
      "Should I ring my dad?",
      "Should I leave Frankston?",
    ];

    for (const question of questions) {
      for (let drawIndex = 0; drawIndex < 30; drawIndex += 1) {
        const ticket = drawFortune({ question, library: fortunes, drawIndex });
        if (!ticket.remixed) continue;
        for (const id of ticket.sourceIds) {
          expect(byId.get(id)?.pairing, `${id} was remixed`).not.toBe("fixed");
        }
      }
    }
  });

  it("produces new tickets when the lever is pulled again", () => {
    const seen = new Set<string>();
    for (let drawIndex = 0; drawIndex < 10; drawIndex += 1) {
      const ticket = drawFortune({
        question: "Should I leave Frankston?",
        library: fortunes,
        drawIndex,
      });
      seen.add(`${ticket.answer}|${ticket.kicker}`);
    }
    expect(seen.size).toBeGreaterThan(5);
  });

  it("refuses an empty question and an empty library", () => {
    expect(() => drawFortune({ question: "   ", library: fortunes })).toThrow(
      "Ziggy needs a question",
    );
    expect(() => drawFortune({ question: "hello", library: [] })).toThrow(
      "At least one Ziggy fortune is required",
    );
  });

  it("falls back to another drawer rather than throwing when one is empty", () => {
    const onlyMystery = fortunes.filter((fortune) => fortune.category === "mystery");
    const ticket = drawFortune({ question: "Should I quit my job?", library: onlyMystery });

    expect(ticket.category).toBe("mystery");
    expect(ticket.answer.length).toBeGreaterThan(0);
  });
});

describe("the fortune library", () => {
  it("has a drawer of usable lines for every category on the dial", () => {
    for (const profile of categoryProfiles) {
      const drawer = fortunes.filter((fortune) => fortune.category === profile.id);
      expect(drawer.length, `${profile.id} drawer`).toBeGreaterThanOrEqual(10);
    }
  });

  it("uses unique fortune ids", () => {
    const ids = fortunes.map((fortune) => fortune.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses unique serial codes per category", () => {
    const codes = categoryProfiles.map((profile) => profile.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) expect(code).toMatch(/^[A-Z]{3}$/);
  });

  it("keeps every line short enough to read on a printed card", () => {
    for (const fortune of fortunes) {
      expect(fortune.answer.length, fortune.id).toBeLessThanOrEqual(46);
      expect(fortune.kicker.length, fortune.id).toBeLessThanOrEqual(96);
    }
  });

  it("only files fortunes under categories the dial knows about", () => {
    const known = new Set<FortuneCategory>(categoryProfiles.map((profile) => profile.id));
    for (const fortune of fortunes) {
      expect(known.has(fortune.category), fortune.id).toBe(true);
    }
  });

  it("carries enough handwritten material to be worth building a machine for", () => {
    expect(fortunes.length).toBeGreaterThanOrEqual(120);
  });
});

describe("serial numbers", () => {
  it("encodes the drawer and the draw number", () => {
    expect(fortuneSerial("work", "Should I quit?", 0)).toMatch(/^ZG-WRK-[0-9A-Z]+-01$/);
    expect(fortuneSerial("work", "Should I quit?", 4)).toMatch(/^ZG-WRK-[0-9A-Z]+-05$/);
  });

  it("gives different questions different stamps", () => {
    expect(fortuneSerial("money", "Will I get rich?", 0)).not.toBe(
      fortuneSerial("money", "Will I be poor?", 0),
    );
  });
});
