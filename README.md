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
**Roughly 11,000 Mornings — Thirty Years Behind the Counter in Frankston**.

B$S is the curator here, not the subject.

---

## What Ziggy is

**Ziggy is an exhibition invention.** He is the fortune-teller, narrator and
slightly impossible interpreter built for this project. His name is not a
historical claim about the shop's physical monkey figures.

The historical record currently contains two separately documented names:
**Ziggie**, in a dated disappearance/replacement news lead, and **Archie**, in
dated shop/public material. The evidence does not establish that either was
the original, whether they are the same figure, whether one replaced the
other, or how many figures existed. Keep those names exactly where their
sources put them and do not recruit exhibition-Ziggy into that genealogy.

**Ask Ziggy** is the site's penny-arcade fortune machine: a Zoltar-like cabinet
built from a handwritten fortune library and a deterministic selection engine.
No language model runs at request time. Ziggy may interpret the archive; he may
never manufacture historical fact.

---

## Curatorial direction

This project is an art-direction and evidence-refinement exercise, not a
redesign target. Preserve the existing architecture, rooms, evidence model,
responsiveness, accessibility and working interactions unless a concrete bug
requires otherwise.

The aesthetic equation is:

> **museum catalogue × old Frankston shop window × penny arcade × slightly haunted local folklore**

The governing tension is:

> **dead-serious archival discipline on the surface; strange living symbolism underneath.**

Operationally:

- the archive says what can be proved;
- objects suggest what was lived;
- Frankston supplies the folklore;
- Ziggy is allowed to interpret it;
- interpretation never becomes evidence by repetition.

B$S should be felt through rhythm, recursion, visual restraint, odd
correspondences, object-memory, negative space and details that reward a
second look. Do not paste overt studio branding over the exhibition. The art
behind the art should be legible without becoming a speech about itself.

The experience should also feel unusually low-effort for Rob and Carla. Public
research is our job. Their contribution should be limited to the irreplaceable
human layer: private photographs, surviving objects, personal memories,
important people and corrections only they can make. No sorting, scanning,
captions or exact dates should be demanded.

When in doubt, prefer **correct → consolidate → populate → simplify** over
**expand → redesign → rewrite everything**.

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

`pnpm build` also runs lint, typecheck and tests first, so a production build
cannot quietly skip the other gates.

The site is fully static (`next build` prerenders its routes). There is no
database, no API and no runtime content fetch.

For deployment, domain and content-location details, see
[`docs/HANDOVER.md`](docs/HANDOVER.md).

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
  components/         one component per room, plus the everyday Counter
  content/            the archive and separately configured Counter content
  lib/
    evidence.ts       honesty-label rules
    fortune-engine.ts the Ziggy machine
    mornings.ts       legacy date helpers; the exhibition now shows an approximation
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
| — | Today's Counter | `counter-home/counter-home.tsx` | `#daily-counter` |
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

The lightweight front Counter is configured under `src/content/counter/`.
See [`docs/COUNTER.md`](docs/COUNTER.md) for the short extension path.

---

## Content model

Every file in `src/content/` exports typed data. Types live in
`src/content/types.ts`; `exhibition.ts` assembles them.

| File | Holds |
|------|-------|
| `identity.ts` | Titles, thesis, address, the approximate mornings device |
| `sources.ts` | Every citation, by id |
| `timeline.ts` | The 1996 → 2026 narrative |
| `wins.ts` | The ten Division One slots, plus sourced-but-unplaced wins |
| `monkeys.ts` | Historical monkey-name records and folklore specimen labels |
| `memories.ts` | Counter objects and the oral-history fragments on them |
| `people.ts` | `principals` (Rob, Carla) and `staff` (the gang) |
| `community.ts` | Around Town |
| `artefacts.ts` | The object archive catalogue |
| `fortunes/` | Ziggy's categories and handwritten library |

---

## Historical sourcing

This is the part that matters most, and the part easiest to erode.

Every claim carries an `Evidence` record with one of six statuses:

| Status | Means | Renders as |
|--------|-------|-----------|
| `verified` | A source you can go and read | Documented |
| `strongly-supported` | Substantially supported, with a stated source limit | Strongly supported |
| `probable` | A reasonable inference, not yet pinned down | Probable |
| `needs-confirmation` | A lead awaiting the archive or an interview | Needs confirming |
| `anecdotal` | Told and believed locally, not documented | Local lore |
| `placeholder` | An empty frame, kept empty on purpose | Archive slot |

