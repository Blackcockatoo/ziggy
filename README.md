# Ziggy — The Monkey Shop

A digital exhibition about thirty years of a small Frankston shop.

Not a Cignall website. Not an anniversary landing page. This is a piece of
local history: shop-window archaeology about Rob and Carla's family agency at
8 Thompson Street, the counter, the customers, the ten Division One wins, and
the monkeys who ended up as a landmark.

> Some businesses trade in Frankston.
> Some become part of Frankston.

The working title is **The Monkey Shop — Thirty Years in Frankston**. The
editorial alternative, kept alive in `src/content/identity.ts`, is
**10,957 Mornings — Thirty Years Behind the Counter in Frankston**.

B$S is the curator here, not the subject.

---

## What Ziggy is

Two things share the name.

1. **Ziggy** (or Ziggie) is the original shopfront monkey, and the reason the
   place gets called the Lucky Monkey Shop. He was stolen around 2015. Archie
   is the monkey outside the shop today. Whether Archie is the direct
   replacement or a later one is genuinely not established — see
   `src/content/monkeys.ts`.
2. **Ask Ziggy** is the site's fortune machine: a Zoltar cabinet run by a
   tobacconist's monkey, built on a handwritten fortune library and a
   deterministic selection engine. No language model runs at request time.

---

## Running it

Node 20.9+ and pnpm.

```sh
pnpm install
pnpm dev
```

Quality gates — all four should pass before you push:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The site is fully static (`next build` prerenders one route). There is no
database, no API and no runtime content fetch.

---

## Architecture

Next.js 16 (App Router) · React 19 · TypeScript (strict) · plain CSS ·
Vitest. No UI framework, no animation library, no state library. Deliberately.

```
src/
  app/
    page.tsx          the exhibition, in walking order
    layout.tsx        fonts, metadata
    globals.css       the whole design system
  components/         one component per room, plus shared pieces
  content/            the archive — every fact the site renders
  lib/
    evidence.ts       honesty-label rules
    fortune-engine.ts the Ziggy machine
    mornings.ts       the "10,957 mornings" arithmetic
tests/                content integrity, the engine, server-rendered structure
public/archive/       approved images, documents and audio
```

Components take data as props and render it. They hold no facts of their own.
If you find yourself typing a date into a `.tsx` file, it belongs in
`src/content/` instead.

### The rooms

| # | Room | Component | Anchor |
|---|------|-----------|--------|
| — | Front Window | `front-window.tsx` | `#top` |
| 01 | 1996 → 2026 | `timeline.tsx` | `#story` |
| — | Commemorative plate | `commemorative.tsx` | — |
| 02 | The Luck Ledger | `luck-ledger.tsx` | `#ledger` |
| 03 | The Lucky Monkey + The Succession | `lucky-monkey.tsx`, `monkey-succession.tsx` | `#monkey` |
| 04 | Ziggy Says (the board) | `ziggy-says.tsx` | `#board` |
| — | The bridge into the oracle | `oracle-bridge.tsx` | — |
| 05 | Ask Ziggy | `ask-ziggy.tsx`, `fortune-card.tsx` | `#ask-ziggy` |
| 06 | The Counter | `counter.tsx` | `#counter` |
| 07 | The Gang | `gang.tsx` | `#gang` |
| 08 | Around Town | `around-town.tsx` | `#around-town` |
| 09 | The Object Archive | `object-archive.tsx` | `#archive` |
| 10 | Rob + Carla | `principals.tsx` | `#rob-and-carla` |
| 10 | Come see the real thing | `visit-finale.tsx` | `#visit` |

A test asserts that every navigation anchor has a matching section id, so a
room cannot be listed and then quietly not exist.

**Ziggy Says comes before Ask Ziggy on purpose.** The board is the real,
daily, documentary version of the shop having a voice. The fortune machine is
the theatrical version of the same voice. Putting the machine first would make
it a gimmick; putting the board first makes it earned. `oracle-bridge.tsx` is
the sentence that joins them.

