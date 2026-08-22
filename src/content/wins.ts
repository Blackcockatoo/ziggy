import type { LedgerEntry } from "./types";

export type LotteryExclusion = {
  date: string;
  event: string;
  retailer: string;
  reason: string;
  sourceIds: string[];
};

/**
 * The Luck Ledger: ten Division One wins, one row each.
 *
 * Nine rows are deliberately incomplete. Recovered wins sit below the
 * numbered ledger until evidence proves their position in the sequence.
 *
 * To complete a row: replace the `pending()` call with a full record, add the
 * draw number, the date, the prize and a source id, and set the status to
 * `verified`. Do not promote a row to `verified` on the strength of a memory.
 */
const pending = (number: number, note?: string): LedgerEntry => ({
  number,
  evidence: {
    status: "placeholder",
    note:
      note ??
      "Date, draw, prize and customer story await documentary confirmation.",
  },
});

export const ledger: LedgerEntry[] = [
  pending(
    1,
    "The first Division One. Likely to predate the current signage and possibly the current point-of-sale records entirely.",
  ),
  pending(2),
  pending(3),
  pending(4),
  pending(5),
  pending(6),
  pending(7),
  pending(8),
  pending(9),
  {
    number: 10,
    date: "13 June 2026",
    game: "TattsLotto",
    draw: "4685",
    prize: "$3,127,800.49",
    entry: "12-game QuickPick",
    winnerLocality: "Frankston",
    story:
      "The call found the winner mid-workout on an exercise bike. He said the win meant a home of his own and help for his family.",
    evidence: {
      status: "verified",
      note: "The tenth-win sequence is reported by The Lott and the retailer. The dividend is the matching figure in two readable draw archives; an indexed official snippet is $1,000 lower.",
      sourceIds: [
        "lott-2026-tenth-win",
        "lotterywest-4685",
        "ozlotteries-4685",
        "cignall-2026-win",
      ],
    },
    media: {
      id: "win-10-ticket",
      kind: "document",
      alt: "Archive space reserved for shop material from the tenth Division One win",
      caption: "Useful: any window notice, banner or in-store material, if one was made.",
      evidence: { status: "placeholder" },
    },
  },
];

/**
 * Wins that are sourced but not yet placed in the numbered sequence.
 *
 * Slotting any of these into rows 1–9 would be a guess, so they wait here in
 * plain sight with their individual evidence grades.
 */
export const unplacedWins: LedgerEntry[] = [
  {
    number: 0,
    date: "2 April 2016",
    game: "TattsLotto",
    draw: "3621",
    prize: "$1,380,313.01",
    entry: "12-game marked entry",
    winnerLocality: "Melbourne",
    story:
      "A man in his 60s, playing long-held numbers, planned house repairs and driving holidays. The entry was reported as bought at Smokey's Frankston House Lotto, 8 Thompson Street.",
    evidence: {
      status: "verified",
      note: "Retailer-side Tatts release republication plus independently corroborated draw facts. Sequence position not stated.",
      sourceIds: ["cignall-2016-win", "lotterywest-3621"],
    },
  },
  {
    number: -1,
    date: "11 May 2019",
    game: "TattsLotto",
    draw: "3945",
    prize: "$3,333,333.34",
    winnerLocality: "St Albans",
    story:
      "Four days after the draw, a St Albans man claimed one of six Division One prizes. Search-indexed release wording attributes the ticket to Smokey's Frankston House Lotto, 8 Thompson Street.",
    evidence: {
      status: "strongly-supported",
      note: "Draw facts are documented; the retailer sentence remains search-indexed but obscured on the readable repost. Sequence position not stated.",
      sourceIds: ["cignall-2019-win", "lottery-3945-results"],
    },
  },
  {
    number: -2,
    date: "8 January 2022",
    game: "TattsLotto",
    draw: "4223",
    prize: "$1,000,000",
    winnerLocality: "Rosebud",
    story:
      "A Rosebud man found he had been carrying a Division One ticket bought at 8 Thompson Street, and checked it on a coffee run.",
    evidence: {
      status: "verified",
      note: "The win is sourced. Its position within wins 1–9 has not been assumed.",
      sourceIds: ["lott-2022-million"],
    },
  },
];

/**
 * Frankston winners whose tickets were explicitly sold elsewhere.
 *
 * These exclusions prevent residence from being mistaken for retailer
 * attribution.
 */
export const lotteryExclusions: LotteryExclusion[] = [
  {
    date: "17 April 2021",
    event: "TattsLotto draw 4147 · $1,145,653.60",
    retailer: "Towerhill Lotto, 145 Frankston–Flinders Road",
    reason: "Frankston winners; different retailer.",
    sourceIds: ["lott-2021-towerhill"],
  },
  {
    date: "5 April 2025",
    event: "TattsLotto · $1,260,543.17",
    retailer: "Beach Street Newsagency, 237 Beach Street",
    reason: "Frankston winner; different retailer.",
    sourceIds: ["lott-2025-beach-street"],
  },
  {
    date: "19 July 2025",
    event: "TattsLotto draw 4591 · $913,127.93",
    retailer: "TSG Bayside",
    reason: "Frankston winner; different retailer.",
    sourceIds: ["lott-2025-tsg-bayside"],
  },
];
