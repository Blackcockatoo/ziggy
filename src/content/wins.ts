import type { LedgerEntry } from "./types";

/**
 * The Luck Ledger: ten Division One wins, one row each.
 *
 * Nine rows are deliberately incomplete. They are not filler and they are not
 * to be guessed at — an empty row in a ledger is a real archival statement.
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
    sourceIds: ["shop-ledger"],
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
    prize: "$3,126,800.49",
    entry: "12-game QuickPick",
    winnerLocality: "Frankston",
    story:
      "The call found the winner mid-workout on an exercise bike. He said the win meant a home of his own and help for his family.",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
    media: {
      id: "win-10-ticket",
      kind: "document",
      alt: "Archive space reserved for shop material from the tenth Division One win",
      caption: "Wanted: the window notice, banner or in-store material from June 2026.",
      evidence: { status: "placeholder" },
    },
  },
];

/**
 * Wins that are sourced but not yet placed in the numbered sequence.
 *
 * Slotting the 2022 million into one of rows 1–9 would be a guess, so it waits
 * here in plain sight instead.
 */
export const unplacedWins: LedgerEntry[] = [
  {
    number: 0,
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
