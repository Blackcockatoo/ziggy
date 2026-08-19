import type { LoreItem, MonkeyRecord } from "./types";

/**
 * The monkey record.
 *
 * Treat this as a contested royal succession, because that is genuinely what
 * the evidence looks like: two names, at least two physical monkeys, one
 * theft, and a spelling nobody agrees on. Keep the ambiguity on the wall.
 */
export const monkeys: MonkeyRecord[] = [
  {
    id: "ziggy",
    name: "Ziggy",
    aliases: ["Ziggie"],
    reign: "Era to confirm — through to the theft",
    status: "missing",
    role: "The original. Doorway incumbent, first of the line.",
    body: "The older monkey in the shop's folklore and the name the exhibition itself borrows. Arrival, spelling, appearance and the precise circumstances of his disappearance are all still open.",
    openQuestions: [
      "Ziggy or Ziggie? Both spellings are in circulation.",
      "When did he first appear outside the shop?",
      "Was he bought, made, inherited or found?",
      "Does any photograph of him survive?",
    ],
    evidence: {
      status: "anecdotal",
      note: "Well established in local memory and in the shop's own posts; not yet documented from a primary source.",
      sourceIds: ["shop-social", "interview-rob"],
    },
    media: {
      id: "ziggy-portrait",
      kind: "image",
      alt: "Archive space reserved for a photograph of the original monkey, Ziggy",
      caption: "Wanted: the clearest surviving photograph of Ziggy.",
      evidence: { status: "placeholder" },
    },
  },
  {
    id: "the-interregnum",
    name: "The gap",
    aliases: ["The replacement"],
    reign: "c. 2015 onward",
    status: "unconfirmed",
    role: "Whatever stood by the door between the theft and Archie.",
    body: "After the theft a replacement monkey was obtained, and the story reached the local press. Whether that replacement is the monkey standing outside the shop today, or an intermediate one since retired, is the single unresolved link in the succession.",
    openQuestions: [
      "Is Archie the direct replacement, or a later one?",
      "Was more than one replacement needed?",
      "Which masthead ran the replacement story, and when?",
    ],
    evidence: {
      status: "needs-confirmation",
      sourceIds: ["local-press-monkey", "interview-rob"],
    },
    media: {
      id: "replacement-photo",
      kind: "image",
      alt: "Archive space reserved for a photograph of the replacement monkey",
      caption: "Wanted: any photograph dated between the theft and today.",
      evidence: { status: "placeholder" },
    },
  },
  {
    id: "archie",
    name: "Archie",
    aliases: [],
    reign: "Current",
    status: "incumbent",
    role: "Keeper of the door. Quote of the Day.",
    body: "Named by Rob in the official account of the agency's tenth Division One win, and the monkey Frankston currently gives directions by.",
    openQuestions: [
      "When did the name Archie come into use?",
      "Who named him?",
    ],
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
    media: {
      id: "archie-portrait",
      kind: "image",
      alt: "Archive space reserved for a current photograph of Archie outside the shop",
      caption: "Commission: a full-length portrait outside 8 Thompson Street.",
      evidence: { status: "placeholder" },
    },
  },
];

/** Museum specimen labels for the folklore room. */
export const lore: LoreItem[] = [
  {
    id: "species",
    label: "Species",
    value: "Shopfront monkey",
    body: "Stands watch over Thompson Street and attracts a mythology considerably larger than the sign above him.",
    evidence: { status: "anecdotal" },
  },
  {
    id: "habitat",
    label: "Habitat",
    value: "8 Thompson Street",
    body: "A verified address and the fixed point around which the whole exhibition turns.",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
  },
  {
    id: "nickname",
    label: "Known alias",
    value: "The Lucky Monkey Shop",
    body: "Rob told The Lott this is what customers call the family-run agency. Not a brand. A nickname, which is better.",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
  },
  {
    id: "behaviour",
    label: "Known behaviour",
    value: "Unsolicited advice",
    body: "The shop has kept a saying board, and the modern posts carry Archie's Quote of the Day. The full chronology of the blackboard still needs photographs.",
    evidence: {
      status: "needs-confirmation",
      sourceIds: ["shop-social", "shop-ledger"],
    },
  },
  {
    id: "predation",
    label: "Known threats",
    value: "Theft",
    body: "At least one monkey has been taken from outside this shop. The suburb took it personally.",
    evidence: {
      status: "needs-confirmation",
      sourceIds: ["local-press-monkey"],
    },
  },
  {
    id: "range",
    label: "Recorded range",
    value: "One doorway",
    body: "No monkey associated with this shop has ever been observed to voluntarily leave it.",
    evidence: {
      status: "anecdotal",
      note: "Exhibition voice. Not a research claim.",
    },
  },
];
