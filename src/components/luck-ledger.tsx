import type { LedgerEntry, Source } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";
import { SourceList } from "./source-list";

/**
 * The Luck Ledger.
 *
 * Ten rows, one per Division One win. Nine are incomplete on purpose: an empty
 * archival record is a statement, and it is a more useful one than a guess.
 * The `data-complete` attribute is what the tests read.
 */
export function LuckLedger({
  entries,
  unplaced,
  sources,
}: {
  entries: LedgerEntry[];
  unplaced: LedgerEntry[];
  sources: Source[];
}) {
  return (
    <MuseumSection
      id="ledger"
      index="02"
      eyebrow="Ten times lightning struck"
      title="The Luck Ledger"
      intro="All ten slots exist now. Nine stay responsibly blank until draw records and shop material put a date and a story against each number."
    >
      <div className="ledger">
        <div className="ledger__head" aria-hidden="true">
          <span>No.</span>
          <span>Draw</span>
          <span>Prize</span>
          <span>Record</span>
          <span>Status</span>
        </div>
        <ol className="ledger__rows">
          {entries.map((entry) => {
            const complete = Boolean(entry.date && entry.prize);
            return (
              <li
                key={entry.number}
                className="ledger__row"
                data-complete={complete ? "true" : "false"}
              >
                <strong className="ledger__number">
                  {String(entry.number).padStart(2, "0")}
                </strong>
                <div className="ledger__cell">
                  <span className="ledger__mobile-label">Draw</span>
                  {entry.date ? (
                    <>
                      <strong>{entry.game}</strong>
                      <span>{entry.date}</span>
                      <span>Draw {entry.draw}</span>
                    </>
                  ) : (
                    <span className="ledger__unknown">To be found</span>
                  )}
                </div>
                <div className="ledger__cell">
                  <span className="ledger__mobile-label">Prize</span>
                  {entry.prize ? (
                    <>
                      <strong>{entry.prize}</strong>
                      <span>{entry.entry}</span>
                      {entry.winnerLocality ? <span>{entry.winnerLocality}</span> : null}
                    </>
                  ) : (
                    <span className="ledger__unknown">Archive slot</span>
                  )}
                </div>
                <div className="ledger__cell ledger__cell--story">
                  <span className="ledger__mobile-label">Record</span>
                  <p>{entry.story ?? entry.evidence.note}</p>
                  {entry.quote ? (
                    <blockquote>
                      “{entry.quote}”
                      {entry.quoteAttribution ? <cite>{entry.quoteAttribution}</cite> : null}
                    </blockquote>
                  ) : null}
                  {complete ? (
                    <SourceList sourceIds={entry.evidence.sourceIds} sources={sources} />
                  ) : null}
                </div>
                <div className="ledger__cell">
                  <span className="ledger__mobile-label">Status</span>
                  <EvidencePill evidence={entry.evidence} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {unplaced.length > 0 ? (
        <aside className="ledger-note">
          <p className="eyebrow">Confirmed, sequence pending</p>
          <p>
            These wins are sourced, but nothing yet says where they sit in the run of ten.
            Assigning them a number would be a guess, so they wait here instead.
          </p>
          <ul>
            {unplaced.map((entry) => (
              <li key={`${entry.game}-${entry.draw}`}>
                <strong>{entry.prize}</strong> · {entry.game} draw {entry.draw} ·{" "}
                {entry.date}
                {entry.story ? <p>{entry.story}</p> : null}
                <SourceList sourceIds={entry.evidence.sourceIds} sources={sources} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </MuseumSection>
  );
}
