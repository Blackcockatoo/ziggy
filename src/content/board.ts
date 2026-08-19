import type { BoardEntry } from "./types";

/**
 * Ziggy Says — the board.
 *
 * A whiteboard on an easel, rewritten by hand, read by whoever walks past. It
 * is the oldest and most ordinary version of the shop having a voice, and it is
 * the thing that makes the fortune machine make sense.
 *
 * Rules:
 * - Only record a line that has actually been seen written on a board.
 * - A line seen in artwork is not the same as a line seen on the board. Those
 *   are marked `needs-confirmation` until a dated photograph exists.
 * - Never write a new line and file it as historical. If the exhibition needs
 *   a line of its own, it belongs in Ziggy's fortune library, not here.
 */
export const boardEntries: BoardEntry[] = [
  {
    id: "be-kind",
    line: "Be kind. You never know who needs it.",
    flourish: "A drawn smiley at the end.",
    evidence: {
      status: "needs-confirmation",
      note: "Appears written on the board in the shop's own visual material. Not yet confirmed as a dated board entry, and the date it was up is unknown.",
      sourceIds: ["exhibition-artwork", "interview-rob"],
    },
  },
  {
    id: "small-steps",
    line: "Small steps still count.",
    flourish: "A drawn heart in the corner.",
    evidence: {
      status: "needs-confirmation",
      note: "Appears written on the board in the shop's own visual material. Not yet confirmed as a dated board entry.",
      sourceIds: ["exhibition-artwork", "interview-rob"],
    },
  },
  {
    id: "board-slot-1",
    line: "",
    evidence: {
      status: "placeholder",
      note: "An empty board. Thirty years of these were wiped off at the end of the day. Every photograph anybody kept is worth having.",
      sourceIds: ["shop-ledger", "shop-social"],
    },
  },
  {
    id: "board-slot-2",
    line: "",
    evidence: {
      status: "placeholder",
      note: "Wanted especially: a board with a date visible, or one somebody photographed because of what it said that morning.",
      sourceIds: ["shop-ledger"],
    },
  },
];

/**
 * The bridge from the board to the machine.
 *
 * This is the hinge of the whole exhibition: the voice came first, the machine
 * came later. Keep the idea; the wording can improve.
 */
export const oracleBridge = {
  eyebrow: "From the board to the machine",
  line: "Ziggy was saying something long before anyone built him a way to answer back.",
  body: "Thirty years of it: one line at a time, in marker, at the height of an adult's eyeline, wiped off at close and written again in the morning. Nobody archived it. Nobody thought to. What follows is that same voice, given a cabinet, a lever and a tray — and asked a direct question for the first time.",
  callToAction: "Ask him something",
};
