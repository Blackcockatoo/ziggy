import type { DailyZiggyConfig, DailyZiggyMessage } from "@/content/counter/types";
import type { Fortune } from "@/content/fortunes/types";
import { dateKeyInTimeZone, deterministicDailyIndex } from "./counter-time";

export type SelectedDailyZiggy = DailyZiggyMessage & {
  dateKey: string;
  source: "owner" | "fortune" | "fallback";
};

export function selectDailyZiggy(
  date: Date,
  config: DailyZiggyConfig,
  library: readonly Fortune[],
): SelectedDailyZiggy {
  const dateKey = dateKeyInTimeZone(date, config.timeZone);
  const ownerMessage = config.ownerMessages[dateKey];
  if (ownerMessage) return { ...ownerMessage, dateKey, source: "owner" };

  const fortunesById = new Map(library.map((fortune) => [fortune.id, fortune]));
  const candidates = config.fortuneIds.flatMap((id) => {
    const fortune = fortunesById.get(id);
    return fortune
      ? [{ id: fortune.id, line: `${fortune.answer} ${fortune.kicker}` }]
      : [];
  });

  if (candidates.length > 0) {
    const selected = candidates[deterministicDailyIndex(dateKey, candidates.length)];
    return { ...selected, dateKey, source: "fortune" };
  }

  const fallback =
    config.fallback[deterministicDailyIndex(dateKey, config.fallback.length)] ?? {
      id: "daily-fallback-quiet",
      line: "The monkey is keeping his own counsel today.",
    };
  return { ...fallback, dateKey, source: "fallback" };
}
