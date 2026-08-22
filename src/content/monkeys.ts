import type { LoreItem, MonkeyRecord } from "./types";

/**
 * The historical monkey record.
 *
 * IMPORTANT: exhibition-Ziggy is not a member of this historical succession.
 * Ziggy is the fortune-teller/narrator invented for the exhibition. The
 * source record currently supplies the names Ziggie and Archie plus a
 * replacement story, but not a reliable genealogy.
 *
 * The first record retains the legacy internal id `ziggy` only because other
 * catalogue records already point to it. That implementation slug must never
 * be rendered or interpreted as evidence that Ziggy was a historical alias.
 */
export const monkeys: MonkeyRecord[] = [
  {
    id: "ziggy",
    name: "Ziggie",
    aliases: [],
    reign: "Published by 2 January 2016",
    status: "missing",
    role: "The name in the published disappearance and replacement lead.",
    body: "Indexed Leader/Herald Sun wording says Ziggie disappeared, a search and reward followed, the figure was not recovered, and a new monkey statue took the post. It does not prove that Ziggie was the first monkey, or explain the later Archie name.",
    openQuestions: [
      "Is Ziggie the same figure later called Archie, an earlier figure, or a different nickname?",
      "How many physical monkey figures have stood outside the shop?",
      "What does the full January 2016 article add or correct?",
    ],
    evidence: {
      status: "strongly-supported",
      note: "Dated headline and search-indexed article wording retrieved; full article text remains unavailable.",
      sourceIds: ["herald-ziggie-2016"],
    },
    media: {
      id: "ziggie-material",
      kind: "image",
      alt: "Archive space reserved for an image or clipping that identifies the monkey called Ziggie",
      caption: "Essential: one monkey image, clipping or object clue. A phone photograph is enough.",
      evidence: { status: "placeholder" },
    },
  },
  {
    id: "the-interregnum",
    name: "Relationship unresolved",
    aliases: ["Same figure?", "Sequential figures?", "Different nicknames?"],
    reign: "Between the published names",
    status: "unconfirmed",
    role: "The honest gap between Ziggie, the reported replacement and Archie.",
    body: "Public evidence supports a disappearance and replacement, and separately documents Archie by name. It does not yet join those records into a family tree. The exhibition leaves that link visibly open.",
    openQuestions: [
      "Was the reported replacement Archie?",
      "Did another figure stand between Ziggie and Archie?",
      "Which names did Rob, Carla, staff and customers actually use?",
    ],
    evidence: {
      status: "needs-confirmation",
      note: "Only Rob, Carla or dated physical/photo material can resolve this relationship.",
      sourceIds: ["herald-ziggie-2016", "cignall-2016-win", "shop-facebook-profile"],
    },
    media: {
      id: "replacement-photo",
      kind: "image",
      alt: "Archive space reserved for dated photographs that could resolve the monkey succession",
      caption: "Essential: any dated monkey photograph or material. Approximate dates are useful.",
      evidence: { status: "placeholder" },
    },
  },
  {
    id: "archie",
    name: "Archie",
    aliases: [],
    reign: "Documented by April 2016 and in the current profile",
    status: "incumbent",
    role: "The publicly named shopfront monkey.",
    body: "Rob called the store mascot Archie in the April 2016 retailer post, and the shop's current profile tells visitors to look for Archie outside. Neither source settles his relationship to Ziggie.",
    openQuestions: ["How does Archie relate to Ziggie and the reported replacement?"],
    evidence: {
      status: "verified",
      sourceIds: ["cignall-2016-win", "shop-facebook-profile"],
    },
    media: {
      id: "archie-portrait",
      kind: "image",
      alt: "Archive space reserved for a current photograph of Archie outside the shop",
      caption: "Useful: a current full-length photograph outside 8 Thompson Street.",
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
    evidence: {
      status: "verified",
      sourceIds: ["tobacco-blends-contact-2016", "lott-2026-tenth-win"],
    },
  },
  {
    id: "nickname",
    label: "Known alias",
    value: "The Lucky Monkey Shop",
    body: "The 2026 winner story reports this as the name customers use for the family-run agency. Not a formal business name. Better than one.",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
  },
  {
    id: "behaviour",
    label: "Known behaviour",
    value: "Unsolicited advice",
    body: "The shop's social presence carries monkey-and-saying-board material. The full chronology of the board still belongs to the photo archive.",
    evidence: {
      status: "needs-confirmation",
      note: "Public traces exist, but a dated board archive has not been assembled.",
      sourceIds: ["shop-facebook-profile"],
    },
  },
  {
    id: "predation",
    label: "Known threats",
    value: "Disappearance",
    body: "The published lead says one monkey disappeared, prompted a search and reward, was not recovered and was replaced.",
    evidence: {
      status: "strongly-supported",
      sourceIds: ["herald-ziggie-2016"],
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
