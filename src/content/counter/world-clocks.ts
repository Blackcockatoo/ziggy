import type { WorldClockConfig } from "./types";

/** Change, reorder or remove a city here; the clock component needs no edits. */
export const worldClocks: readonly WorldClockConfig[] = [
  {
    id: "frankston",
    city: "Frankston",
    timeZone: "Australia/Melbourne",
    home: true,
    note: "where it actually matters",
  },
  { id: "london", city: "London", timeZone: "Europe/London" },
  { id: "new-york", city: "New York", timeZone: "America/New_York" },
  { id: "rome", city: "Rome", timeZone: "Europe/Rome" },
  { id: "tokyo", city: "Tokyo", timeZone: "Asia/Tokyo" },
  { id: "auckland", city: "Auckland", timeZone: "Pacific/Auckland" },
];
