import type { CounterLink } from "@/content/counter/types";
import styles from "./counter-home.module.css";

export function CounterLinks({ links }: { links: readonly CounterLink[] }) {
  if (links.length === 0) return null;

  return (
    <section className={styles.module} aria-labelledby="counter-links-title">
      <div className={styles.linksIntro}>
        <div>
          <p className={styles.eyebrow}>Useful official links</p>
          <h3 id="counter-links-title" className={styles.moduleTitle}>
            Lotto desk
          </h3>
        </div>
        <p>Previous winning strategy: there isn&apos;t one.</p>
      </div>
      <ul className={styles.officialLinks}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.href}>
              <strong>{link.label}</strong>
              <span>{link.description}</span>
              <small>{link.publisher} · official information</small>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
