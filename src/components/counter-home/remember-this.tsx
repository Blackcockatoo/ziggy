"use client";

import { useState } from "react";
import type { NostalgiaEntry } from "@/content/counter/types";
import { dateKeyInTimeZone, deterministicDailyIndex } from "@/lib/counter-time";
import styles from "./counter-home.module.css";
import { useCounterTime } from "./counter-time-provider";

export function RememberThis({ entries }: { entries: readonly NostalgiaEntry[] }) {
  const now = useCounterTime();
  const [offset, setOffset] = useState(0);
  const [remembered, setRemembered] = useState(false);
  const baseIndex = now
    ? deterministicDailyIndex(dateKeyInTimeZone(now, "Australia/Melbourne"), entries.length)
    : 0;
  const entry = entries[(baseIndex + offset) % entries.length];

  if (!entry) return null;

  return (
    <section className={styles.module} aria-labelledby="remember-this-title">
      <div className={styles.moduleHeading}>
        <div>
          <p className={styles.eyebrow}>Lightly rotated local memory</p>
          <h3 id="remember-this-title" className={styles.moduleTitle}>
            Remember this?
          </h3>
        </div>
        <p className={styles.nostalgiaEra}>{entry.yearOrEra}</p>
      </div>
      <div className={styles.nostalgiaBody} aria-live="polite">
        <p className={styles.nostalgiaTitle}>{entry.title}</p>
        <p className={styles.nostalgiaDescription}>{entry.description}</p>
      </div>
      <div className={styles.nostalgiaActions}>
        <button
          type="button"
          className={styles.counterButton}
          aria-pressed={remembered}
          onClick={() => setRemembered((value) => !value)}
        >
          {remembered ? "Knew it." : "Bloody hell, yes."}
        </button>
        {entries.length > 1 ? (
          <button
            type="button"
            className={styles.quietButton}
            onClick={() => {
              setOffset((value) => (value + 1) % entries.length);
              setRemembered(false);
            }}
          >
            Another one <span aria-hidden="true">→</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
