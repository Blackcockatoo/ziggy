import type { CounterObject, Memory, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

const speakerLabels: Record<Memory["speakerRole"], string> = {
  rob: "Rob",
  carla: "Carla",
  staff: "Staff",
  customer: "Customer",
  local: "Local",
  unattributed: "Unattributed",
};

/**
 * The Counter.
 *
 * Objects on a counter; memories underneath them. Built on native
 * `<details name="counter">`, which gives exclusive-accordion behaviour,
 * keyboard support and screen-reader semantics with no JavaScript at all —
 * the room works completely with scripting disabled.
 *
 * A memory renders its `fragment` when one has been recorded and its `prompt`
 * when it has not. Nothing here is an invented testimonial.
 */
export function Counter({
  objects,
  memories,
  sources,
}: {
  objects: CounterObject[];
  memories: Memory[];
  sources: Source[];
}) {
  const loose = memories.filter((memory) => !memory.objectId);

  return (
    <MuseumSection
      id="counter"
      index="06"
      eyebrow="Thirty years of conversation"
      title="The Counter"
      intro="Pick something up. Everything on this counter has a story attached to it — or a question waiting to become one."
    >
      <div className="counter-scene">
        <ul className="counter-objects">
          {objects.map((object) => {
            const attached = memories.filter((memory) => memory.objectId === object.id);
            return (
              <li key={object.id}>
                <details name="counter" className="counter-object">
                  <summary>
                    <span className="counter-object__glyph" aria-hidden="true">
                      {object.glyph}
                    </span>
                    <span className="counter-object__label">{object.label}</span>
                    <span className="visually-hidden">
                      {object.name}. {attached.length} memories.
                    </span>
                  </summary>
                  <div className="counter-object__panel">
                    <p className="eyebrow">{object.name}</p>
                    <p className="counter-object__hint">{object.hint}</p>
                    <EvidencePill evidence={object.evidence} />
                    <ul className="memory-list">
                      {attached.map((memory) => (
                        <MemoryItem key={memory.id} memory={memory} sources={sources} />
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
        <div className="counter-scene__surface" aria-hidden="true" />
      </div>

      {loose.length > 0 ? (
        <div className="counter-loose">
          <h3>Not attached to anything yet</h3>
          <ul className="memory-list">
            {loose.map((memory) => (
              <MemoryItem key={memory.id} memory={memory} sources={sources} />
            ))}
          </ul>
        </div>
      ) : null}
    </MuseumSection>
  );
}

function MemoryItem({ memory, sources }: { memory: Memory; sources: Source[] }) {
  const recorded = Boolean(memory.fragment);

  return (
    <li className="memory" data-recorded={recorded ? "true" : "false"}>
      {recorded ? (
        <blockquote>“{memory.fragment}”</blockquote>
      ) : (
        <p className="memory__prompt">{memory.prompt}</p>
      )}
      <p className="memory__attribution">
        {memory.speaker ?? speakerLabels[memory.speakerRole]}
        {memory.era ? ` · ${memory.era}` : null}
        {recorded ? null : " · not yet recorded"}
      </p>
      <EvidencePill evidence={memory.evidence} />
      <SourceList sourceIds={memory.evidence.sourceIds} sources={sources} />
    </li>
  );
}
