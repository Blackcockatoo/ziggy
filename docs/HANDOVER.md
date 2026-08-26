# The Monkey Shop v1.0 — technical handover

This is a static, deliberately low-maintenance digital exhibition. Rob and
Carla do not need an account, a CMS or a maintenance routine to receive it.

## Repository and production

- Repository: `Blackcockatoo/ziggy`
- Production project: Vercel project `ziggy`
- Canonical public URL: `https://themonkeyshop.com`
- Infrastructure URL: `https://ziggy-three.vercel.app`
- Production branch: `main`
- Runtime: Node 20.9+ and pnpm
- Framework: Next.js 16 App Router, React 19, strict TypeScript and plain CSS
- Build command: `pnpm build`

The canonical domain is configured in application metadata. As checked on
2026-08-25, the domain is already delegated to Vercel DNS and its apex resolves
to Vercel, but it is not yet attached to the `ziggy` project. No registrar DNS
change is currently required. In Vercel, open `ziggy` → Settings → Domains:

1. Add `themonkeyshop.com` to the production environment.
2. Add `www.themonkeyshop.com` and configure a permanent redirect to
   `themonkeyshop.com`.
3. Wait for both cards to show valid configuration and SSL, then test HTTPS.

An authenticated developer can confirm the project association with:

```sh
vercel domains verify themonkeyshop.com --project ziggy
```

Keep `ziggy-three.vercel.app` attached as infrastructure. Do not transfer the
domain, team or project ownership during Phase 1.

## Local work and quality gates

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The `prebuild` script runs lint, typecheck and tests before Next.js builds, so
the normal production command exercises all four gates.

## Where content lives

| Material | Location |
|---|---|
| Exhibition assembly and walking order | `src/app/page.tsx` |
| Historical records and evidence labels | `src/content/` |
| Sources | `src/content/sources.ts` |
| Counter configuration | `src/content/counter/` |
| Opening hours | `src/content/counter/shop-details.ts` |
| Ask Ziggy fortunes | `src/content/fortunes/` |
| Legacy 44 catalogue | `src/content/visual-archive.ts` |
| Stationery catalogue | `src/content/stationery.ts` |
| Stationery downloads | `public/downloads/ziggy-stationery/` |
| Legacy 44 images | `public/images/ziggy/legacy-44/` |
| Other exhibition/archive images | `public/images/` |
| Record Room covers and audio | `public/archive/record-room/` |

The Counter extension contract is documented in [`COUNTER.md`](COUNTER.md).
Its `ready → unavailable → omitted` behaviour is deliberate. Do not replace an
unavailable source with invented live data.

## Routine edits

### Opening hours

Edit the weekly schedule in `src/content/counter/shop-details.ts`, then update
the manual source note and `checkedOn` date only after checking the shop's
current public listing. Use dated overrides only for confirmed exceptions;
never infer holiday hours.

### Historical material

Edit the relevant typed file under `src/content/`. Preserve the six evidence
statuses and permission gates described in the main README. A cleaner layout
is not a reason to upgrade an evidence status.

### Images

Replace an image at its existing path to preserve references, or add the new
file under `public/images/` and update the matching content record. Keep useful
alt text, dimensions/aspect ratio and evidence/permission metadata. For Legacy
44, preserve the numbered sequence and update `src/content/visual-archive.ts`.

### Downloads

Put public files under `public/downloads/ziggy-stationery/` and update
`src/content/stationery.ts`. Test the direct URL, printable output and fillable
fields before deployment.

## Deployment

1. Run `pnpm build` locally when registry access is available.
2. Commit and push to `main`.
3. The linked Vercel project builds and deploys the commit.
4. Check the Vercel deployment status, then smoke-test the production alias.
5. Verify `/robots.txt`, `/sitemap.xml`, the canonical tag, social image,
   downloads, Record Room audio and the main interactive flows.

For Record Room changes, test Previous/Play/Next while audio is actually
playing. Browser source-change events are order-sensitive, so a static page
check is not enough to verify the transport controls.

If a release regresses, use Vercel's production rollback/promote control for
the last known-good deployment; do not rewrite Git history. Account or project
ownership is intentionally not transferred in Phase 1.