---

## Content model

Every file in `src/content/` exports typed data. Types live in
`src/content/types.ts`; `exhibition.ts` assembles them.

| File | Holds |
|------|-------|
| `identity.ts` | Titles, thesis, address, the assumed first morning |
| `sources.ts` | Every citation, by id |
| `timeline.ts` | The 1996 → 2026 narrative |
| `wins.ts` | The ten Division One slots, plus sourced-but-unplaced wins |
| `monkeys.ts` | The succession and the folklore specimen labels |
| `memories.ts` | Counter objects and the oral-history fragments on them |
| `people.ts` | `principals` (Rob, Carla) and `staff` (the gang) |
| `community.ts` | Around Town |
| `artefacts.ts` | The object archive catalogue |
| `board.ts` | Ziggy Says board lines, and the bridge copy |
| `fortunes/` | Ziggy's categories and handwritten library |
| `artwork.ts` | Interpretive Ziggy artwork and motion references |

### Documentary vs interpretive

The single most important line in this repo. Two kinds of image exist and they
must never be confused:

|  | Documentary | Interpretive |
|---|---|---|
| What | Real archive material | Artwork made for the exhibition |
| Model | `MediaAsset`, carrying `Evidence` | `Artwork`, typed `interpretive: true` |
| Lives in | `src/content/*.ts` | `src/content/artwork.ts` |
| Served from | `/archive/` | `/images/ziggy/` |
| Renders via | `media-placeholder.tsx` | `ziggy-artwork.tsx` |
| Can evidence a claim | Yes | **No** |

Tests assert both halves: every `Artwork.src` starts with `/images/ziggy/`, and
every `MediaAsset.src` starts with `/archive/`. Do not move a file across that
line to save a directory.

Artwork depicting identifiable people (the anniversary poster) additionally
requires a `note` explaining that the people are illustrated, and that note has
to reach the page. A test checks that too.

```
public/
  archive/            documentary — approved photographs and documents
  images/ziggy/
    oracle/           the cabinet, the portrait, the tray, after hours
      motion/         locked motion reference clips (not loaded by any page)
    whiteboard/       Ziggy with the board, blank and filled boards
    identity/         the Ziggy Says badge and its small seal
    anniversary/      the thirty-year commemorative poster
    character/        the transparent full-body cutout
```

---

## Historical sourcing

This is the part that matters most, and the part easiest to erode.

Every claim carries an `Evidence` record with one of five statuses:

| Status | Means | Renders as |
|--------|-------|-----------|
| `verified` | A source you can go and read | Documented |
| `probable` | Strongly indicated, not yet pinned down | Probable |
| `needs-confirmation` | A lead awaiting the archive or an interview | Needs confirming |
| `anecdotal` | Told and believed locally, not documented | Local lore |
| `placeholder` | An empty frame, kept empty on purpose | Archive slot |

Visitors see the coarser distinction — **documented fact** versus **local
lore** versus an empty frame — via `evidenceClass()` in `src/lib/evidence.ts`.
That distinction is part of the exhibition, not an apology for it.

Rules the tests enforce:

- A `verified` record must cite at least one source that exists in
  `sources.ts`.
- Nothing unverified is ever classified as documented.
- An incomplete Division One win can never be `verified` or `probable`.
- A recorded memory cannot be published without `permission: "granted"`.
- A staff member's nickname, anecdote, memory or whereabouts cannot be
  published without `permission: "granted"`.

Personal material has a second gate: `Evidence.permission`
(`granted` / `pending` / `not-required` / `withheld`). `isPubliclyClearable()`
decides whether a person's details render at all. The default is no.

---

## Ask Ziggy, the machine

The cabinet is a mechanism, not a form with a spinner. One pull runs:

```
idle → waking → thinking → issuing → revealed
```

