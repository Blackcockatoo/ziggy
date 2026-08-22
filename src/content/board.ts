import type { BoardEntry } from "./types";

/**
 * Ziggy Says — the real shop board as an archive.
 *
 * These are documentary slots only. Exhibition-written sayings belong in
 * `artwork.ts` and are always labelled as interpretive artwork.
 */
export const boardEntries: BoardEntry[] = [
  {
    id: "board-slot-1",
    line: "",
    evidence: {
      status: "placeholder",
      note: "Archive slot — any surviving photograph of the real shop board is useful.",
    },
  },
  {
    id: "board-slot-2",
    line: "",
    evidence: {
      status: "placeholder",
      note: "Archive slot — a dated board photograph would help build the chronology.",
    },
  },
  {
    id: "board-slot-3",
    line: "",
    evidence: {
      status: "placeholder",
      note: "Archive slot — remembered wording can be added only after it is confirmed and sourced.",
    },
  },
];

/**
 * The hinge from documentary board to exhibition oracle.
 * This is creative interpretation, not shop history.
 */
export const oracleBridge = {
  eyebrow: "From the board to the machine",
  line: "In this exhibition, Ziggy's board learns to answer back.",
  body: "Exhibition interpretation: the board's changing voice becomes a cabinet, a lever and a tray. What follows is a creative extension of the Ziggy idea, not a transcription of shop history or something Rob or Carla have said.",
  callToAction: "Ask him something",
};
