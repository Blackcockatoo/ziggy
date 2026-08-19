/**
 * Shared content types for The Monkey Shop exhibition.
 *
 * Everything the exhibition renders is data. Components are dumb; the archive
 * is the source of truth. Two rules govern the whole model:
 *
 * 1. No claim renders without an {@link Evidence} record.
 * 2. Nothing that is unknown is allowed to look known.
 */

/**
 * How well a claim is supported.
 *
 * - `verified`         a primary or reputable published source is linked
 * - `probable`         strongly indicated by evidence, not yet nailed down
 * - `needs-confirmation` a research lead awaiting the archive or an interview
 * - `anecdotal`        told, repeated and believed locally; not documented
 * - `placeholder`      an intentionally empty slot waiting for material
 */
export type EvidenceStatus =
  | "verified"
  | "probable"
  | "needs-confirmation"
  | "anecdotal"
  | "placeholder";

/**
 * The public-facing distinction the exhibition makes: documented fact,
 * local lore, or an empty frame on the wall.
 */
export type EvidenceClass = "documented" | "lore" | "empty";

/** Whether a person has agreed to their name, words or likeness being shown. */
export type PermissionStatus = "granted" | "pending" | "not-required" | "withheld";

export type SourceKind =
  | "press"
  | "official"
  | "broadcast"
  | "shop-record"
  | "family-archive"
  | "interview"
  | "social"
  | "public-record";

export type Source = {
  id: string;
  label: string;
  publisher: string;
  kind: SourceKind;
  /** Omitted for offline material such as a shoebox of receipts. */
  url?: string;
  /** ISO date the source was last retrieved or sighted. */
  retrievedOn?: string;
  note?: string;
};

export type Evidence = {
  status: EvidenceStatus;
  note?: string;
  sourceIds?: string[];
  /** Required before publishing a named person's words, likeness or history. */
  permission?: PermissionStatus;
};

export type MediaKind = "image" | "document" | "audio" | "object";

export type MediaAsset = {
  id: string;
  kind: MediaKind;
  /** Written now, so alt text is never an afterthought when photographs land. */
  alt: string;
  caption: string;
  /** Populated once an approved file exists under `public/archive/`. */
  src?: string;
  credit?: string;
  evidence: Evidence;
};

export type TimelineChapter =
  | "opening"
  | "pre-cignall"
  | "cignall"
  | "lotto"
  | "monkey"
  | "trading"
  | "community"
  | "milestone";

export type TimelineEntry = {
  id: string;
  /** Display string. May be a range or deliberately vague ("1996–?"). */
  year: string;
  /** Numeric key used only for ordering. Approximate is fine; it is not shown. */
  sortKey: number;
  chapter: TimelineChapter;
  eyebrow?: string;
  title: string;
  /** The short panel text. */
  body: string;
  /** Optional longer read, shown in an expandable panel. */
  story?: string;
  evidence: Evidence;
  media?: MediaAsset;
  /** Artefact catalogue ids that illustrate this entry. */
  artefactIds?: string[];
  /** Division One win numbers this entry refers to. */
  winNumbers?: number[];
};

export type LoreItem = {
  id: string;
  label: string;
  value: string;
  body: string;
  evidence: Evidence;
};

/** One Division One win. Nine of the ten are still archaeology. */
export type LedgerEntry = {
  number: number;
  date?: string;
  game?: string;
  draw?: string;
  prize?: string;
  /** Ticket type: QuickPick, marked entry, system, syndicate share. */
  entry?: string;
  story?: string;
  quote?: string;
  quoteAttribution?: string;
  /** Where the winner was from, when reported. */
  winnerLocality?: string;
  media?: MediaAsset;
  evidence: Evidence;
};

export type MonkeyStatus = "incumbent" | "missing" | "retired" | "unconfirmed";

