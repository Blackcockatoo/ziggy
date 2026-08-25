"use client";

import type { WorldClockConfig } from "@/content/counter/types";
import { formatWorldClock } from "@/lib/counter-time";
import styles from "./counter-home.module.css";
import { useCounterTime } from "./counter-time-provider";

export function WorldClocks({ clocks }: { clocks: readonly WorldClockConfig[] }) {
  const now = useCounterTime();
  const homeTimeZone = clocks.find((clock) => clock.home)?.timeZone ?? "Australia/Melbourne";

  return (
    <section className={styles.module} aria-labelledby="world-clocks-title">
      <div className={styles.moduleHeading}>
        <div>
          <p className={styles.eyebrow}>Six clocks, no departure lounge</p>
          <h3 id="world-clocks-title" className={styles.moduleTitle}>
            Around the world
          </h3>
        </div>
        <p className={styles.localCalculation}>Calculated on your device</p>
      </div>
      <ul className={styles.clockGrid}>
        {clocks.map((clock) => {
          const formatted = now ? formatWorldClock(now, clock, homeTimeZone) : null;
          return (
            <li key={clock.id} data-home={clock.home ? "true" : "false"}>
              <p className={styles.clockCity}>{clock.city}</p>
              <time className={styles.clockTime} dateTime={now?.toISOString()}>
                {formatted?.time ?? "--:--"}
              </time>
              <p className={styles.clockDate}>
                {formatted?.dateNote ?? clock.note ?? "Same day as Frankston"}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
