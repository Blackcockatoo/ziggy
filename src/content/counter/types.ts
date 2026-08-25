export const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type Weekday = (typeof weekdays)[number];

export type OpeningWindow = {
  /** Local wall-clock time in the shop's configured IANA time zone. */
  opens: string;
  /** May be earlier than `opens` when the window runs past midnight. */
  closes: string;
};

export type ManualDataSource = {
  kind: "manual";
  label: string;
  checkedOn: string;
  url?: string;
  note?: string;
};

export type ShopSchedule = {
  timeZone: string;
  weekly: Record<Weekday, readonly OpeningWindow[]>;
  /** ISO local dates replace the regular day entirely. An empty array means closed. */
  overrides: Record<string, readonly OpeningWindow[]>;
  source: ManualDataSource;
};

export type ShopDetails = {
  name: string;
  address: {
    line: string;
    suburb: string;
    state: string;
    mapUrl: string;
  };
  schedule: ShopSchedule;
};

export type WorldClockConfig = {
  id: string;
  city: string;
  timeZone: string;
  home?: boolean;
  note?: string;
};

export type DailyZiggyMessage = {
  id: string;
  line: string;
};

export type DailyZiggyConfig = {
  timeZone: string;
  fortuneIds: readonly string[];
  /** Date-specific messages supplied by Rob or Carla take priority when present. */
  ownerMessages: Record<string, DailyZiggyMessage>;
  fallback: readonly DailyZiggyMessage[];
  deeperHref: `#${string}`;
};

export type NostalgiaCategory =
  | "getting-around"
  | "phones"
  | "video"
  | "music"
  | "digital-pets"
  | "television"
  | "internet";

export type NostalgiaEntry = {
  id: string;
  title: string;
  yearOrEra: string;
  description: string;
  category: NostalgiaCategory;
  image?: { src: string; alt: string };
  source?: { label: string; url: string };
};

export type CounterLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  publisher: string;
};

export type TodayBoardLink = {
  id: string;
  label: string;
  detail: string;
  href: string;
  publisher?: string;
};

export type CounterModuleId =
  | "shop-status"
  | "today-board"
  | "world-clocks"
  | "ziggy-daily"
  | "remember-this"
  | "useful-links";

export type CounterModuleConfig = {
  id: CounterModuleId;
  enabled: boolean;
  size: "full" | "wide" | "narrow";
};

/**
 * Shared contract for later live-data adapters. A module must distinguish a
 * verified value from an unavailable source and from a deliberately omitted
 * field; it must never turn failure into made-up content.
 */
export type LiveDataResult<T> =
  | { state: "ready"; value: T; asOf: string; sourceLabel: string }
  | { state: "unavailable"; reason?: string }
  | { state: "omitted" };

export type TodayDataAdapterId =
  | "frankston-weather"
  | "sunrise-sunset"
  | "public-holidays"
  | "local-transport"
  | "frankston-events";

export interface TodayDataAdapter<T> {
  id: TodayDataAdapterId;
  load(signal?: AbortSignal): Promise<LiveDataResult<T>>;
}
