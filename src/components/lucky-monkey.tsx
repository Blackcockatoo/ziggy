import type { LoreItem, MonkeyRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MonkeySuccession } from "./monkey-succession";
import { MuseumSection } from "./museum-section";

/**
 * The Lucky Monkey.
 *
 * Specimen labels first, then the historical name record. The room borrows
 * natural-history language because an ornament became a landmark and then a
 * body of folklore. It deliberately stops short of inventing a genealogy.
 */
export function LuckyMonkey({
  lore,
  monkeys,
  sources,
}: {
  lore: LoreItem[];
  monkeys: MonkeyRecord[];
  sources: Source[];
}) {
  return (
    <MuseumSection
      id="monkey"
      index="03"
      eyebrow="An accidental civic species"
      title="The Lucky Monkey"
      intro="A mascot became a landmark, then a story larger than the object itself. The exhibition treats that folklore with the seriousness it deserves and the mischief it demands — without pretending the surviving record gives us a neat family tree."
      tone="ink"
    >
      <div className="specimen-grid">
        {lore.map((item) => (
          <article key={item.id} className="specimen-card">
            <p className="specimen-card__label">{item.label}</p>
            <h3>{item.value}</h3>
            <p>{item.body}</p>
            <EvidencePill evidence={item.evidence} />
          </article>
        ))}
      </div>

      <blockquote className="display-quote">
        “Look for the monkey” is better wayfinding than a logo could ever be.
      </blockquote>

      <MonkeySuccession monkeys={monkeys} sources={sources} />
    </MuseumSection>
  );
}
