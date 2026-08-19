/**
 * Interpretive artwork.
 *
 * Everything in this file is **artwork**, not evidence. It was made for the
 * exhibition; it did not come out of the shop's archive. That distinction is
 * load-bearing and is enforced two ways:
 *
 * - documentary material lives in `src/content/` with an `Evidence` record and
 *   is served from `/archive/`
 * - interpretive artwork lives here and is served from `/images/ziggy/`
 *
 * A test asserts both halves of that rule. Do not move a file across the line
 * to save a directory.
 *
 * The Ziggy depicted here is the real Monkey Shop waiter statue: wrinkled
 * flesh-toned face, huge ears, wide uneven grin, black hair, cream shirt,
 * black-and-white harlequin vest, gold bow tie, mustard trousers, oversized
 * bare feet, silver serving tray. Keep him that way.
 */

export type ArtworkRole =
  | "oracle"
  | "whiteboard"
  | "identity"
  | "anniversary"
  | "character";

export type Artwork = {
  id: string;
  role: ArtworkRole;
  /** Always under `/images/ziggy/`. Never `/archive/`. */
  src: string;
  /** Intrinsic size. Required, so nothing renders without reserved space. */
  width: number;
  height: number;
  /**
   * Describes what is actually visible. An empty string is a deliberate
   * statement that every usage of this asset is decorative and the image is
   * hidden from assistive technology.
   */
  alt: string;
  /** Editorial description for the artwork credits. Not alt text. */
  description: string;
  /** True for every record here. The type makes the category unforgeable. */
  interpretive: true;
  /** Set when identifiable people appear, so the credit can say so. */
  depictsPeople?: boolean;
  /**
   * Whether this asset is wired into the current build.
   *
   * - `mounted`  a component renders it now; it must stay reachable
   * - `reserved` production-ready and intentionally dormant, kept for a use
   *              that is coming or for a layout that may return
   *
   * Reuse is fine: an asset may be rendered in as many places as it earns.
   * Dormancy is fine too, as long as `note` says why it is being held.
   */
  usage: "mounted" | "reserved";
  note?: string;
};

