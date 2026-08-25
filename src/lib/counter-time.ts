import type {
  OpeningWindow,
  ShopSchedule,
  Weekday,
  WorldClockConfig,
} from "@/content/counter/types";

const millisecondsPerDay = 86_400_000;
const shopTimePattern = /^(\d{2}):(\d{2})$/;
const formatterCache = new Map<string, Intl.DateTimeFormat>();
const parsedTimeCache = new Map<string, number>();
const weekdayNames: readonly Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

type ZonedDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: Weekday;
};

export type ShopStatus =
  | {
      kind: "open";
      closesAt: string;
      closesDayOffset: number;
      localDateKey: string;
    }
  | {
      kind: "closed";
      localDateKey: string;
      nextOpening: {
        opensAt: string;
        dayOffset: number;
        weekday: Weekday;
        dateKey: string;
      } | null;
    };

export type FormattedWorldClock = {
  time: string;
  dateKey: string;
  dateNote: string | null;
};

const pad = (value: number) => String(value).padStart(2, "0");

const dateKeyFromParts = ({ year, month, day }: Pick<ZonedDateParts, "year" | "month" | "day">) =>
  `${year}-${pad(month)}-${pad(day)}`;

function cachedFormatter(
  key: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const cacheKey = `${key}:${timeZone}`;
  const cached = formatterCache.get(cacheKey);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat("en-AU", { ...options, timeZone });
  formatterCache.set(cacheKey, formatter);
  return formatter;
}

const partsFormatter = (timeZone: string) =>
  cachedFormatter("parts", timeZone, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

export function getZonedDateParts(date: Date, timeZone: string): ZonedDateParts {
  const values: Record<string, string> = {};
  for (const part of partsFormatter(timeZone).formatToParts(date)) {
    if (part.type !== "literal") values[part.type] = part.value;
  }

  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);
  const weekday = weekdayNames[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];

  return {
    year,
    month,
    day,
    hour: Number(values.hour),
    minute: Number(values.minute),
    weekday,
  };
}

export function dateKeyInTimeZone(date: Date, timeZone: string): string {
  return dateKeyFromParts(getZonedDateParts(date, timeZone));
}

export function formatCounterDate(date: Date, timeZone: string): string {
  return cachedFormatter("counter-date", timeZone, {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
    .format(date)
    .toLocaleUpperCase("en-AU");
}

export function formatScheduleTime(time: string): string {
  const minutes = parseTime(time);
  const date = new Date(Date.UTC(2000, 0, 1, Math.floor(minutes / 60), minutes % 60));
  return cachedFormatter("schedule-time", "UTC", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function parseTime(value: string): number {
  const cached = parsedTimeCache.get(value);
  if (cached !== undefined) return cached;
  const match = shopTimePattern.exec(value);
  if (!match) throw new Error(`Invalid shop time: ${value}`);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new Error(`Invalid shop time: ${value}`);
  const parsed = hour * 60 + minute;
  parsedTimeCache.set(value, parsed);
  return parsed;
}

function datePartsFromKey(dateKey: string): ZonedDateParts {
  const [year, month, day] = dateKey.split("-").map(Number);
  const weekday = weekdayNames[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return { year, month, day, hour: 0, minute: 0, weekday };
}

function addCalendarDays(dateKey: string, amount: number): ZonedDateParts {
  const { year, month, day } = datePartsFromKey(dateKey);
  const shifted = new Date(Date.UTC(year, month - 1, day + amount));
  const next = `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(shifted.getUTCDate())}`;
  return datePartsFromKey(next);
}

function windowsForDate(schedule: ShopSchedule, parts: ZonedDateParts): readonly OpeningWindow[] {
  const key = dateKeyFromParts(parts);
  return Object.prototype.hasOwnProperty.call(schedule.overrides, key)
    ? schedule.overrides[key]
    : schedule.weekly[parts.weekday];
}

function activeWindow(
  windows: readonly OpeningWindow[],
  minuteOfDay: number,
): OpeningWindow | null {
  for (const window of windows) {
    const opens = parseTime(window.opens);
    const closes = parseTime(window.closes);
    if (opens < closes && minuteOfDay >= opens && minuteOfDay < closes) return window;
    if (opens > closes && minuteOfDay >= opens) return window;
  }
  return null;
}

export function evaluateShopStatus(date: Date, schedule: ShopSchedule): ShopStatus {
  const local = getZonedDateParts(date, schedule.timeZone);
  const localDateKey = dateKeyFromParts(local);
  const minuteOfDay = local.hour * 60 + local.minute;
  const todayWindow = activeWindow(windowsForDate(schedule, local), minuteOfDay);

  if (todayWindow) {
    return {
      kind: "open",
      closesAt: todayWindow.closes,
      closesDayOffset:
        parseTime(todayWindow.opens) > parseTime(todayWindow.closes) ? 1 : 0,
      localDateKey,
    };
  }

  const yesterday = addCalendarDays(localDateKey, -1);
  const overnightFromYesterday = windowsForDate(schedule, yesterday).find((window) => {
    const opens = parseTime(window.opens);
    const closes = parseTime(window.closes);
    return opens > closes && minuteOfDay < closes;
  });

  if (overnightFromYesterday) {
    return {
      kind: "open",
      closesAt: overnightFromYesterday.closes,
      closesDayOffset: 0,
      localDateKey,
    };
  }

  for (let dayOffset = 0; dayOffset <= 8; dayOffset += 1) {
    const candidate = addCalendarDays(localDateKey, dayOffset);
    const candidates = [...windowsForDate(schedule, candidate)].sort(
      (left, right) => parseTime(left.opens) - parseTime(right.opens),
    );

    for (const window of candidates) {
      if (dayOffset === 0 && parseTime(window.opens) <= minuteOfDay) continue;
      return {
        kind: "closed",
        localDateKey,
        nextOpening: {
          opensAt: window.opens,
          dayOffset,
          weekday: candidate.weekday,
          dateKey: dateKeyFromParts(candidate),
        },
      };
    }
  }

  return { kind: "closed", localDateKey, nextOpening: null };
}

const parseDateKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
};

export function calendarDayDifference(leftDateKey: string, rightDateKey: string): number {
  return Math.round((parseDateKey(leftDateKey) - parseDateKey(rightDateKey)) / millisecondsPerDay);
}

export function formatWorldClock(
  date: Date,
  clock: WorldClockConfig,
  homeTimeZone: string,
): FormattedWorldClock {
  const dateKey = dateKeyInTimeZone(date, clock.timeZone);
  const homeDateKey = dateKeyInTimeZone(date, homeTimeZone);
  const difference = calendarDayDifference(dateKey, homeDateKey);
  const localDate = cachedFormatter("world-date", clock.timeZone, {
    day: "numeric",
    month: "short",
  }).format(date);

  const relativeDay =
    difference === -1
      ? "Yesterday"
      : difference === 1
        ? "Tomorrow"
        : difference < -1
          ? `${Math.abs(difference)} days behind`
          : difference > 1
            ? `${difference} days ahead`
            : null;

  return {
    time: cachedFormatter("world-time", clock.timeZone, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date),
    dateKey,
    dateNote: relativeDay ? `${relativeDay} · ${localDate}` : null,
  };
}

export function deterministicDailyIndex(dateKey: string, length: number): number {
  if (length < 1) return 0;
  const dayNumber = Math.floor(parseDateKey(dateKey) / millisecondsPerDay);
  return ((dayNumber % length) + length) % length;
}
