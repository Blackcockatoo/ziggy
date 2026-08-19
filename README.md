# Ziggy — The Monkey Shop digital exhibition

A content-first Next.js foundation for a thirty-year Cignall Frankston exhibition about Rob, Carla, the counter, the customers and the shopfront monkeys.

This is deliberately a structural and editorial scaffold, not finished art direction. Every room works, the responsive system exists, the Ask Ziggy interaction is functional, and research can be added without rewriting the page.

## Exhibition rooms

1. Front Window
2. 1996–2026 timeline
3. The Lucky Monkey
4. The Luck Ledger (all ten Division One slots)
5. Ziggy → Archie lineage
6. Ask Ziggy fortune machine
7. The Counter oral histories
8. The Gang
9. Around Town
10. Rob closing portrait
11. Visit / location finale

## Content model

The core research lives in `src/content/exhibition.ts`. Shared types live in `src/content/types.ts`, citations in `src/content/sources.ts`, and the handcrafted Ziggy sayings in `src/content/fortunes.ts`.

Every historical item has one evidence status:

- `verified`: supported by a linked primary source
- `research-lead`: promising material that still needs the archive, an interview or a primary source
- `placeholder`: an intentionally empty slot for future material

Do not upgrade a status to `verified` without adding its source. Do not turn an interview prompt into a quote unless the recording, transcript and speaker permission exist.

## Adding photographs

Media records already include alt text, captions and evidence. Put approved local images in `public/archive/`, then set the record's `src`, for example:

```ts
media: {
  id: "first-shopfront",
  kind: "image",
  src: "/archive/first-shopfront.jpg",
  alt: "Rob outside the original Frankston shopfront in 1996",
  caption: "Rob at 8 Thompson Street, 1996. Courtesy of the Macaro family.",
  evidence: { status: "verified", sourceIds: ["family-archive-001"] },
}
```

The shared renderer already uses `next/image`. When the image collection is stable, record real dimensions and focal-point metadata in the schema so crops can be art-directed per room.

## Local development

Requires Node.js 20.9 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Quality checks:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Research backlog

- Confirm the first trading date and the original shop name from primary material.
- Reconstruct wins 1–9 with draw number, date, game, prize and a permitted human detail.
- Establish the exact Ziggy / Ziggie / Archie chronology and spelling.
- Digitise the monkey theft clipping, reward notice and replacement photographs.
- Record Rob and Carla separately, then replace prompts with approved excerpts.
- Collect staff names, years, nicknames and photograph permissions.
- Build a dated list of services and community contributions from receipts, signage and records.
- Commission the final Rob, Carla, Ziggy and Archie portraits.

## Editorial principle

This is an exhibition first and a business website second. Preserve the real shop's texture. Do not sand it into generic brand language.
