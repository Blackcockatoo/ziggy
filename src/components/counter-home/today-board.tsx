"use client";

import type { TodayBoardLink } from "@/content/counter/types";
import { dateKeyInTimeZone, formatCounterDate } from "@/lib/counter-time";
import styles from "./counter-home.module.css";
import { useCounterTime } from "./counter-time-provider";

export function TodayBoard({
  suburb,
  timeZone,
  links,
}: {
  suburb: string;
  timeZone: string;
  links: readonly TodayBoardLink[];
}) {
  const now = useCounterTime();
  const heading = now ? formatCounterDate(now, timeZone) : "TODAY · FRANKSTON";
  const dateTime = now ? dateKeyInTimeZone(now, timeZone) : undefined;

  return (
    <section className={styles.module} aria-labelledby="today-board-title">
      <p className={styles.eyebrow}>Today at the Monkey Shop</p>
      <h3 id="today-board-title" className={styles.todayDate}>
        <time dateTime={dateTime}>{heading}</time>
      </h3>
      <p className={styles.placeLine}>
        {suburb} · Melbourne time
      </p>
      <ul className={styles.todayLinks}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.href}>
              <span>{link.label}</span>
              <small>{link.detail}</small>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.dataPromise}>Live weather stays with the Bureau for now.</p>
    </section>
  );
}
