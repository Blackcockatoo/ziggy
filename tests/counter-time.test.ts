import { describe, expect, it } from "vitest";
import { shopDetails } from "../src/content/counter/shop-details";
import type { ShopSchedule } from "../src/content/counter/types";
import { worldClocks } from "../src/content/counter/world-clocks";
import {
  dateKeyInTimeZone,
  evaluateShopStatus,
  formatWorldClock,
} from "../src/lib/counter-time";

describe("Melbourne-aware shop status", () => {
  it("opens on the exact opening minute", () => {
    const before = evaluateShopStatus(
      new Date("2026-08-24T20:29:00Z"),
      shopDetails.schedule,
    );
    const boundary = evaluateShopStatus(
      new Date("2026-08-24T20:30:00Z"),
      shopDetails.schedule,
    );

    expect(before.kind).toBe("closed");
    expect(before.kind === "closed" ? before.nextOpening?.dayOffset : null).toBe(0);
    expect(boundary).toMatchObject({ kind: "open", closesAt: "18:00" });
  });

  it("closes on the exact closing minute", () => {
    const before = evaluateShopStatus(
      new Date("2026-08-25T07:59:00Z"),
      shopDetails.schedule,
    );
    const boundary = evaluateShopStatus(
      new Date("2026-08-25T08:00:00Z"),
      shopDetails.schedule,
    );

    expect(before.kind).toBe("open");
    expect(boundary.kind).toBe("closed");
  });

  it("uses the longer Thursday-to-Saturday window", () => {
    const thursdayEvening = evaluateShopStatus(
      new Date("2026-08-27T08:30:00Z"),
      shopDetails.schedule,
    );
    expect(thursdayEvening).toMatchObject({ kind: "open", closesAt: "19:00" });
  });

  it("keeps Sunday closed and points to Monday", () => {
    const sunday = evaluateShopStatus(
      new Date("2026-08-29T22:00:00Z"),
      shopDetails.schedule,
    );
    expect(sunday).toMatchObject({
      kind: "closed",
      nextOpening: { dayOffset: 1, weekday: "monday", opensAt: "06:30" },
    });
  });

  it("lets a confirmed date override the regular week", () => {
    const schedule: ShopSchedule = {
      ...shopDetails.schedule,
      overrides: { "2026-08-25": [] },
    };
    const otherwiseOpen = evaluateShopStatus(new Date("2026-08-25T00:00:00Z"), schedule);
    expect(otherwiseOpen.kind).toBe("closed");
  });

  it("handles a window that crosses midnight", () => {
    const overnight: ShopSchedule = {
      timeZone: "Australia/Melbourne",
      weekly: {
        sunday: [],
        monday: [{ opens: "22:00", closes: "02:00" }],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
      },
      overrides: {},
      source: { kind: "manual", label: "Test", checkedOn: "2026-08-25" },
    };

    expect(evaluateShopStatus(new Date("2026-08-24T13:00:00Z"), overnight)).toMatchObject({
      kind: "open",
      closesAt: "02:00",
      closesDayOffset: 1,
    });
    expect(evaluateShopStatus(new Date("2026-08-24T15:59:00Z"), overnight)).toMatchObject({
      kind: "open",
      closesAt: "02:00",
      closesDayOffset: 0,
    });
    expect(evaluateShopStatus(new Date("2026-08-24T16:00:00Z"), overnight).kind).toBe(
      "closed",
    );
  });
});

describe("calendar and world clocks", () => {
  it("changes the Melbourne date at Melbourne midnight, not UTC midnight", () => {
    expect(
      dateKeyInTimeZone(new Date("2026-08-25T13:59:00Z"), "Australia/Melbourne"),
    ).toBe("2026-08-25");
    expect(
      dateKeyInTimeZone(new Date("2026-08-25T14:00:00Z"), "Australia/Melbourne"),
    ).toBe("2026-08-26");
  });

  it("formats configured IANA zones and marks a different calendar day", () => {
    const instant = new Date("2026-08-25T14:00:00Z");
    const london = worldClocks.find((clock) => clock.id === "london");
    const auckland = worldClocks.find((clock) => clock.id === "auckland");

    expect(london).toBeDefined();
    expect(auckland).toBeDefined();
    expect(formatWorldClock(instant, london!, "Australia/Melbourne")).toMatchObject({
      time: "3:00 pm",
      dateKey: "2026-08-25",
      dateNote: "Yesterday · 25 Aug",
    });
    expect(formatWorldClock(instant, auckland!, "Australia/Melbourne")).toMatchObject({
      time: "2:00 am",
      dateKey: "2026-08-26",
      dateNote: null,
    });
  });
});
