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
    note: "Decorative in every current usage: the board's words are always real HTML on top of it.",
  },
  boardFilled: {
    id: "board-filled",
    role: "whiteboard",
    src: "/images/ziggy/whiteboard/board-filled.webp",
    width: 1000,
    height: 1250,
    alt: "A Ziggy Says board in handwriting: Small steps still count, with a drawn heart.",
    description: "The board as it appears in the shop's own material.",
    interpretive: true,
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
  },
} as const satisfies Record<string, Artwork>;

export const allArtwork: Artwork[] = Object.values(artwork);

/**
 * Motion direction for the Ask Ziggy machine.
 *
 * These clips are the locked reference for how the cabinet behaves. The live
 * site implements them as CSS and React state, not video — the component reads
 * its machine state from `data-machine-state`, so a clip could be mounted per
 * state later without restructuring anything.
 *
 * They are reference material and are not loaded by any page.
 */
export type MotionReference = {
  id: string;
  src: string;
  title: string;
  /** The machine states this clip documents. */
  states: string[];
  beats: string[];
  note?: string;
};

export const motionReferences: MotionReference[] = [
  {
    id: "wake-up",
    src: "/images/ziggy/oracle/motion/01-wake-up.mp4",
    title: "Wake up",
    states: ["idle", "waking"],
    beats: [
      "Cabinet dark.",
      "Bulbs snap on one at a time.",
      "Ziggy lifts his eyes; small head and body shift; glow rises.",
      "Tray slides forward and the ticket becomes visible.",
      "The ASK ZIGGY sign lands.",
    ],
    note: "Sound direction, only if a clip is ever mounted with a user-initiated control: low electrical hum, individual bulb clicks, a small servo, one bell. Never autoplay audio.",
  },
  {
    id: "the-answer",
    src: "/images/ziggy/oracle/motion/02-the-answer.mp4",
    title: "The answer",
    states: ["thinking", "issuing", "revealed"],
    beats: [
      "Empty tray and ticket slot.",
      "The mechanical print action starts.",
      "Ziggy leans forward behind the glass.",
      "The fortune becomes readable.",
      "His eyes snap to the viewer.",
    ],
  },
  {
    id: "dont-ask-twice",
    src: "/images/ziggy/oracle/motion/03-dont-ask-twice.mp4",
    title: "Don't ask twice",
    states: ["revealed", "thinking", "issuing"],
    beats: [
      "Slow push toward Ziggy in the glowing cabinet.",
      "The machine shows ASK YOUR QUESTION.",
      "The lever actuates and the lights cut.",
      "Lights return brighter; Ziggy is closer and more awake; tray extended.",
      "The fortune reads YOU ALREADY KNOW.",
    ],
    note: "The repeat-pull beat. Dry, funny, slightly unnerving, affectionate. Never horror.",
  },
];