Later pulls skip `waking`, because by then the machine is awake. The state
lives in React (`src/lib/machine-states.ts`), is published on the machine as
`data-machine-state`, and drives everything visual — the bulbs snapping on, the
interior glow rising, Ziggy leaning forward, the lever dropping, the lights
dipping as the mechanism draws current, the ticket landing on the tray.

Three rules hold it together:

1. **The fortune exists before the animation does.** `drawFortune` runs
   synchronously on submit. The sequence only decides *when* the ticket becomes
   visible — it can never change what it says.
2. **Reduced motion is not a lesser experience.** Under
   `prefers-reduced-motion: reduce` the sequence is skipped entirely and the
   ticket appears immediately (measured at ~11ms), with the cabinet forced to
   its fully lit values. No information is behind an animation.
3. **The artwork is a layer, never a control.** The form, label, lever,
   buttons, headings, plate text and the fortune itself are real HTML. The only
   thing the imagery supplies is Ziggy.

Inside the glass, the machine uses the **transparent cutout**, not one of the
photographed cabinets. Every photograph carries its own painted `ASK ZIGGY`
signage, which would reproduce the real `<h2>` as raster text directly behind
itself. A test enforces this.

### The motion references

`public/images/ziggy/oracle/motion/` holds the three locked ~10 second clips —
wake up, the answer, don't ask twice — described beat by beat in
`motionReferences` in `src/content/artwork.ts`. They are direction, not assets:
no page loads them, and a test asserts the rendered page contains no `<video>`
and no `.mp4`. Because the component already publishes its state, mounting a
clip per state later is additive rather than a restructure.

If a clip is ever mounted, sound stays behind a user-initiated control. Never
autoplay audio.

### The ticket

Aged cream stock, black ink, a ruled border, the Ziggy seal, a serial and a
date. It carries its own light palette rather than inheriting the room's, so it
reads as paper on the dark cabinet **and** prints correctly on white — the
print rules force `#000` on `#fff` so the output never depends on a dark
background rendering. "Print ticket" isolates the card via `visibility`, which
keeps its ancestors in the box tree so it can still be positioned on the page.

## How to add things

### A timeline entry

`src/content/timeline.ts`. Append anywhere — the array is sorted by `sortKey`
on export.

```ts
{
  id: "new-awning",
  year: "2011",
  sortKey: 2011,
  chapter: "trading",
  eyebrow: "Out the front",
  title: "The awning goes up",
  body: "One panel of text. This is what the visitor reads.",
  story: "Optional longer read, behind a <details>.",
  evidence: { status: "verified", sourceIds: ["shop-ledger"] },
  artefactIds: ["MS-2011-017"],   // must exist in artefacts.ts
}
```

Never invent a date. `year: "Date unknown"` with a rough `sortKey` is correct
and honest; a wrong year is not.

### A Lotto win

`src/content/wins.ts`. Replace the matching `pending(n)` call:

```ts
{
  number: 4,
  date: "2 September 2006",
  game: "TattsLotto",
  draw: "2647",
  prize: "$1,215,000",
  entry: "Marked entry",
  winnerLocality: "Frankston",
  story: "One human detail. Not a press release.",
  quote: "Only if it was actually said, on the record.",
  quoteAttribution: "The winner, via The Lott",
  evidence: { status: "verified", sourceIds: ["lott-2006-draw-2647"] },
}
```

Add the source to `sources.ts` first. If you know a win happened but not where
it sits in the run of ten, put it in `unplacedWins` — do not guess a number.

### A fortune

`src/content/fortunes/library.ts`. Find the drawer and add a line:

```ts
["work-15", "dry", "Ask on Wednesday.", "Nobody says yes on a Monday."],
```

The tuple is `[id, mood, answer, kicker]`, with an optional fifth element
`"fixed"` when the kicker only makes sense with its own answer — the machine
recombines `open` lines within a drawer on repeat pulls, and a `fixed` line is
never recombined.

