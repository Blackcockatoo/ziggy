import type { BoardEntry } from "./types";

/**
 * Ziggy Says — the board, as an archive.
 *
 * A whiteboard on an easel, rewritten by hand, read by whoever walks past. It
 * is the oldest and most ordinary version of the shop having a voice, and it is
 * the thing that makes the fortune machine make sense.
 *
 * **Every record in this file is a documentary transcription slot, and every
 * one of them is currently empty.** No authenticated Monkey Shop board
 * transcription has yet been added to the exhibition. Any surviving
 * photographs, remembered lines and board history still await confirmation.
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
      note: "Archive slot — source pending. Any surviving photograph of the board is worth having.",
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
      note: "Rob or Carla may remember lines the exhibition has not sourced. A remembered line can be recorded here once they confirm it.",
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
  line: "In this exhibition, Ziggy's board learns to answer back.",
  body: "Exhibition interpretation: the board's changing voice becomes a cabinet, a lever and a tray. What follows is a creative extension of the Ziggy idea, not a transcription of shop history or something Rob or Carla have said.",
  callToAction: "Ask him something",
};
