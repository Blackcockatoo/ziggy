import type { BoardEntry } from "./types";

/**
 * Ziggy Says — the board, as an archive.
 *
 * A whiteboard on an easel, rewritten by hand, read by whoever walks past. It
 * is the oldest and most ordinary version of the shop having a voice, and it is
 * the thing that makes the fortune machine make sense.
 *
 * **Every record in this file is a documentary transcription slot, and every
 * one of them is currently empty.** No line the exhibition has seen is an
 * authenticated Monkey Shop board transcription: thirty years of boards were
 * wiped at close of trade and nobody photographed them.
 *
 * Rules:
 * - Only fill `line` with wording somebody has seen on the real board, and
 *   only with a documentary source id attached.
 * - Wording written for the exhibition is not a board entry. It belongs in
 *   `boardExamples` in `src/content/artwork.ts`, where it is typed
 *   `interpretive: true` and cannot be mistaken for this.
 * - `needs-confirmation` means "a real line we have not dated yet". It does not
 *   mean "a line we made up and might one day match". Never file concept
 *   wording under it.
 */
export const boardEntries: BoardEntry[] = [
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
  {
    id: "board-slot-3",
    line: "",
    evidence: {
      status: "placeholder",
      note: "Rob and Carla will remember lines nobody photographed. A remembered line is still a real line, and can be recorded here once they confirm it.",
      sourceIds: ["interview-rob", "interview-carla"],
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
