import { artwork, boardExamples } from "@/content/artwork";
import type { BoardEntry, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";
import { ZiggyArtwork } from "./ziggy-artwork";

/**
 * Ziggy Says.
 *
 * The real, daily, documentary version of the shop's voice — and the room that
 * earns the fortune machine that follows it.
 *
 * The board artwork is a frame: every word on it is real HTML sitting on top,
 * so the lines are selectable, translatable, searchable and legible to a
 * screen reader. An empty board renders as an empty board.
 */
export function ZiggySays({
  entries,
  sources,
}: {
  entries: BoardEntry[];
  sources: Source[];
}) {
  return (
    <MuseumSection
      id="board"
      index="04"
      eyebrow="One line, in marker, every morning"
      title="Ziggy Says"
      intro="Before there was a machine, there was a whiteboard on an easel and somebody's handwriting. It was never archived, because nobody archives a whiteboard."
    >
      <div className="board-room">
        <figure className="board-room__scene">
          <ZiggyArtwork
            artwork={artwork.ziggyWithBoard}
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <figcaption>{artwork.ziggyWithBoard.description}</figcaption>
        </figure>

        <div className="board-room__copy">
          <p className="board-room__mark">
            <ZiggyArtwork
              artwork={artwork.badge}
              sizes="72px"
              decorative
            />
            <span className="visually-hidden">Ziggy Says, since 1996.</span>
          </p>
          <p>
            The board is the grounded thing. It is local, it is daily, it is written by
            a person who has to think of something, and it is aimed at whoever happens
            to walk past that morning. It has never once tried to be clever.
          </p>
          <p className="board-room__aside">
            Thirty years of these were wiped off at close of trade. Any photograph
            anybody kept is now a primary source.
          </p>
          <figure className="board-room__reference">
            <ZiggyArtwork
              artwork={artwork.boardFilled}
              sizes="(max-width: 900px) 60vw, 22vw"
            />
            <figcaption>{artwork.boardFilled.description}</figcaption>
          </figure>
        </div>
      </div>

      <h3 className="board-section__title">The archive</h3>
      <p className="board-section__lede">
        Every slot below is empty, and that is the true state of it. Not one line
        anybody has written on this board in thirty years was photographed, so the
        exhibition holds no authenticated transcription at all.
      </p>

      <ul className="board-grid">
        {entries.map((entry) => {
          const written = entry.line.length > 0;
          return (
            <li
              key={entry.id}
              className="board"
              data-kind="record"
              data-written={written ? "true" : "false"}
            >
              <div className="board__frame">
                <ZiggyArtwork
                  artwork={artwork.boardBlank}
                  className="board__surface"
                  sizes="(max-width: 680px) 90vw, (max-width: 1100px) 44vw, 30vw"
                  decorative
                />
                <div className="board__written">
                  {written ? (
                    <blockquote className="board__line">{entry.line}</blockquote>
                  ) : (
                    <p className="board__empty">
                      <span aria-hidden="true">—</span>
                      <span className="visually-hidden">An empty board.</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="board__meta">
                {entry.date ? <p className="board__date">{entry.date}</p> : null}
                {entry.flourish ? <p className="board__flourish">{entry.flourish}</p> : null}
                <EvidencePill evidence={entry.evidence} />
                {entry.evidence.note ? (
                  <p className="board__note">{entry.evidence.note}</p>
                ) : null}
                <SourceList sourceIds={entry.evidence.sourceIds} sources={sources} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="board-examples">
        <h3 className="board-section__title">Example artwork</h3>
        <p className="board-section__lede">
          These two are <strong>written for the exhibition</strong> to show what a
          full board looks like. They are artwork, not history: nobody wrote them
          on the real board, and they must never be quoted as something the shop
          said.
        </p>
        <ul className="board-grid">
          {boardExamples.map((example) => (
            <li key={example.id} className="board" data-kind="example">
              <div className="board__frame">
                <ZiggyArtwork
                  artwork={artwork.boardBlank}
                  className="board__surface"
                  sizes="(max-width: 680px) 90vw, (max-width: 1100px) 44vw, 30vw"
                  decorative
                />
                <div className="board__written">
                  <blockquote className="board__line">{example.line}</blockquote>
                </div>
                <p className="board__stamp">Example</p>
              </div>
              <div className="board__meta">
                {example.flourish ? (
                  <p className="board__flourish">{example.flourish}</p>
                ) : null}
                <span className="interpretive-pill">Exhibition artwork</span>
                <p className="board__note">{example.provenance}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MuseumSection>
  );
}