export type MonkeyRecord = {
  id: string;
  name: string;
  /** Spellings and nicknames still in circulation. */
  aliases: string[];
  /** Display era. Left vague where the archive is vague. */
  reign: string;
  status: MonkeyStatus;
  role: string;
  body: string;
  /** Open questions this monkey's record still carries. */
  openQuestions?: string[];
  evidence: Evidence;
  media: MediaAsset;
};

export type MemorySpeakerRole =
  | "rob"
  | "carla"
  | "staff"
  | "customer"
  | "local"
  | "unattributed";

/**
 * A fragment of oral history. `fragment` is a real recorded line; until one
 * exists the record carries only the `prompt` that will produce it.
 */
export type Memory = {
  id: string;
  fragment?: string;
  prompt: string;
  speaker?: string;
  speakerRole: MemorySpeakerRole;
  era?: string;
  /** Counter object this memory hangs off, if any. */
  objectId?: string;
  evidence: Evidence;
};

/** A thing on the counter that a visitor can open. */
export type CounterObject = {
  id: string;
  name: string;
  /** Short label printed on the object in the scene. */
  label: string;
  /** One line of museum-label description. */
  hint: string;
  /** Typographic stand-in until the photographed object exists. */
  glyph: string;
  evidence: Evidence;
};

export type PersonRecord = {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  /** Display string, e.g. "1996–present" or "two summers, late 2000s". */
  years?: string;
  era?: string;
  bio?: string;
  anecdote?: string;
  favouriteMemory?: string;
  whereabouts?: string;
  /** The interview question that will replace the placeholders above. */
  memoryPrompt?: string;
  evidence: Evidence;
  media: MediaAsset;
};

export type CommunityCategory =
  | "raffle"
  | "club"
  | "fundraiser"
  | "school"
  | "street"
  | "trading";

export type CommunityRecord = {
  id: string;
  title: string;
  detail: string;
  category: CommunityCategory;
  year?: string;
  evidence: Evidence;
  media?: MediaAsset;
};

export type ArtefactType =
  | "document"
  | "photograph"
  | "object"
  | "signage"
  | "ephemera"
  | "tool"
  | "textile"
  | "press"
  | "artwork";

/** Whether the object is in hand, wanted from Rob, or known to be gone. */
export type ArtefactHolding = "held" | "wanted" | "lost";

export type ArtefactRecord = {
  id: string;
  /** Museum-style catalogue number, e.g. `MS-1996-001`. Unique. */
  catalogue: string;
  title: string;
  objectType: ArtefactType;
  /** Display date or range. "Undated" is an acceptable and honest answer. */
  dateRange: string;
  description: string;
  provenance?: string;
  holding: ArtefactHolding;
  /** Ids of timeline entries, monkeys or people this object belongs with. */
  relatedIds?: string[];
  tags?: string[];
  evidence: Evidence;
  media: MediaAsset;
};

export type NavigationItem = {
  href: `#${string}`;
  label: string;
};

/** Fixed facts and working titles for the exhibition itself. */
export type ExhibitionIdentity = {
  title: string;
  subtitle: string;
  /** The editorial alternative worth keeping alive. */
  alternativeTitle: string;
  alternativeSubtitle: string;
  thesis: [string, string];
  address: { line: string; suburb: string; state: string; mapUrl: string };
  /**
   * The date used to derive the mornings counter. Deliberately typed with its
   * own evidence so the number can never masquerade as a documented fact.
   */
  assumedFirstMorning: { iso: string; evidence: Evidence };
};

export type ExhibitionContent = {
  identity: ExhibitionIdentity;
  navigation: NavigationItem[];
  timeline: TimelineEntry[];
  lore: LoreItem[];
  ledger: LedgerEntry[];
  monkeys: MonkeyRecord[];
  counterObjects: CounterObject[];
  memories: Memory[];
  principals: PersonRecord[];
  staff: PersonRecord[];
  community: CommunityRecord[];
  artefacts: ArtefactRecord[];
  sources: Source[];
};
