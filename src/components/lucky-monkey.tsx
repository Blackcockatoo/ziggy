import type { LoreItem, MonkeyRecord, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MonkeySuccession } from "./monkey-succession";
import { MuseumSection } from "./museum-section";

/**
 * The Lucky Monkey.
 *
 * Specimen labels first, then the succession. The room is written as natural
 * history because that is the funniest accurate frame for what actually
 * happened: an ornament became a landmark and then a lineage.
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
      intro="A mascot became a landmark, then a family tree, then a theory of luck. The exhibition treats that folklore with the seriousness it deserves and the mischief it demands."
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