House style: short, dry, spoken, Australian, occasionally sincere, never
cruel, never corporate. Answers stay under ~46 characters and kickers under
~96; the tests check, because a long line breaks the printed card.

To add a whole drawer, add a `CategoryProfile` to
`src/content/fortunes/categories.ts` (with a unique three-letter serial code
and its routing keywords) and a matching set of lines. The architecture is
sized for 300+ fortunes; nothing else needs to change as it grows.

### An oral history fragment

`src/content/memories.ts`. Records start as prompts. When you have a recording
and permission, add the fragment — the component switches automatically:

```ts
{
  id: "saturday-regular",
  fragment: "Came in every Saturday for seventeen years.",
  prompt: "Who came in every week for years…",   // keep it; it is the provenance
  speaker: "Rob",
  speakerRole: "rob",
  era: "2000s",
  objectId: "pencil",                            // must exist in counterObjects
  evidence: { status: "verified", sourceIds: ["interview-rob"], permission: "granted" },
}
```

No fragment gets published without `permission: "granted"`. A test enforces it.

### A board line

`src/content/board.ts`. Only record a line that has actually been seen written
on a board:

```ts
{
  id: "shut-the-door",
  line: "Shut the door, it's not a bus stop.",
  flourish: "Underlined twice.",
  date: "August 2011",
  evidence: { status: "verified", sourceIds: ["shop-ledger"] },
}
```

A line with an empty `line` renders as a genuinely empty board — that is the
honest representation of thirty years of boards nobody photographed.

**Do not invent board entries.** A line seen in artwork is not the same as a
line seen on the board, and is filed `needs-confirmation` with a note saying
so. If the exhibition wants a line of its own, it belongs in Ziggy's fortune
library, not here. Tests enforce that no board entry is ever `verified` without
a source, and that every `needs-confirmation` entry explains itself.

### An artefact

`src/content/artefacts.ts`. Catalogue numbers are `MS-<year|XXXX>-<sequence>`
and must be unique — `XXXX` is an honest statement that the object is undated.

```ts
{
  id: "MS-2011-017",
  catalogue: "MS-2011-017",
  title: "Shop awning, removed",
  objectType: "signage",
  dateRange: "2011",
  description: "What it is and why it matters.",
  provenance: "Held: back room.",
  holding: "held",              // held | wanted | lost
  relatedIds: ["new-awning"],   // timeline, monkey, person or counter-object ids
  tags: ["signage", "shopfront"],
  evidence: { status: "verified", sourceIds: ["shop-ledger"] },
  media: { /* alt text and caption are required, filled or not */ },
}
```

`wanted` is the shopping list for Rob. `lost` is a real catalogue state — a
museum records what it does not have.

### A photograph

Put the approved file in `public/archive/`, then set `src` on the media record:

```ts
media: {
  id: "first-shopfront",
  kind: "image",
  src: "/archive/first-shopfront.jpg",
  alt: "Rob outside the original Frankston shopfront in 1996",
  caption: "Rob at 8 Thompson Street, 1996.",
  credit: "Courtesy of the Macaro family.",
  evidence: { status: "verified", sourceIds: ["family-archive-001"] },
}
```

Alt text and captions are already written on every empty slot, so they never
become an afterthought when the images land.

### A piece of Ziggy artwork

`src/content/artwork.ts`, then render it with `<ZiggyArtwork>`:

```ts
newPiece: {
  id: "new-piece",
  role: "oracle",
  src: "/images/ziggy/oracle/new-piece.webp",
  width: 1122,
  height: 1402,
  alt: "Ziggy inside a black-and-gold illuminated fortune-teller cabinet.",
  description: "What it is, for the credits. Not alt text.",
  interpretive: true,
},
```

```tsx
<ZiggyArtwork artwork={artwork.newPiece} sizes="(max-width: 900px) 100vw, 40vw" />
```

