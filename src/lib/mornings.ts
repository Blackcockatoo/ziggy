/**
 * The "10,957 mornings" device.
 *
 * The count is arithmetic on an *assumed* opening date. It is an editorial
 * illustration, not a historical claim, and every caller is expected to render
 * it alongside the evidence status of {@link identity.assumedFirstMorning}.
 *
 * Once Rob confirms the real first trading day, change the date in
 * `src/content/identity.ts` and set its status to `verified`. Nothing else
 * needs to move.
 */
const MS_PER_DAY = 86_400_000;

export function morningsBetween(fromIso: string, to: Date): number {
  const from = Date.parse(`${fromIso}T00:00:00Z`);
  if (Number.isNaN(from)) {
    throw new Error(`Not a date: ${fromIso}`);
  }

  const until = Date.UTC(
    to.getUTCFullYear(),
    to.getUTCMonth(),
    to.getUTCDate(),
  );

  return Math.max(0, Math.floor((until - from) / MS_PER_DAY));
}

export function formatMornings(count: number): string {
  return new Intl.NumberFormat("en-AU").format(count);
}
