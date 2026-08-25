"use client";

import type { ShopSchedule } from "@/content/counter/types";
import { evaluateShopStatus, formatScheduleTime } from "@/lib/counter-time";
import styles from "./counter-home.module.css";
import { useCounterTime } from "./counter-time-provider";

const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const sourceDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function ShopStatus({ name, schedule }: { name: string; schedule: ShopSchedule }) {
  const now = useCounterTime();
  const status = now ? evaluateShopStatus(now, schedule) : null;

  let headline = "Checking Melbourne time";
  let detail = "The listed regular hours will appear in a moment.";
  let state = "checking";

  if (status?.kind === "open") {
    headline = "Open";
    detail = `${name} is open until ${formatScheduleTime(status.closesAt)}${
      status.closesDayOffset ? " tomorrow" : ""
    }.`;
    state = "open";
  }

  if (status?.kind === "closed") {
    headline = "Closed";
    state = "closed";
    const next = status.nextOpening;
    if (!next) {
      detail = "No next opening is configured. Check the listed hours before heading in.";
    } else if (next.dayOffset === 0) {
      detail = `The shutters are still down. Back at ${formatScheduleTime(next.opensAt)}.`;
    } else if (next.dayOffset === 1) {
      detail = `Rob has escaped. Back tomorrow from ${formatScheduleTime(next.opensAt)}.`;
    } else {
      detail = `Rob has escaped. Back ${titleCase(next.weekday)} from ${formatScheduleTime(
        next.opensAt,
      )}.`;
    }
  }

  const checkedDate = sourceDateFormatter.format(
    new Date(`${schedule.source.checkedOn}T12:00:00Z`),
  );

  return (
    <section className={`${styles.module} ${styles.shopStatus}`} aria-labelledby="shop-status-title">
      <div className={styles.moduleHeading}>
        <p className={styles.eyebrow}>Shop status</p>
        <span className={styles.statusLamp} data-state={state} aria-hidden="true" />
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        <h3 id="shop-status-title" className={styles.statusHeadline} data-state={state}>
          {headline}
        </h3>
        <p className={styles.statusDetail}>{detail}</p>
      </div>
      <p className={styles.sourceNote}>
        {schedule.source.url ? (
          <a href={schedule.source.url}>{schedule.source.label}</a>
        ) : (
          schedule.source.label
        )}
        {` · checked ${checkedDate} · holiday hours may vary`}
      </p>
    </section>
  );
}