- Intrinsic `width`/`height` are required, so space is reserved and nothing
  shifts while the image loads.
- `sizes` is required in practice — get it roughly right or the browser
  downloads the wrong file.
- `priority` only for genuinely above-the-fold imagery. Everything currently in
  the manifest is lazy.
- An empty `alt` is a deliberate decorative declaration and must be explained
  in the manifest's `note`. `decorative` on `<ZiggyArtwork>` forces that at one
  usage for a piece that is meaningful elsewhere.
- Describe what is visible. Do not write marketing copy into alt text, and do
  not restate text that is already on the page.

Source files are optimised WebP. The ten originals came in at 21MB of PNG and
ship at 1.6MB.

---

## Accessibility and performance

- Skip link; semantic headings; one `h1`.
- Images never replace controls. The fortune machine is a real `<form>` with a
  real `<label>`, a real submit button and real text output; the cabinet is
  imagery behind it.
- The Counter is built on native `<details name="counter">` — exclusive
  accordion behaviour, keyboard support and screen-reader semantics with zero
  JavaScript.
- Timeline long-reads and the monkeys' open questions are `<details>` too.
- Ask Ziggy is a real form with a real label and a real submit button. The
  output slot is an `aria-live` region. With scripting off, a `<noscript>`
  block still shows what Ziggy sounds like.
- All motion is decorative and collapses under
  `prefers-reduced-motion: reduce`.
- Mobile-first; no horizontal overflow at 390px, 768px or 1280px (checked).
- The cabinet is a two-column object on desktop and a single column below
  900px. Ziggy is always `contain`, never `cover`, so he stays recognisable
  instead of cropping into an abstract on a phone.
- No animation, UI or state dependencies. All motion is CSS driven by one
  `data-machine-state` attribute.
- Cumulative layout shift measured at 0.055. Board text contrast measured at
  15:1, ticket text at 16:1.

---

## What is still unverified

Nothing below should be stated as fact on the public site until it is sourced.

**Ask Rob and Carla:**

- The board lines. Two are shown — "Be kind. You never know who needs it." and
  "Small steps still count." — and both are marked `needs-confirmation`,
  because they appear in artwork rather than in a dated photograph of the
  board. Any board photograph with a visible date is a primary source.

- The real first trading day, and the original trading name. Everything about
  1996 currently rests on "thirty years" being reported in 2026.
- Wins 1–9: date, draw number, game, prize, ticket type and a permitted human
  detail for each. Nine of ten rows are empty.
- Where the 2022 $1m win sits in the run of ten.
- Ziggy or Ziggie — and whether Archie is the direct replacement.
- When the first monkey arrived, and where he came from.
- The monkey theft: date, masthead, and whether a reward notice exists.
- Whether the original monkey was ever recovered.
- The dated service list, including whether the specialist pipe trade is real.
- Covid trading: hours, screens, who kept coming in.
- Staff names, years, nicknames, whereabouts — and permission for each.
- The mural: artist, date, location, condition.
- Community involvement: specific dated things, not general goodwill.

**Known-good, already sourced:** the address; Archie's name; the tenth
Division One win of $3,126,800.49 on 13 June 2026 (draw 4685); the $1,000,000
Division One win on 8 January 2022 (draw 4223); "the Lucky Monkey Shop" as a
customer nickname.

**A note on the mornings counter:** the number on the front window is
arithmetic on an *assumed* opening date of 1996-01-01, held in
`identity.assumedFirstMorning` with a `needs-confirmation` status, and it
renders with that caveat visible. It is also computed at build time, so it
only moves when the site is rebuilt. Once Rob confirms the real first morning,
change the date there and set the status to `verified`.

---

## Editorial principle

This is an exhibition first and a business website second. Preserve the real
shop's texture. Do not sand it into brand language, and do not let a good
story quietly become a fact.
