import type { StoryPrompt } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";

export function CounterStories({ stories }: { stories: StoryPrompt[] }) {
  return (
    <MuseumSection
      id="counter"
      index="06"
      eyebrow="Thirty years of conversation"
      title="The Counter"
      intro="These are interview prompts, not invented testimonials. When the real fragments arrive, each card already has somewhere to live."
    >
      <div className="counter-scene">
        <div className="counter-scene__objects" aria-hidden="true">
          <span className="counter-object counter-object--paper">Paper</span>
          <span className="counter-object counter-object--key">Key</span>
          <span className="counter-object counter-object--ticket">Ticket</span>
          <span className="counter-object counter-object--bell">Bell</span>
        </div>
        <div className="story-grid">
          {stories.map((story) => (
            <article key={story.id} className="story-card">
              <p className="eyebrow">Oral history prompt</p>
              <h3>{story.title}</h3>
              {story.quote ? <blockquote>“{story.quote}”</blockquote> : <p>{story.prompt}</p>}
              {story.speaker ? <p className="story-card__speaker">— {story.speaker}</p> : null}
              <EvidencePill evidence={story.evidence} />
            </article>
          ))}
        </div>
      </div>
    </MuseumSection>
  );
}
