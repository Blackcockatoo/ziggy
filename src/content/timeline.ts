import type { TimelineEntry } from "./types";

/**
 * The 1996 → 2026 narrative.
 *
 * Entries are sorted by `sortKey` at export time, so new material can be
 * appended to the bottom of this array in whatever order it arrives.
 *
 * Rules:
 * - Never invent a date. A vague `year` string is better than a wrong one.
 * - `body` is the panel. `story` is the longer read behind the panel.
 * - A `verified` entry must carry at least one source id.
 */
const entries: TimelineEntry[] = [
  {
    id: "opening",
    year: "1996",
    sortKey: 1996,
    chapter: "opening",
    eyebrow: "The first morning",
    title: "The doors open in Frankston",
    body: "A family agency begins trading on Thompson Street. The exact opening date, the original trading name and the first photograph all belong in the archive before this panel is finished.",
    story:
      "Thirty years is the figure everyone uses, and the 2026 anniversary is publicly attested. What nobody has written down is the ordinary part: which morning it was, who turned the key, what the sign said, and what the first thing sold across that counter actually was. Those are the details this panel is holding open.",
    evidence: {
      status: "probable",
      note: "Thirty years of trading is publicly reported in 2026, which puts the start around 1996. The precise first trading day still needs Rob and Carla's records.",
      sourceIds: ["lott-2026-tenth-win", "shop-ledger"],
    },
    media: {
      id: "first-shopfront",
      kind: "image",
      alt: "Archive space reserved for the earliest known photograph of the shopfront",
      caption: "Wanted: the earliest shopfront, counter or first-day photograph.",
      evidence: { status: "placeholder" },
    },
    artefactIds: ["MS-1996-001", "MS-1996-002"],
  },
  {
    id: "before-cignall",
    year: "1996–?",
    sortKey: 1997,
    chapter: "pre-cignall",
    eyebrow: "Before the current sign",
    title: "The names above the same counter",
    body: "Smokey's Frankston House Lotto, Cignall and The Monkey Shop are all part of the working title history. The order and the dates are deliberately left open until invoices, signage or photographs settle it.",
    story:
      "A shop can outlive several of its own names. The counter, the position of the door and the people behind it stay put while the signage changes above them. Reconstructing that sequence needs paperwork rather than memory: a lease, a letterhead, a supplier invoice, a photograph with a legible sign in it.",
    evidence: {
      status: "needs-confirmation",
      note: "Smokey's Frankston House Lotto is a strong lead for the earlier identity. Sequence and dates unconfirmed.",
      sourceIds: ["shop-ledger"],
    },
    artefactIds: ["MS-XXXX-004", "MS-XXXX-005"],
  },
  {
    id: "everything-counter",
    year: "1990s–2000s",
    sortKey: 2000,
    chapter: "trading",
    eyebrow: "What you could get here",
    title: "Papers, smokes, Lotto, dry cleaning, keys",
    body: "The counter carried a working suburb's errands: the morning paper, tobacco, a Lotto entry, dry cleaning left in and picked up, and a key cut while you waited.",
    story:
      "Suburban shops of this kind were built out of adjacencies rather than a category. Each service arrives because a customer asked twice. Building a dated inventory of what was sold, and when each line stopped, is one of the more revealing pieces of research still outstanding.",
    evidence: {
      status: "needs-confirmation",
      note: "The service list is a strong lead and locally repeated. Individual start and end dates need receipts, signage or Rob's confirmation.",
      sourceIds: ["shop-ledger", "interview-rob"],
    },
    artefactIds: ["MS-XXXX-006", "MS-XXXX-007"],
  },
  {
    id: "monkey-arrives",
    year: "Date unknown",
    sortKey: 2008,
    chapter: "monkey",
    eyebrow: "An accidental landmark",
    title: "A monkey takes up a position by the door",
    body: "At some point a monkey starts standing outside the shop, and Frankston starts giving directions by it. When he arrived and where he came from are open questions.",
    evidence: {
      status: "anecdotal",
      note: "Widely known locally and repeated by customers. No documented arrival date.",
      sourceIds: ["shop-social"],
    },
    artefactIds: ["MS-XXXX-008"],
  },
  {
    id: "monkey-heist",
    year: "c. 2015",
    sortKey: 2015,
    chapter: "monkey",
    eyebrow: "Local folklore",
    title: "The great monkey heist",
    body: "The original monkey disappears. The theft, the reaction and the replacement are reported to have reached the local press. The clipping, the reward notice and Rob's own account are still needed before this panel is published as fact.",
    story:
      "This is the story most people in Frankston will already half-know, which makes it exactly the one to be careful with. Half-known stories drift. Before the exhibition prints a date, a method or a culprit, it wants the newspaper page, the police reference if one exists, and Rob describing the morning he noticed.",
    evidence: {
      status: "needs-confirmation",
      note: "Approximately 2015 is the working figure. Masthead, date and details unconfirmed.",
      sourceIds: ["local-press-monkey", "interview-rob"],
    },
    media: {
      id: "heist-clipping",
      kind: "document",
      alt: "Archive space reserved for a newspaper clipping about the missing monkey",
      caption: "Wanted: the clipping, the reward poster, or a photograph of the original monkey.",
      evidence: { status: "placeholder" },
    },
    artefactIds: ["MS-2015-009", "MS-2015-010"],
  },
  {
    id: "replacement",
    year: "After the theft",
    sortKey: 2016,
    chapter: "monkey",
    eyebrow: "The succession",
    title: "A replacement takes the post",
    body: "A second monkey arrives. Whether the current Archie is that replacement, or a later one again, is the central unresolved question of the monkey record.",
    evidence: {
      status: "needs-confirmation",
      note: "The shop's own posts have linked Archie and Ziggy. The exact chain of custody has not been established.",
      sourceIds: ["shop-social", "interview-rob"],
    },
  },
  {
    id: "million-2022",
    year: "2022",
    sortKey: 2022,
    chapter: "lotto",
    eyebrow: "A ticket in a wallet",
    title: "$1 million discovered on a coffee run",
    body: "A Rosebud man discovered that a ticket bought at 8 Thompson Street had won Division One in TattsLotto draw 4223.",
    story:
      "He had been carrying the winning ticket without knowing it. The check happened on an ordinary errand, which is how most of these stories actually go: not a moment of drama, but a routine scan at a counter someone visits anyway.",
    evidence: { status: "verified", sourceIds: ["lott-2022-million"] },
    winNumbers: [],
  },
  {
    id: "covid",
    year: "2020–2021",
    sortKey: 2020,
    chapter: "trading",
    eyebrow: "Essential, apparently",
    title: "The shop stays open",
    body: "Melbourne's lockdowns rearranged what a local counter was for. How this shop traded through them — hours, screens, deliveries, who kept coming in — needs Rob and Carla's account rather than a general history.",
    evidence: {
      status: "needs-confirmation",
      note: "That the shop traded through the period is expected; the specifics are not documented here.",
      sourceIds: ["interview-rob", "interview-carla"],
    },
  },
  {
    id: "thirty-years",
    year: "2026",
    sortKey: 2026,
    chapter: "milestone",
    eyebrow: "Thirty years",
    title: "The tenth win arrives in anniversary month",
    body: "The agency marked thirty years as its tenth Division One entry delivered $3,126,800.49. The winner was on an exercise bike when the call came.",
    story:
      "Ten Division One wins from one small agency is the kind of statistic that builds a reputation faster than any sign. It is also the reason customers call it the Lucky Monkey Shop rather than by the name above the door.",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
    winNumbers: [10],
  },
];

export const timeline: TimelineEntry[] = [...entries].sort(
  (a, b) => a.sortKey - b.sortKey,
);
