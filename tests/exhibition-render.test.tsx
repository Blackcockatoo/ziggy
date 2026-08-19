import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "../src/app/page";
import { exhibition } from "../src/content/exhibition";

/**
 * Server-rendered structure tests.
 *
 * These assert the exhibition's bones: that every room the navigation promises
 * actually exists, that the ledger renders ten rows without dressing up the
 * empty ones, and that the controls a keyboard or screen-reader user depends
 * on are present in the markup before any JavaScript runs.
 */
const markup = renderToStaticMarkup(<Home />);

/** React escapes text nodes, so expected strings must be escaped to match. */
const escaped = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

describe("exhibition chapters", () => {
  const requiredSections = [
    "top",
    "story",
    "ledger",
    "monkey",
    "ask-ziggy",
    "counter",
    "gang",
    "around-town",
    "archive",
    "rob-and-carla",
    "visit",
  ];

  it.each(requiredSections)("renders the %s room", (id) => {
    expect(markup).toContain(`id="${id}"`);
  });

  it("renders a target for every navigation anchor", () => {
    for (const item of exhibition.navigation) {
      const id = item.href.slice(1);
      expect(markup, `nav points at #${id}`).toContain(`id="${id}"`);
    }
  });

  it("states the thesis and the address", () => {
    expect(markup).toContain(escaped("Some businesses trade in Frankston."));
    expect(markup).toContain("8 Thompson Street");
    expect(markup).toContain("Look for the monkey.");
  });
});

describe("the luck ledger renders", () => {
  it("draws all ten numbered rows", () => {
    for (let number = 1; number <= 10; number += 1) {
      expect(markup).toContain(`>${String(number).padStart(2, "0")}</strong>`);
    }
  });

  it("marks incomplete wins as incomplete in the markup", () => {
    const incomplete = (markup.match(/data-complete="false"/g) ?? []).length;
    const complete = (markup.match(/data-complete="true"/g) ?? []).length;

    expect(complete).toBe(1);
    expect(incomplete).toBe(9);
  });

  it("shows the verified tenth win with its draw and prize", () => {
    expect(markup).toContain("$3,126,800.49");
    expect(markup).toContain("Draw 4685");
  });

  it("does not attach a documented label to an empty row", () => {
    const rows = markup.split('class="ledger__row"');
    for (const row of rows.slice(1)) {
      if (!row.includes('data-complete="false"')) continue;
      const upToNextRow = row.split("</li>")[0];
      expect(upToNextRow).not.toContain('data-evidence-class="documented"');
    }
  });
});

describe("accessibility-critical structure", () => {
  it("offers a skip link before anything else", () => {
    expect(markup.indexOf('class="skip-link"')).toBeGreaterThanOrEqual(0);
    expect(markup.indexOf('class="skip-link"')).toBeLessThan(markup.indexOf("front-window"));
  });

  it("gives the Ask Ziggy question field a real label and control", () => {
    const labelFor = markup.match(/<label for="([^"]+)">Insert question<\/label>/);
    expect(labelFor).not.toBeNull();
    expect(markup).toContain(`id="${labelFor?.[1]}"`);
    expect(markup).toContain("Pull");
  });

  it("announces the fortune slot politely", () => {
    expect(markup).toContain('aria-live="polite"');
  });

  it("keeps the counter usable without JavaScript", () => {
    // Native <details name="counter"> gives exclusive-accordion behaviour,
    // keyboard support and screen-reader semantics with zero script.
    expect(markup).toContain('name="counter"');
    expect(markup).toContain("<summary>");
  });

  it("exposes one h1 and no skipped heading levels in the front window", () => {
    const h1s = markup.match(/<h1[\s>]/g) ?? [];
    expect(h1s).toHaveLength(1);
  });

  it("writes alt text or an accessible name for every media slot", () => {
    for (const artefact of exhibition.artefacts) {
      expect(markup, artefact.catalogue).toContain(escaped(artefact.media.alt));
    }
  });

  it("still explains Ask Ziggy when scripting is unavailable", () => {
    expect(markup).toContain("<noscript>");
    expect(markup).toContain("The machine needs JavaScript");
  });
});

describe("honesty labels reach the page", () => {
  it("shows both documented and lore classifications", () => {
    expect(markup).toContain('data-evidence-class="documented"');
    expect(markup).toContain('data-evidence-class="lore"');
    expect(markup).toContain('data-evidence-class="empty"');
  });

  it("links out to the sources it cites", () => {
    expect(markup).toContain("mediacentre.thelott.com");
  });

  it("does not present the mornings count as established fact", () => {
    expect(markup).toContain("mornings");
    expect(markup).toContain("this number is an illustration");
  });
});
