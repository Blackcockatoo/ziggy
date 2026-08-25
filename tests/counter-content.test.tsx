import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CounterHome } from "../src/components/counter-home/counter-home";
import { counterModules } from "../src/content/counter/modules";
import { nostalgiaEntries } from "../src/content/counter/nostalgia";
import { shopDetails } from "../src/content/counter/shop-details";
import { usefulLinks } from "../src/content/counter/useful-links";
import { worldClocks } from "../src/content/counter/world-clocks";
import { dailyZiggy } from "../src/content/counter/ziggy-daily";
import { fortunes } from "../src/content/fortunes/library";
import { selectDailyZiggy } from "../src/lib/daily-ziggy";

const markup = renderToStaticMarkup(<CounterHome />);

describe("Counter content configuration", () => {
  it("keeps module ids unique and in the intended first-pass order", () => {
    const ids = counterModules.map((counterModule) => counterModule.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([
      "shop-status",
      "today-board",
      "world-clocks",
      "ziggy-daily",
      "remember-this",
      "useful-links",
    ]);
  });

  it("points every daily Ziggy id at the existing fortune library", () => {
    const fortuneIds = new Set(fortunes.map((fortune) => fortune.id));
    for (const id of dailyZiggy.fortuneIds) expect(fortuneIds.has(id), id).toBe(true);
  });

  it("keeps hours explicitly manual and every configured time well formed", () => {
    expect(shopDetails.schedule.source.kind).toBe("manual");
    expect(shopDetails.schedule.source.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    for (const windows of Object.values(shopDetails.schedule.weekly)) {
      for (const window of windows) {
        expect(window.opens).toMatch(/^\d{2}:\d{2}$/);
        expect(window.closes).toMatch(/^\d{2}:\d{2}$/);
      }
    }
  });

  it("uses valid IANA zones and keeps Frankston as the one home clock", () => {
    expect(worldClocks.filter((clock) => clock.home)).toHaveLength(1);
    for (const clock of worldClocks) {
      expect(() => new Intl.DateTimeFormat("en-AU", { timeZone: clock.timeZone })).not.toThrow();
    }
  });

  it("selects one stable Ziggy line per Melbourne calendar day", () => {
    const morning = selectDailyZiggy(
      new Date("2026-08-25T00:00:00Z"),
      dailyZiggy,
      fortunes,
    );
    const late = selectDailyZiggy(
      new Date("2026-08-25T13:59:00Z"),
      dailyZiggy,
      fortunes,
    );
    const tomorrow = selectDailyZiggy(
      new Date("2026-08-25T14:00:00Z"),
      dailyZiggy,
      fortunes,
    );

    expect(morning.id).toBe(late.id);
    expect(morning.dateKey).toBe("2026-08-25");
    expect(tomorrow.dateKey).toBe("2026-08-26");
    expect(tomorrow.id).not.toBe(morning.id);
  });

  it("keeps nostalgia entries complete, unique and text-first", () => {
    const ids = nostalgiaEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of nostalgiaEntries) {
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.yearOrEra.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(20);
    }
  });

  it("uses only the official Lott host for lottery links", () => {
    for (const link of usefulLinks) {
      expect(new URL(link.href).hostname).toBe("www.thelott.com");
      expect(link.publisher).toBe("The Lott");
    }
  });
});

describe("Counter server-rendered structure", () => {
  it("renders every enabled module in configured order", () => {
    let previous = -1;
    for (const counterModule of counterModules.filter((item) => item.enabled)) {
      const position = markup.indexOf(`data-counter-module="${counterModule.id}"`);
      expect(position, counterModule.id).toBeGreaterThan(previous);
      previous = position;
    }
  });

  it("has honest initial states for client-calculated current values", () => {
    expect(markup).toContain("Checking Melbourne time");
    expect(markup).toContain("Calculated on your device");
    expect(markup).toContain("--:--");
    expect(markup).not.toContain("°C");
  });

  it("exposes essential controls and updates without fake persistence", () => {
    expect(markup).toContain('role="status"');
    expect(markup).toContain('aria-live="polite"');
    expect(markup).toContain('aria-pressed="false"');
    expect(markup).toContain("Bloody hell, yes.");
    expect(markup).toContain("Another one");
  });

  it("links cleanly into the existing exhibition and publishes no future controls", () => {
    expect(markup).toContain('href="#story"');
    expect(markup).toContain("Wander into the exhibition");
    expect(markup).not.toContain("Tonight on the Telly");
    expect(markup).not.toContain("Great Australian Argument");
  });
});
