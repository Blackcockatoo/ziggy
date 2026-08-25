"use client";

import type { DailyZiggyConfig } from "@/content/counter/types";
import type { Fortune } from "@/content/fortunes/types";
import { selectDailyZiggy } from "@/lib/daily-ziggy";
import styles from "./counter-home.module.css";
import { useCounterTime } from "./counter-time-provider";

export function ZiggyDaily({
  config,
  library,
}: {
  config: DailyZiggyConfig;
  library: readonly Fortune[];
}) {
  const now = useCounterTime();
  const message = now ? selectDailyZiggy(now, config, library) : null;

  return (
    <section className={`${styles.module} ${styles.ziggyDaily}`} aria-labelledby="ziggy-daily-title">
      <p className={styles.eyebrow}>Ziggy says</p>
      <h3 id="ziggy-daily-title" className={styles.visuallyHidden}>
        Today&apos;s Ziggy line
      </h3>
      <blockquote className={styles.dailyQuote}>
        {message?.line ?? "Ziggy is finding today’s slip…"}
      </blockquote>
      <p className={styles.dailyProvenance}>
        {message?.source === "owner"
          ? "Today’s shop-board message"
          : "From Ask Ziggy’s handwritten drawers"}
      </p>
      <a className={styles.textLink} href={config.deeperHref}>
        Ask him something <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