export const artwork = {
  cabinetFull: {
    id: "cabinet-full",
    role: "oracle",
    src: "/images/ziggy/oracle/cabinet-full.webp",
    width: 1122,
    height: 1402,
    alt: "The Ask Ziggy cabinet: a black and gold fortune-teller machine with a bulb-lined glass front, the Monkey Shop sign above it, and Ziggy inside holding a silver tray.",
    description:
      "The full Ask Ziggy cabinet, lit, photographed in the shop. The lower panel reads I've been watching Frankston since 1996.",
    interpretive: true,
    usage: "mounted",
  },
  oraclePortrait: {
    id: "oracle-portrait",
    role: "oracle",
    src: "/images/ziggy/oracle/oracle-portrait.webp",
    width: 1122,
    height: 1402,
    alt: "Ziggy inside the illuminated cabinet, hands resting either side of a glowing globe, wearing a black-and-white diamond vest and gold bow tie.",
    description: "Closer portrait of Ziggy behind the cabinet glass.",
    interpretive: true,
    usage: "mounted",
  },
  trayTicket: {
    id: "tray-ticket",
    role: "oracle",
    src: "/images/ziggy/oracle/tray-ticket.webp",
    width: 1122,
    height: 1402,
    alt: "Ziggy holding out the silver tray with a printed fortune ticket resting on it.",
    description:
      "The delivery moment: the tray extended, a ticket on it. The cabinet plate beneath reads Fortune · Wisdom · Insight.",
    interpretive: true,
    usage: "mounted",
  },
  cabinetAfterHours: {
    id: "cabinet-after-hours",
    role: "oracle",
    src: "/images/ziggy/oracle/cabinet-after-hours.webp",
    width: 1122,
    height: 1402,
    alt: "The Ask Ziggy cabinet glowing in a darkened, closed shop.",
    description:
      "After hours. The shop is shut and the cabinet is the only thing still lit.",
    interpretive: true,
    usage: "mounted",
  },
  ziggyWithBoard: {
    id: "ziggy-with-board",
    role: "whiteboard",
    src: "/images/ziggy/whiteboard/ziggy-with-board.webp",
    width: 1122,
    height: 1402,
    alt: "The full-size Ziggy statue standing beside a whiteboard on an easel in the shop, one hand open toward the board.",
    description:
      "Ziggy presenting the board on the shop floor, in front of the thirty-year wall mark.",
    interpretive: true,
    usage: "mounted",
  },
  boardBlank: {
    id: "board-blank",
    role: "whiteboard",
    src: "/images/ziggy/whiteboard/board-blank.webp",
    width: 1000,
    height: 1250,
    alt: "",
    description:
      "The blank branded Ziggy Says board. Used as an empty frame behind live text.",
    interpretive: true,
    usage: "mounted",
    note: "Decorative in every current usage: the board's words are always real HTML on top of it.",
  },
  boardFilled: {
    id: "board-filled",
    role: "whiteboard",
    src: "/images/ziggy/whiteboard/board-filled.webp",
    width: 1000,
    height: 1250,
    alt: "An example Ziggy Says board in handwriting: Small steps still count, with a drawn heart.",
    description:
      "Example artwork showing how a filled board looks. The wording was written for the exhibition and is not a transcription of a real board.",
    interpretive: true,
    usage: "mounted",
  },
  badge: {
    id: "ziggy-says-badge",
    role: "identity",
    src: "/images/ziggy/identity/ziggy-says-badge.webp",
    width: 640,
    height: 640,
    alt: "",
    description:
      "The round Ziggy Says mark: Ziggy grinning in a diamond vest and gold bow tie, ringed by Ziggy Says and Since 1996.",
    interpretive: true,
    usage: "mounted",
    note: "Decorative: it is always accompanied by the same words in real text.",
  },
  seal: {
    id: "ziggy-says-seal",
    role: "identity",
    src: "/images/ziggy/identity/ziggy-says-seal.webp",
    width: 224,
    height: 224,
    alt: "",
    description: "Small version of the Ziggy Says mark, used as the seal on a fortune ticket.",
    interpretive: true,
    usage: "mounted",
  },
  anniversaryPoster: {
    id: "thirty-years-poster",
    role: "anniversary",
    src: "/images/ziggy/anniversary/thirty-years-poster.webp",
    width: 1122,
    height: 1402,
    alt: "A commemorative poster: Ziggy at the centre in his diamond vest, surrounded by illustrated portraits of shop staff, above a banner reading 30 Years, 1996 to 2026.",
    description:
      "Thirtieth-anniversary commemorative poster produced for the exhibition.",
    interpretive: true,
    usage: "mounted",
    depictsPeople: true,
    note: "The people in this poster are illustrated, not documented portraits. They must not be captioned as identified staff, and must not be cited as evidence of who worked in the shop.",
  },
  ziggyWithTray: {
    id: "ziggy-with-tray",
    role: "character",
    src: "/images/ziggy/character/ziggy-with-tray.webp",
    width: 900,
    height: 1350,
    alt: "The Ziggy statue full length: wide uneven grin, black hair, cream shirt under a black-and-white diamond vest, gold bow tie, mustard trousers, oversized bare feet, holding out a silver tray.",
    description:
      "Clean full-body cutout of the statue on a transparent background. The reusable character asset.",
    interpretive: true,
    usage: "mounted",
  },
} as const satisfies Record<string, Artwork>;

export const allArtwork: Artwork[] = Object.values(artwork);

/**
 * Example board wording.
 *
 * Concept lines written **for the exhibition** to show what the board looks
 * like when it is full. They are artwork, exactly like the images above, and
 * they are the reason this type exists at all: written in the shop's register,
 * they read like genuine board lines, and filing them anywhere near the archive
 * would manufacture a false historical claim about a real business.
 *
 * The guard rails:
 * - `interpretive: true` is required by the type and cannot be set to `false`.
 * - `BoardExample` is structurally incompatible with `BoardEntry`, so one can
 *   never be assigned into `boardEntries`.
 * - Anything rendered from here must be visibly labelled as an example.
 *
 * A real board line — seen, photographed or confirmed by Rob and Carla — is a
 * `BoardEntry` in `src/content/board.ts`, and never appears here.
 */
export type BoardExample = {
  id: string;
  /** Wording invented for the exhibition. Never a transcription. */
  line: string;
  /** A drawn heart, a smiley — described, not reproduced. */
  flourish?: string;
  interpretive: true;
  /** Why this wording exists, shown wherever it is rendered. */
  provenance: string;
};

