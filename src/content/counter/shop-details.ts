import { identity } from "../identity";
import type { ShopDetails } from "./types";

/**
 * Regular hours are deliberately manual configuration, not a pretend live
 * feed. Holiday and one-off changes belong in `overrides` once confirmed.
 */
export const shopDetails = {
  name: identity.title,
  address: identity.address,
  schedule: {
    timeZone: "Australia/Melbourne",
    weekly: {
      sunday: [],
      monday: [{ opens: "06:30", closes: "18:00" }],
      tuesday: [{ opens: "06:30", closes: "18:00" }],
      wednesday: [{ opens: "06:30", closes: "18:00" }],
      thursday: [{ opens: "06:30", closes: "19:00" }],
      friday: [{ opens: "06:30", closes: "19:00" }],
      saturday: [{ opens: "06:30", closes: "19:00" }],
    },
    overrides: {},
    source: {
      kind: "manual",
      label: "Listed regular hours",
      checkedOn: "2026-08-25",
      url: "https://www.whereis.com/frankston-vic/wip/cignall-frankston-580279905",
      note: "Manually configured from the shop's current public listing. Public-holiday and one-off hours may differ.",
    },
  },
} as const satisfies ShopDetails;
