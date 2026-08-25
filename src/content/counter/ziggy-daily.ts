import type { DailyZiggyConfig } from "./types";

/**
 * These ids point into the existing Ask Ziggy fortune library. The Counter
 * composes the original answer and kicker; it does not maintain a second set
 * of near-duplicate Ziggy sayings.
 */
export const dailyZiggy = {
  timeZone: "Australia/Melbourne",
  fortuneIds: [
    "work-03",
    "luck-03",
    "encouragement-03",
    "frankston-11",
    "family-11",
    "future-05",
    "regret-04",
    "silly-09",
    "work-08",
    "encouragement-08",
  ],
  ownerMessages: {},
  fallback: [
    {
      id: "daily-fallback-useful",
      line: "Do the next useful thing. The rest can wait behind the counter.",
    },
    {
      id: "daily-fallback-door",
      line: "Open the door first. Philosophy can start after smoko.",
    },
  ],
  deeperHref: "#ask-ziggy",
} as const satisfies DailyZiggyConfig;
