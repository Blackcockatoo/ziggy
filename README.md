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
| 02 | The Luck Ledger | `luck-ledger.tsx` | `#ledger` |
| 03 | The Lucky Monkey + The Succession | `lucky-monkey.tsx`, `monkey-succession.tsx` | `#monkey` |
| 04 | Ask Ziggy | `ask-ziggy.tsx`, `fortune-card.tsx` | `#ask-ziggy` |
| 05 | The Counter | `counter.tsx` | `#counter` |
| 06 | The Gang | `gang.tsx` | `#gang` |
| 07 | Around Town | `around-town.tsx` | `#around-town` |
| 08 | The Object Archive | `object-archive.tsx` | `#archive` |
| 09 | Rob + Carla | `principals.tsx` | `#rob-and-carla` |
| 10 | Come see the real thing | `visit-finale.tsx` | `#visit` |

A test asserts that every navigation anchor has a matching section id, so a
room cannot be listed and then quietly not exist.

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
| `fortunes/` | Ziggy's categories and handwritten library |

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

---

## Accessibility and performance

- Skip link; semantic headings; one `h1`.
- The Counter is built on native `<details name="counter">` — exclusive
  accordion behaviour, keyboard support and screen-reader semantics with zero
  JavaScript.
- Timeline long-reads and the monkeys' open questions are `<details>` too.
- Ask Ziggy is a real form with a real label and a real submit button. The
  output slot is an `aria-live` region. With scripting off, a `<noscript>`
  block still shows what Ziggy sounds like.
- All motion is decorative and collapses under
  `prefers-reduced-motion: reduce`.
- Mobile-first; no horizontal overflow at 390px or 1280px (checked).
- No animation, UI or state dependencies. `next/image` handles photographs
  when they arrive.

---

## What is still unverified

Nothing below should be stated as fact on the public site until it is sourced.

**Ask Rob and Carla:**

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
