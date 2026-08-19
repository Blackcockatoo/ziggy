import { existsSync, readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "../src/app/page";
import { AskZiggy } from "../src/components/ask-ziggy";
import { FortuneCard } from "../src/components/fortune-card";
import { fortunes } from "../src/content/fortunes/library";
import { drawFortune } from "../src/lib/fortune-engine";
import {
  allArtwork,
  artwork,
  boardExamples,
  motionSpecs,
  motionStateIds,
  unattributedClips,
} from "../src/content/artwork";
import { exhibition } from "../src/content/exhibition";
import { machineStates, machineStatus, sequenceFor } from "../src/lib/machine-states";

const markup = renderToStaticMarkup(<Home />);
const machine = renderToStaticMarkup(<AskZiggy />);

const escaped = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

describe("documentary and interpretive material stay separate", () => {
  it("serves every piece of interpretive artwork from /images/ziggy/", () => {
    for (const item of allArtwork) {
      expect(item.src, item.id).toMatch(/^\/images\/ziggy\//);
      expect(item.interpretive, item.id).toBe(true);
    }
  });

  it("never serves archive media from the artwork directory", () => {
    const mediaSources = [
      ...exhibition.timeline.map((entry) => entry.media?.src),
      ...exhibition.ledger.map((entry) => entry.media?.src),
      ...exhibition.monkeys.map((monkey) => monkey.media.src),
      ...exhibition.artefacts.map((item) => item.media.src),
      ...exhibition.principals.map((person) => person.media.src),
      ...exhibition.staff.map((person) => person.media.src),
    ].filter((value): value is string => Boolean(value));

    for (const src of mediaSources) {
      expect(src).toMatch(/^\/archive\//);
      expect(src).not.toMatch(/^\/images\/ziggy\//);
    }
  });

  it("labels artwork depicting people so it is never mistaken for a photograph", () => {
    for (const item of allArtwork) {
      if (!item.depictsPeople) continue;
      expect(item.note, item.id).toBeTruthy();
    }
    // The commemorative poster's disclaimer has to actually reach the page.
    expect(markup).toContain("illustrations rather than documented portraits");
  });

  it("gives every artwork an intrinsic size, so nothing reserves zero space", () => {
    for (const item of allArtwork) {
      expect(item.width, item.id).toBeGreaterThan(0);
      expect(item.height, item.id).toBeGreaterThan(0);
    }
  });

  it("either describes an image or marks it decorative — never both, never neither", () => {
    for (const item of allArtwork) {
      // An empty alt is a deliberate decorative declaration and must be
      // explained in the manifest rather than left as an oversight.
      if (item.alt === "") expect(item.note ?? item.description, item.id).toBeTruthy();
      else expect(item.alt.length, item.id).toBeGreaterThan(20);
    }
  });

  it("does not restate visible page text inside alt text", () => {
    for (const item of allArtwork) {
      expect(item.alt.toLowerCase(), item.id).not.toContain("click");
      expect(item.alt.toLowerCase(), item.id).not.toContain("celebrating 30 years of");
    }
  });
});

describe("Ask Ziggy is still a real form", () => {
  it("renders a labelled question field wired to a real control", () => {
    const label = machine.match(/<label for="([^"]+)">Insert question<\/label>/);
    expect(label).not.toBeNull();
    expect(machine).toContain(`id="${label?.[1]}"`);
  });

  it("renders the lever as a submit button, not an image", () => {
    expect(machine).toMatch(/<button[^>]*type="submit"[^>]*class="fortune-lever"/);
    expect(machine).toContain("Pull");
  });

  it("keeps the fortune slot a polite live region", () => {
    expect(machine).toContain('aria-live="polite"');
  });

  it("starts idle and exposes its state to CSS and to tests", () => {
    expect(machine).toContain('data-machine-state="idle"');
  });

  it("still explains itself with scripting unavailable", () => {
    expect(machine).toContain("<noscript>");
    expect(machine).toContain("The machine needs JavaScript");
  });

  it("does not replace any control with artwork", () => {
    // The interactive surface must be real elements even though the cabinet
    // is now built out of imagery.
    for (const tag of ["<form", "<label", "<input", "<button"]) {
      expect(machine).toContain(tag);
    }
  });

  it("shows Ziggy himself inside the glass", () => {
    expect(glassMarkup()).toContain(optimised(artwork.ziggyWithTray.src));
  });

  it("does not stack a second painted ASK ZIGGY title behind the real heading", () => {
    // Every photographed cabinet carries its own painted signage. Putting one
    // inside the glass would reproduce the h2 as raster text directly behind
    // itself, so only the transparent cutout is allowed in there.
    const glass = glassMarkup();
    for (const painted of [artwork.cabinetFull, artwork.oraclePortrait, artwork.trayTicket]) {
      expect(glass, painted.id).not.toContain(optimised(painted.src));
    }
  });
});

describe("machine states", () => {
  it("runs idle → waking → thinking → issuing → revealed", () => {
    expect(machineStates).toEqual(["idle", "waking", "thinking", "issuing", "revealed"]);
  });

  it("wakes the cabinet on the first pull and skips the wake afterwards", () => {
    expect(sequenceFor(true)).toEqual(["waking", "thinking", "issuing"]);
    expect(sequenceFor(false)).toEqual(["thinking", "issuing"]);
  });

  it("says something meaningful while working, rather than showing a spinner", () => {
    for (const state of ["waking", "thinking", "issuing"] as const) {
      expect(machineStatus[state].length, state).toBeGreaterThan(0);
    }
    // The resting states are silent: there is nothing in progress to announce.
    expect(machineStatus.idle).toBe("");
    expect(machineStatus.revealed).toBe("");
  });

  it("keeps the reduced-motion path from hiding anything", () => {
    // Under reduced motion the component sets `revealed` synchronously, so the
    // only thing that could withhold the fortune is a CSS rule that hides it.
    const css = machineCss();
    expect(css).not.toMatch(/prefers-reduced-motion[\s\S]*?\.fortune-card\s*\{[^}]*display:\s*none/);
    expect(css).not.toMatch(/prefers-reduced-motion[\s\S]*?\.fortune-card\s*\{[^}]*visibility:\s*hidden/);
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("only animates on state, never gating content behind a state class", () => {
    const css = machineCss();
    // No rule may hide the ticket for a particular machine state.
    expect(css).not.toMatch(/data-machine-state="[a-z]+"\][^{]*\.fortune-card\s*\{[^}]*display:\s*none/);
  });
});

describe("the printed ticket", () => {
  const css = machineCss();

  it("prints its own light colours instead of inheriting the dark cabinet", () => {
    const printBlock = css.slice(css.indexOf("@media print"));
    expect(printBlock).toMatch(/\.fortune-card\s*\{[\s\S]*?background:\s*#fff/);
    expect(printBlock).toMatch(/\.fortune-card\s*\{[\s\S]*?color:\s*#000/);
  });

  it("keeps the fortune itself visible when the ticket is isolated for print", () => {
    const printBlock = css.slice(css.indexOf("@media print"));
    expect(printBlock).toContain('body[data-printing="fortune"] .fortune-card,');
    expect(printBlock).toContain("visibility: visible");
  });
});

describe("the board and the bridge into the oracle", () => {
  it("renders the Ziggy Says room before Ask Ziggy in the walking order", () => {
    expect(markup.indexOf('id="board"')).toBeGreaterThan(-1);
    expect(markup.indexOf('id="board"')).toBeLessThan(markup.indexOf('id="ask-ziggy"'));
  });

  it("puts every board line on the page as real text, not baked into artwork", () => {
    for (const line of [
      ...exhibition.boardEntries.map((entry) => entry.line),
      ...boardExamples.map((example) => example.line),
    ]) {
      if (!line) continue;
      expect(markup).toContain(escaped(line));
    }
  });

  it("renders an empty board as an empty board", () => {
    expect(markup).toContain('data-written="false"');
    expect(markup).toContain("An empty board.");
  });

  it("does not present an unconfirmed board line as documented fact", () => {
    for (const entry of exhibition.boardEntries) {
      expect(entry.evidence.status, entry.id).not.toBe("verified");
    }
  });

  it("requires a note explaining why an archival slot is still empty", () => {
    for (const entry of exhibition.boardEntries) {
      if (entry.line !== "") continue;
      expect(entry.evidence.note, entry.id).toBeTruthy();
    }
  });

  it("states the board-to-machine idea out loud", () => {
    expect(markup).toContain("long before anyone built him a way to answer back");
  });
});

describe("motion direction", () => {
  it("addresses each sequence by a stable semantic id", () => {
    expect(motionStateIds).toEqual(["wake-up", "the-answer", "dont-ask-twice"]);
    for (const id of motionStateIds) {
      // The key, the id and the caller's handle are the same string, so no
      // lookup can silently depend on ordering.
      expect(motionSpecs[id].id).toBe(id);
      expect(motionSpecs[id].beats.length).toBeGreaterThan(3);
    }
  });

  it("leaves every slot disabled while its footage is unattributed", () => {
    // Three clips were supplied and none has been confirmed against a
    // sequence. Binding one on a guess would put the wrong footage behind a
    // named state.
    for (const id of motionStateIds) {
      expect(motionSpecs[id].clip, id).toBeNull();
      expect(motionSpecs[id].enabled, id).toBe(false);
    }
  });

  it("never enables a slot that has no confirmed clip", () => {
    for (const id of motionStateIds) {
      const spec = motionSpecs[id];
      if (spec.enabled) expect(spec.clip, id).toBeTruthy();
    }
  });

  it("keeps unattributed footage under names that claim nothing", () => {
    expect(unattributedClips).toHaveLength(3);
    for (const src of unattributedClips) {
      expect(src).toMatch(/^\/images\/ziggy\/oracle\/motion\/unattributed\/clip-[a-c]\.mp4$/);
      // A filename must not assert the mapping the manifest refuses to make.
      for (const id of motionStateIds) expect(src).not.toContain(id);
    }
  });

  it("mounts no video: the states are CSS and React", () => {
    expect(markup).not.toContain("<video");
    expect(markup).not.toContain(".mp4");
  });

  it("only names machine states that actually exist", () => {
    for (const id of motionStateIds) {
      for (const state of motionSpecs[id].states) {
        expect(machineStates as string[], `${id} → ${state}`).toContain(state);
      }
    }
  });
});

/** next/image rewrites srcs through its optimiser, so match the encoded form. */
function optimised(src: string): string {
  return encodeURIComponent(src);
}

/** Just the cabinet's glass area, so assertions about it cannot drift. */
function glassMarkup(): string {
  const start = machine.indexOf("fortune-machine__scene");
  const end = machine.indexOf("fortune-machine__controls");
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return machine.slice(start, end);
}

/** Read the stylesheet once, lazily, for the CSS-contract assertions above. */
function machineCss(): string {
  return cssCache ?? (cssCache = readCss());
}
let cssCache: string | null = null;
function readCss(): string {
  return readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
}

describe("artwork references resolve", () => {
  /** Page plus an issued ticket: the seal only exists on a drawn fortune. */
  const surface =
    markup +
    renderToStaticMarkup(
      <FortuneCard
        ticket={drawFortune({ question: "Should I quit my job?", library: fortunes })}
        issuedOn="19 Aug 2026"
      />,
    );

  it("points every manifest entry at a file that actually exists", () => {
    for (const item of allArtwork) {
      const path = new URL(`../public${item.src}`, import.meta.url);
      expect(existsSync(path), `${item.id} → ${item.src} is missing from public/`).toBe(
        true,
      );
    }
  });

  it("keeps every mounted asset reachable in the rendered experience", () => {
    for (const item of allArtwork.filter((a) => a.usage === "mounted")) {
      expect(surface, `${item.id} is marked mounted but nothing renders it`).toContain(
        optimised(item.src),
      );
    }
  });

  it("allows an asset to be reused in as many places as it earns", () => {
    // The blank board is the frame behind every board, archival and example
    // alike. Reuse is a legitimate outcome, not a smell, so nothing here
    // asserts a render count.
    const occurrences = surface.split(optimised(artwork.boardBlank.src)).length - 1;
    expect(occurrences).toBeGreaterThan(1);
  });

  it("allows a production-ready asset to lie dormant, if it says why", () => {
    for (const item of allArtwork.filter((a) => a.usage === "reserved")) {
      expect(item.note, `${item.id} is reserved without explaining why`).toBeTruthy();
    }
  });

  it("does not preload the library: only genuine hero imagery is eager", () => {
    expect(surface).not.toContain('loading="eager"');
  });
});

describe("example board wording is never mistaken for archive", () => {
  it("keeps the archive free of exhibition-written lines", () => {
    const exampleLines = boardExamples.map((example) => example.line);
    for (const entry of exhibition.boardEntries) {
      expect(exampleLines, `board entry ${entry.id}`).not.toContain(entry.line);
    }
  });

  it("holds no board transcription that is not documented", () => {
    // A filled `line` is a claim that somebody saw those words on the real
    // board, so it needs a documentary status and a source. Everything else
    // must be an empty slot.
    for (const entry of exhibition.boardEntries) {
      if (entry.line === "") continue;
      expect(["verified", "probable"], entry.id).toContain(entry.evidence.status);
      expect(entry.evidence.sourceIds?.length ?? 0, entry.id).toBeGreaterThan(0);
    }
  });

  it("never files concept wording as a historical research lead", () => {
    const exampleLines = new Set(boardExamples.map((example) => example.line));
    for (const entry of exhibition.boardEntries) {
      if (entry.evidence.status !== "needs-confirmation") continue;
      expect(exampleLines.has(entry.line), entry.id).toBe(false);
    }
  });

  it("marks every example as interpretive and says where it came from", () => {
    for (const example of boardExamples) {
      expect(example.interpretive, example.id).toBe(true);
      expect(example.provenance, example.id).toMatch(/not a Monkey Shop board transcription/i);
    }
  });

  it("labels examples on the page, next to the wording", () => {
    for (const example of boardExamples) {
      expect(markup).toContain(escaped(example.line));
    }
    expect(markup).toContain('data-kind="example"');
    expect(markup).toContain("Exhibition artwork");
    expect(markup).toContain("written for the exhibition");
  });

  it("separates the archive from the examples in the markup", () => {
    expect(markup).toContain('data-kind="record"');
    expect(markup.indexOf('data-kind="record"')).toBeLessThan(
      markup.indexOf('data-kind="example"'),
    );
  });
});