export const boardExamples: BoardExample[] = [
  {
    id: "example-be-kind",
    line: "Be kind. You never know who needs it.",
    flourish: "A drawn smiley at the end.",
    interpretive: true,
    provenance:
      "Written for the exhibition to show the board in use. Not a Monkey Shop board transcription.",
  },
  {
    id: "example-small-steps",
    line: "Small steps still count.",
    flourish: "A drawn heart in the corner.",
    interpretive: true,
    provenance:
      "Written for the exhibition to show the board in use. Not a Monkey Shop board transcription.",
  },
];

/**
 * Motion direction for the Ask Ziggy machine.
 *
 * Three specifications, addressed by stable semantic id — never by array or
 * upload order. The live site implements them as CSS and React state, not
 * video: the component publishes `data-machine-state`, so a clip can be mounted
 * per state later without restructuring anything.
 *
 * **All three are disabled.** Three reference clips were supplied, but which
 * clip shows which sequence has not been confirmed, so none of them is bound to
 * a slot. Guessing the mapping would put the wrong footage behind a named
 * state, which is worse than shipping none. The candidates sit unattributed in
 * `unattributedClips` until somebody who has watched them says which is which.
 *
 * To enable one: confirm the clip, move it to `<id>.mp4` in the motion folder,
 * set `clip` to that path and `enabled` to true.
 */
export type MotionStateId = "wake-up" | "the-answer" | "dont-ask-twice";

export type MotionSpec = {
  id: MotionStateId;
  title: string;
  /** Machine states this sequence documents. Validated against the real list. */
  states: string[];
  beats: string[];
  /** The confirmed clip for this slot, or null while unattributed. */
  clip: string | null;
  /** Never true without a confirmed `clip`. */
  enabled: boolean;
  note?: string;
};

export const motionSpecs: Record<MotionStateId, MotionSpec> = {
  "wake-up": {
    id: "wake-up",
    title: "Wake up",
    states: ["idle", "waking"],
    beats: [
      "Cabinet dark.",
      "Bulbs snap on one at a time.",
      "Ziggy lifts his eyes; small head and body shift; glow rises.",
      "Tray slides forward and the ticket becomes visible.",
      "The ASK ZIGGY sign lands.",
    ],
    clip: null,
    enabled: false,
    note: "Sound direction, only if a clip is ever mounted behind a user-initiated control: low electrical hum, individual bulb clicks, a small servo, one bell. Never autoplay audio.",
  },
  "the-answer": {
    id: "the-answer",
    title: "The answer",
    states: ["thinking", "issuing", "revealed"],
    beats: [
      "Empty tray and ticket slot.",
      "The mechanical print action starts.",
      "Ziggy leans forward behind the glass.",
      "The fortune becomes readable.",
      "His eyes snap to the viewer.",
    ],
    clip: null,
    enabled: false,
  },
  "dont-ask-twice": {
    id: "dont-ask-twice",
    title: "Don't ask twice",
    states: ["revealed", "thinking", "issuing"],
    beats: [
      "Slow push toward Ziggy in the glowing cabinet.",
      "The machine shows ASK YOUR QUESTION.",
      "The lever actuates and the lights cut.",
      "Lights return brighter; Ziggy is closer and more awake; tray extended.",
      "The fortune reads YOU ALREADY KNOW.",
    ],
    clip: null,
    enabled: false,
    note: "The repeat-pull beat. Dry, funny, slightly unnerving, affectionate. Never horror.",
  },
};

/** Addressed explicitly by id, so no caller can depend on ordering. */
export const motionStateIds: MotionStateId[] = [
  "wake-up",
  "the-answer",
  "dont-ask-twice",
];

/**
 * The supplied reference footage, deliberately not attributed to a slot.
 *
 * Filenames carry no meaning on purpose: `clip-a` is not a claim about
 * `wake-up`. Watch them, decide, then rename into the semantic filename.
 */
export const unattributedClips: string[] = [
  "/images/ziggy/oracle/motion/unattributed/clip-a.mp4",
  "/images/ziggy/oracle/motion/unattributed/clip-b.mp4",
  "/images/ziggy/oracle/motion/unattributed/clip-c.mp4",
];
