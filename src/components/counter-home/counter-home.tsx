import type { ReactNode } from "react";
import { counterModules } from "@/content/counter/modules";
import { nostalgiaEntries } from "@/content/counter/nostalgia";
import { shopDetails } from "@/content/counter/shop-details";
import type { CounterModuleId } from "@/content/counter/types";
import { todayBoardLinks, usefulLinks } from "@/content/counter/useful-links";
import { worldClocks } from "@/content/counter/world-clocks";
import { dailyZiggy } from "@/content/counter/ziggy-daily";
import { fortunes } from "@/content/fortunes/library";
import { CounterLinks } from "./counter-links";
import styles from "./counter-home.module.css";
import { CounterTimeProvider } from "./counter-time-provider";
import { RememberThis } from "./remember-this";
import { ShopStatus } from "./shop-status";
import { TodayBoard } from "./today-board";
import { WorldClocks } from "./world-clocks";
import { ZiggyDaily } from "./ziggy-daily";

const fortunesById = new Map(fortunes.map((fortune) => [fortune.id, fortune]));
const dailyFortunes = dailyZiggy.fortuneIds.flatMap((id) => {
  const fortune = fortunesById.get(id);
  return fortune ? [fortune] : [];
});

const moduleRegistry: Record<CounterModuleId, () => ReactNode> = {
  "shop-status": () => (
    <ShopStatus name={shopDetails.name} schedule={shopDetails.schedule} />
  ),
  "today-board": () => (
    <TodayBoard
      suburb={shopDetails.address.suburb}
      timeZone={shopDetails.schedule.timeZone}
      links={todayBoardLinks}
    />
  ),
  "world-clocks": () => <WorldClocks clocks={worldClocks} />,
  "ziggy-daily": () => <ZiggyDaily config={dailyZiggy} library={dailyFortunes} />,
  "remember-this": () => <RememberThis entries={nostalgiaEntries} />,
  "useful-links": () => <CounterLinks links={usefulLinks} />,
};

/** The fast, everyday front door. The documentary Counter remains deeper below. */
export function CounterHome() {
  return (
    <section
      id="daily-counter"
      className={styles.counterHome}
      aria-labelledby="daily-counter-title"
      data-counter-layout="adaptive"
    >
      <div className={styles.counterGrain} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.counterHeader}>
          <div>
            <p className={styles.counterKicker}>8 Thompson Street · useful today</p>
            <h2 id="daily-counter-title">The Counter</h2>
          </div>
          <p className={styles.counterIntro}>
            The handy bit up front. The thirty years of accumulated madness is just behind it.
          </p>
        </header>

        <CounterTimeProvider>
          <div className={styles.moduleGrid}>
            {counterModules
              .filter((module) => module.enabled)
              .map((module) => (
                <div
                  key={module.id}
                  className={styles.moduleSlot}
                  data-counter-module={module.id}
                  data-size={module.size}
                >
                  {moduleRegistry[module.id]()}
                </div>
              ))}
          </div>
        </CounterTimeProvider>

        <footer className={styles.archiveThreshold}>
          <div>
            <p className={styles.counterKicker}>Behind the counter</p>
            <p>Thirty years of luck, people, objects, stories and one very patient monkey.</p>
          </div>
          <a href="#story">
            Wander into the exhibition <span aria-hidden="true">→</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
