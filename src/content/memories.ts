import type { CounterObject, Memory } from "./types";

/**
 * The Counter.
 *
 * Objects sit on the counter; memories hang off the objects. Every record here
 * is currently a `prompt` — the question that will produce a real fragment —
 * rather than an invented quotation. When a recording exists, add `fragment`,
 * `speaker` and a `permission` of `granted`. The component prefers `fragment`
 * over `prompt` automatically, so nothing else has to change.
 */
export const counterObjects: CounterObject[] = [
  {
    id: "pencil",
    name: "Lotto pencil",
    label: "Pencil",
    hint: "Short, blunt, chained to nothing. Replaced approximately ten thousand times.",
    glyph: "✎",
    evidence: { status: "placeholder" },
  },
  {
    id: "blackboard",
    name: "The saying board",
    label: "Board",
    hint: "The shop's running commentary. Later became Archie's Quote of the Day.",
    glyph: "▤",
    evidence: {
      status: "needs-confirmation",
      sourceIds: ["shop-facebook-profile"],
    },
  },
  {
    id: "newspaper",
    name: "The morning papers",
    label: "Paper",
    hint: "Bundled, cut, counted and stacked before most of Frankston was awake.",
    glyph: "☰",
    evidence: { status: "verified", sourceIds: ["shop-facebook-profile"] },
  },
  {
    id: "key-blank",
    name: "Key blank",
    label: "Key",
    hint: "Cut while you wait. Half of them for doors that no longer exist.",
    glyph: "⚿",
    evidence: { status: "verified", sourceIds: ["shop-facebook-profile"] },
  },
  {
    id: "till",
    name: "The till",
    label: "Till",
    hint: "The one object that heard every conversation in this shop.",
    glyph: "▣",
    evidence: { status: "placeholder" },
  },
  {
    id: "receipt",
    name: "A faded receipt",
    label: "Receipt",
    hint: "Thermal paper. Illegible within a decade. An accidental time limit on evidence.",
    glyph: "▭",
    evidence: { status: "placeholder" },
  },
  {
    id: "lighter",
    name: "Counter lighter",
    label: "Lighter",
    hint: "Not for sale. Communally owned. Frequently missing.",
    glyph: "✦",
    evidence: { status: "placeholder" },
  },
  {
    id: "ticket",
    name: "A Division One ticket",
    label: "Ticket",
    hint: "Ten of these left this counter and changed a life somewhere else.",
    glyph: "◫",
    evidence: { status: "verified", sourceIds: ["lott-2026-tenth-win"] },
  },
];

export const memories: Memory[] = [
  {
    id: "saturday-regular",
    prompt:
      "Who came in every week for years, and what did everyone behind the counter know before they reached it?",
    speakerRole: "unattributed",
    objectId: "pencil",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "same-numbers",
    prompt:
      "Who has played the same numbers for decades, and what happens on the week they forget?",
    speakerRole: "customer",
    objectId: "pencil",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "children-grown",
    prompt:
      "Which customers did Rob and Carla first meet as children and later serve as adults, or as parents?",
    speakerRole: "rob",
    objectId: "till",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "still-asks",
    prompt:
      "What discontinued thing does someone still ask for, years after it left the shelf?",
    speakerRole: "staff",
    objectId: "receipt",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "best-line",
    prompt:
      "What is the most repeated joke, saying or piece of advice ever delivered across this counter?",
    speakerRole: "unattributed",
    objectId: "blackboard",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "board-line",
    prompt:
      "Which line on the board got the strongest reaction, and did it have to come down?",
    speakerRole: "rob",
    objectId: "blackboard",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "paper-round",
    prompt:
      "What time did the papers actually arrive, and who was waiting outside before they did?",
    speakerRole: "rob",
    objectId: "newspaper",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "last-paper",
    prompt:
      "When did the paper delivery stop, and did anybody say anything about it at the time?",
    speakerRole: "carla",
    objectId: "newspaper",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "locked-out",
    prompt:
      "Who came in locked out of their own house, and what was the strangest thing ever cut on that machine?",
    speakerRole: "staff",
    objectId: "key-blank",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "the-call",
    prompt:
      "What does the shop find out when one of its tickets wins, and how does the news travel down Thompson Street?",
    speakerRole: "rob",
    objectId: "ticket",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "winner-returned",
    prompt:
      "Did any Division One winner ever come back in, and what did they say?",
    speakerRole: "unattributed",
    objectId: "ticket",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "borrowed-lighter",
    prompt:
      "Who never once had their own lighter, over how many years?",
    speakerRole: "customer",
    objectId: "lighter",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "quiet-morning",
    prompt:
      "Which morning was the quietest in thirty years, and what was going on outside?",
    speakerRole: "carla",
    objectId: "till",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "regulars-gone",
    prompt:
      "Which regular stopped coming in, and how long before anyone said it out loud?",
    speakerRole: "unattributed",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "first-job",
    prompt:
      "Who had their first ever job at this counter, and what do they do now?",
    speakerRole: "staff",
    evidence: { status: "placeholder", permission: "pending" },
  },
  {
    id: "street-changed",
    prompt:
      "What used to be next door, and what is there now?",
    speakerRole: "local",
    evidence: { status: "placeholder", permission: "pending" },
  },
];
