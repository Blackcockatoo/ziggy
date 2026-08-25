# Extending the everyday Counter

The public Counter is deliberately small and configuration-led. It lives in
`src/components/counter-home/`; editable content lives in
`src/content/counter/`.

## Common changes

- **Opening hours:** edit `shop-details.ts`. A date in `overrides` replaces the
  regular hours for that whole local Melbourne date; use `[]` for confirmed
  closure.
- **Clock city:** edit `world-clocks.ts` with a real IANA time zone. Reorder the
  array to reorder the clocks.
- **Daily Ziggy:** add an existing Ask Ziggy fortune id in `ziggy-daily.ts`, or
  add an ISO-date entry to `ownerMessages` for a message supplied by Rob or
  Carla.
- **Nostalgia:** append a typed entry to `nostalgia.ts`. Images and sources are
  optional; never use an unsourced image merely to fill the slot.
- **Useful link:** add a verified official destination in `useful-links.ts`.

## Add or reorder a module

1. Build the component under `src/components/counter-home/`.
2. Add its id to `CounterModuleId` in `types.ts`.
3. Register it once in `moduleRegistry` in `counter-home.tsx`.
4. Place, disable or resize it in `modules.ts`.

The shared `CounterTimeProvider` supplies one browser clock to all current-time
modules. Keep time zones as IANA names and keep current date/time out of the
server-rendered initial markup to avoid stale static values and hydration
mismatches.

## Add live data

Implement `TodayDataAdapter<T>` from `types.ts` and preserve its three states:

`ready → unavailable → omitted`

Render a value only from `ready`. An unavailable source may get a quiet retry
link or disappear; it must never fall back to an invented weather reading,
train status, event, holiday exception, result or count.