Visitors see the coarser distinction — **documented fact** versus **local
lore** versus an empty frame — via `evidenceClass()` in `src/lib/evidence.ts`.
That distinction is part of the exhibition, not an apology for it.

Rules the tests enforce:

- A `verified` or `strongly-supported` record must cite at least one source that exists in
  `sources.ts`.
- Nothing unverified is ever classified as documented.
- An incomplete Division One win can never be `verified` or `probable`.
- A recorded memory cannot be published without `permission: "granted"`.
- A staff member's nickname, anecdote, memory or whereabouts cannot be
  published without `permission: "granted"`.

Personal material has a second gate: `Evidence.permission`
(`granted` / `pending` / `not-required` / `withheld`). `isPubliclyClearable()`
decides whether a person's details render at all. The default is no.

### Record-separation rules

Keep these distinct even when they sit close together in time:

- company registration;
- ABN commencement;
- GST registration;
- registered business-name dates;
- recorded trading-name dates;
- archived-web capture dates;
- first verified address-specific evidence;
- first physical trading day;
- remembered opening date;
- shopfront-signage chronology.

A registry date is not an opening date. A web capture is not the first day the
shop existed. A source using one monkey name does not prove a genealogy. A
Frankston resident winning Lotto does not prove a ticket was sold at 8
Thompson Street.

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
  evidence: { status: "verified", sourceIds: ["dated-public-source"] },
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
  evidence: { status: "verified", sourceIds: ["recorded-memory-001"], permission: "granted" },
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
  relatedIds: ["new-awning"],   // must exist in the catalogue graph
  tags: ["signage", "shopfront"],
  evidence: { status: "verified", sourceIds: ["family-archive-001"] },
  media: { /* alt text and caption are required, filled or not */ },
}
```

`wanted` is the curator's internal accession list, not homework for Rob or
Carla. `lost` is a real catalogue state — a museum records what it does not
have.

### A photograph

Put the approved file in `public/archive/`, then set `src` on the media record:

```ts
media: {
  id: "first-shopfront",
  kind: "image",
  src: "/archive/first-shopfront.jpg",
  alt: "Rob outside an early Frankston shopfront",
  caption: "Rob at 8 Thompson Street, date to be confirmed.",
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

## What public research already carries

The public record now supplies enough that Rob and Carla should not be asked
to reconstruct it for us:

- the ABR company/business-name/trading-name chronology;
- the supported Est. 1996 / thirty-year frame without an invented opening day;
- a dated 2016 address-specific Tobacco Blends / Cignall web record;
- documented public services and specialist online catalogue categories;
- recoverable Division One wins in 2016, 2019 and 2022, plus the documented
  tenth win in 2026;
- one documented 2018 Great Flavours / Butt Out Day collaboration;
- a strong published lead for the Ziggie disappearance/search/reward,
  non-recovery and replacement;
- separate dated use of the name Archie.

Do not turn these back into owner homework.

---

## What remains genuinely human

The owner/archive layer should stay short:

- the earliest shop image or paper;
- monkey photographs/material and clarification of the Ziggie / Archie /
  replacement relationship;
- a small batch of candid shop photographs and one surviving object;
- up to three people who matter, one genuine community connection, and one
  image/story of major change;
- optional ephemera or casual voice notes.

No sorting, scanning, captions or exact dates are required. Public lottery,
registry, service and press facts remain research tasks.

The exact first trading day and the placement of recovered 2016, 2019 and 2022
wins within positions 1–9 are unresolved. The tenth win is fixed at draw 4685
on 13 June 2026; two readable draw archives give the Division One dividend as
$3,127,800.49, while an indexed official snippet is $1,000 lower. The source
note preserves that conflict.

**A note on the mornings counter:** the front window says
`≈ 11,000 mornings`. No exact date is stored or implied. It is an
anniversary-scale illustration attached to the supported Est. 1996 /
thirty-year frame.

---

## Editorial principle

This is an exhibition first and a business website second. Preserve the real
shop's texture. Do not sand it into brand language, and do not let a good
story quietly become a fact.

The archive earns the right to be strange by being scrupulous about what it
knows.
