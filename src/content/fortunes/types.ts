/**
 * Ziggy's fortune model.
 *
 * A fortune is two handwritten parts: an `answer` (blunt, short, the hit) and
 * a `kicker` (one dry line underneath). Nothing here is generated at runtime
 * by a language model — the machine only selects and, within strict rules,
 * recombines lines a human wrote.
 */

export type FortuneCategory =
  | "money"
  | "luck"
  | "love"
  | "work"
  | "family"
  | "frankston"
  | "regret"
  | "future"
  | "silly"
  | "mystery"
  | "encouragement";

/** The register a line is written in. Used to keep remixes tonally sane. */
export type FortuneMood = "blunt" | "dry" | "cheeky" | "sincere" | "cryptic";

/**
 * `pairing` controls the compositional rules:
 * - `open`  the kicker stands on its own and may be paired with another answer
 * - `fixed` the kicker only makes sense with its own answer; never recombine
 */
export type FortunePairing = "open" | "fixed";

export type Fortune = {
  id: string;
  category: FortuneCategory;
  mood: FortuneMood;
  /** Short. Ideally under five words. */
  answer: string;
  /** One line. Never two sentences of explanation. */
  kicker: string;
  /** Defaults to "open" when omitted. */
  pairing?: FortunePairing;
};

/** A fortune as issued by the machine: selected, stamped and serialised. */
export type FortuneTicket = {
  question: string;
  category: FortuneCategory;
  answer: string;
  kicker: string;
  mood: FortuneMood;
  /** Printed on the card, e.g. `ZG-WRK-4F2A9-02`. */
  serial: string;
  /** True when the kicker came from a different fortune in the same category. */
  remixed: boolean;
  /** Ids of the source fortunes, answer first. */
  sourceIds: string[];
};

export type CategoryProfile = {
  id: FortuneCategory;
  /** Shown on the machine's dial and on the printed card. */
  label: string;
  /** Three-letter code used in serial numbers. Must be unique. */
  code: string;
  /** Words that route a question to this category. Lowercase. */
  keywords: string[];
};
