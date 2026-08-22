import type { TimelineEntry } from "./types";

/**
 * The 1996 → 2026 narrative.
 *
 * Dates describe the kind of record actually recovered: anniversary framing,
 * registry events, archived-web captures, publications and lottery draws.
 * None is silently promoted into a shop-opening or shopfront-sign date.
 */
const entries: TimelineEntry[] = [
  {
    id: "opening",
    year: "Est. 1996",
    sortKey: 1996,
    chapter: "opening",
    eyebrow: "The supported frame",
    title: "Approximately thirty years in Frankston",
    body: "The shop can responsibly keep its Est. 1996 / thirty-year frame. Public self-description in 2016 said Rob and Carla had run the Frankston tobacconist for almost twenty years; the 2026 anniversary material says thirty.",
    story:
      "That is meaningful support for the 1996 frame, but not an opening-day certificate. The exact first physical trading day, the first name above the door and the first morning's details remain unknown. No day or month has been invented for this exhibition.",
    evidence: {
      status: "strongly-supported",
      note: "Supported by dated self-description and the 2026 anniversary account. Exact opening day remains unresolved.",
      sourceIds: [
        "tobacco-blends-about-2016",
        "shop-facebook-profile",
        "lott-2026-tenth-win",
      ],
    },
    media: {
      id: "first-shopfront",
      kind: "image",
      alt: "Archive space reserved for the earliest known photograph or paper from the shop",
      caption: "Essential: the earliest shop image or paper. A quick phone photograph is enough.",
      evidence: { status: "placeholder" },
    },
    artefactIds: ["MS-1996-001", "MS-1996-002"],
  },
  {
    id: "before-cignall",
    year: "2000–2011",
    sortKey: 2000,
    chapter: "pre-cignall",
    eyebrow: "Registry chronology — not shopfront chronology",
    title: "The names in the public record",
    body: "Greycliffs' ABN became active on 24 March 2000 and GST registration began 1 July 2000. ABR records Frankston House Lotto (24 March 2000–27 February 2004), R & C Discount Smokes (from 18 September 2001), Cignall Frankston (registered from 14 June 2006), Tobaccoblends (from 10 August 2011), Mr. Tobacconist (recorded trading name from 8 July 2000) and Cignall Frankston again as a recorded trading name from 10 August 2011.",
    story:
      "These are company, tax, business-name and recorded trading-name events. They do not establish when each name appeared on the fascia, when a physical service began, or when 8 Thompson Street first opened. Photographs and signage can eventually supply that different chronology.",
    evidence: {
      status: "verified",
      note: "ABR registry chronology. Dates must not be read as opening dates or a proven sequence of signs above the door.",
      sourceIds: ["abr-greycliffs-history"],
    },
    media: {
      id: "signage-chronology",
      kind: "image",
      alt: "Archive space reserved for dated photographs showing changing shopfront signs",
      caption: "Useful: one image showing a major shopfront change. Approximate dates are enough.",
      evidence: { status: "placeholder" },
    },
    artefactIds: ["MS-XXXX-004", "MS-XXXX-005"],
  },
  {
    id: "everything-counter",
    year: "Documented by 2016 / 2026",
    sortKey: 2011,
    chapter: "trading",
    eyebrow: "Services and specialist catalogue",
    title: "Papers, tobacco, Lotto, dry cleaning, keys — and an online specialist range",
    body: "The shop's public profile documents TattsLotto, newspapers, tobacco, dry cleaning and house-key cutting. Archived Tobacco Blends pages document an online/public catalogue covering tobacco, pipes, cigars, accessories, imported cigarettes and related specialist products by 2016.",
    story:
      "The evidence establishes service or catalogue presence by the date of each source. It does not establish individual start and end dates, uninterrupted availability, or that every online category was continuously stocked on the physical shelves at 8 Thompson Street.",
    evidence: {
      status: "verified",
      note: "Documented public service description and dated online catalogue; commencement and end dates remain open.",
      sourceIds: [
        "shop-facebook-profile",
        "tobacco-blends-home-2016",
        "tobacco-blends-contact-2016",
      ],
    },
    artefactIds: ["MS-XXXX-006", "MS-XXXX-007"],
  },
  {
    id: "monkey-heist",
    year: "2 January 2016",
    sortKey: 2016.01,
    chapter: "monkey",
    eyebrow: "Published lead",
    title: "Ziggie disappears; a replacement is reported",
    body: "A dated Leader/Herald Sun lead says Ziggie's disappearance prompted a search and reward, that the figure was not recovered, and that a new monkey statue was installed.",
    story:
      "That moves the episode beyond vague folklore, but the full article has not been retrieved. The exhibition does not add a culprit, a precise disappearance date, a theft method or a chain of custody. Even the relationship between the published Ziggie and the separately documented Archie remains open.",
    evidence: {
      status: "strongly-supported",
      note: "Headline and indexed article text retrieved; full article text still required for detailed circumstances.",
      sourceIds: ["herald-ziggie-2016"],
    },
    media: {
      id: "heist-clipping",
      kind: "document",
      alt: "Archive space reserved for the full January 2016 Ziggie article or an owner-held clipping",
      caption: "Essential: monkey image or material. No scanning or exact caption required.",
      evidence: { status: "placeholder" },
    },
    artefactIds: ["MS-2016-009", "MS-XXXX-010"],
  },
  {
    id: "replacement",
    year: "7 April 2016",
    sortKey: 2016.03,
    chapter: "monkey",
    eyebrow: "A different documented name",
    title: "Archie appears in the dated public record",
    body: "A Cignall Frankston post reproducing a Tatts media release quotes Rob calling the store mascot “a monkey figurine named Archie”. It does not explain whether Archie and Ziggie are the same figure, sequential figures or different nicknames.",
    evidence: {
      status: "verified",
      note: "Archie is documented by name. The Ziggie / Archie / replacement relationship is not.",
      sourceIds: ["cignall-2016-win"],
    },
  },
  {
    id: "million-2016",
    year: "2 April 2016",
    sortKey: 2016.02,
    chapter: "lotto",
    eyebrow: "A long-held marked entry",
    title: "$1,380,313.01 for a Melbourne man",
    body: "A Melbourne man in his 60s won Division One with a 12-game marked entry bought from Smokey's Frankston House Lotto, 8 Thompson Street. He planned house repairs and driving holidays.",
    evidence: {
      status: "verified",
      note: "Retailer-side Tatts release republication, with draw number and dividend independently corroborated.",
      sourceIds: ["cignall-2016-win", "lotterywest-3621"],
    },
  },
  {
    id: "butt-out-2018",
    year: "1 March 2018",
    sortKey: 2018,
    chapter: "community",
    eyebrow: "One documented local collaboration",
    title: "Butt Out Day meets the coffee run",
    body: "Raff and Bree from Great Flavours café joined the shop's Butt Out Day, with cigarette-butt drawings appearing on the coffee cups.",
    story:
      "It is a small, properly sourced example of community-facing activity. It is not evidence of a broad charity program, long-term environmental campaign, sporting sponsorship, school partnership or major philanthropy.",
    evidence: {
      status: "verified",
      sourceIds: ["cignall-butt-out-2018"],
    },
  },
  {
    id: "million-2019",
    year: "11 May 2019",
    sortKey: 2019,
    chapter: "lotto",
    eyebrow: "Sequence unresolved",
    title: "$3.3 million claimed four days later",
    body: "A St Albans man held one of six Division One entries in TattsLotto draw 3945. Search-indexed release wording attributes the ticket to Smokey's Frankston House Lotto, 8 Thompson Street.",
    evidence: {
      status: "strongly-supported",
      note: "Draw facts are corroborated; the retailer sentence is search-indexed but obscured on the readable repost.",
      sourceIds: ["cignall-2019-win", "lottery-3945-results"],
    },
  },
  {
    id: "million-2022",
    year: "8 January 2022",
    sortKey: 2022,
    chapter: "lotto",
    eyebrow: "A ticket in a wallet",
    title: "$1 million discovered on a coffee run",
    body: "A Rosebud man discovered that a ticket bought at 8 Thompson Street had won Division One in TattsLotto draw 4223.",
    story:
      "He had been carrying the winning ticket without knowing it. The official record establishes the win and retailer, but not where it belongs in the shop's sequence of ten.",
    evidence: { status: "verified", sourceIds: ["lott-2022-million"] },
  },
  {
    id: "thirty-years",
    year: "13 June 2026",
    sortKey: 2026,
    chapter: "milestone",
    eyebrow: "Thirty years",
    title: "The tenth win arrives in anniversary month",
    body: "The agency marked thirty years as its tenth Division One sale landed in TattsLotto draw 4685. Two readable draw archives record the Division One dividend as $3,127,800.49.",
    story:
      "The official winner story says the call found the winner mid-workout and identifies Smokey's Frankston House Lotto at 8 Thompson Street. A search-indexed official figure is $1,000 lower; the exhibition uses the matching Lotterywest and Oz Lotteries dividend and records the conflict rather than hiding it.",
    evidence: {
      status: "verified",
      note: "Tenth-win and anniversary framing from The Lott; prize from two matching readable draw archives.",
      sourceIds: [
        "lott-2026-tenth-win",
        "lotterywest-4685",
        "ozlotteries-4685",
        "cignall-2026-win",
      ],
    },
    winNumbers: [10],
  },
];

export const timeline: TimelineEntry[] = [...entries].sort(
  (a, b) => a.sortKey - b.sortKey,
);
