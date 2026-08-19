import type { Source } from "./types";

/**
 * Every citation the exhibition can point at.
 *
 * Add a source here first, then reference it by id from an evidence record.
 * A `verified` claim without a resolvable source id fails the content tests.
 */
export const sources: Source[] = [
  {
    id: "lott-2026-tenth-win",
    label: "Frankston man's $3.1 million TattsLotto phone call",
    publisher: "The Lott Media Centre",
    kind: "official",
    url: "https://mediacentre.thelott.com/media-releases/frankston-mans-3-1-million-tattslotto-phone-call-burns-more-calories-than-his-workout/",
    retrievedOn: "2026-06-16",
    note: "Names the agency, the address, Archie, the tenth Division One win and the prize amount.",
  },
  {
    id: "lott-2022-million",
    label: "Coffee run leads to $1 million TattsLotto discovery",
    publisher: "The Lott Media Centre",
    kind: "official",
    url: "https://mediacentre.thelott.com/media-releases/coffee-run-leads-to-1-million-tattslotto-discovery-for-rosebud-man/",
    retrievedOn: "2026-06-16",
    note: "Division One, draw 4223, ticket sold at 8 Thompson Street. Sequence position within the ten is not stated.",
  },
  {
    id: "shop-ledger",
    label: "Shop records, receipts, signage and photographs held on site",
    publisher: "Rob and Carla Macaro",
    kind: "shop-record",
    note: "Not yet sighted. The single most valuable outstanding source for this project.",
  },
  {
    id: "interview-rob",
    label: "Recorded interview with Rob",
    publisher: "The Monkey Shop exhibition",
    kind: "interview",
    note: "Not yet recorded. Required before any first-person quotation is published.",
  },
  {
    id: "interview-carla",
    label: "Recorded interview with Carla",
    publisher: "The Monkey Shop exhibition",
    kind: "interview",
    note: "Not yet recorded. Carla's preferred credit and role must come from her, not from inference.",
  },
  {
    id: "local-press-monkey",
    label: "Local press coverage of the stolen monkey and its replacement",
    publisher: "Frankston local press",
    kind: "press",
    note: "Reported to exist around 2015. Masthead, date and page not yet confirmed; clipping not yet digitised.",
  },
  {
    id: "exhibition-artwork",
    label: "Artwork produced for the thirtieth-anniversary exhibition",
    publisher: "B$S for The Monkey Shop",
    kind: "social",
    note: "Interpretive material, not archive material. Useful as a record of what the shop looks like and what it says, but it cannot evidence a date, a person or an event.",
  },
  {
    id: "shop-social",
    label: "The shop's own social media posts",
    publisher: "Cignall Frankston",
    kind: "social",
    note: "Where Archie's Quote of the Day and the Ziggy connection appear. Useful, but self-published and undated in places.",
  },
];
