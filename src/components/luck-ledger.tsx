import type { LedgerEntry, Source } from "@/content/types";
import type { LotteryExclusion } from "@/content/wins";
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
  exclusions,
  sources,
}: {
  entries: LedgerEntry[];
  unplaced: LedgerEntry[];
  exclusions: LotteryExclusion[];
  sources: Source[];
}) {
  return (
    <MuseumSection
      id="ledger"
      index="02"
      eyebrow="Ten times lightning struck"
      title="The Luck Ledger"
      intro="All ten slots remain visible. Only the tenth is placed with confidence; recovered earlier wins stay separate until evidence proves their sequence."
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
          <p className="eyebrow">Confirmed / strongly supported — sequence unresolved</p>
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
                {entry.entry || entry.winnerLocality ? (
                  <p className="ledger-note__meta">
                    {[entry.entry, entry.winnerLocality].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                <EvidencePill evidence={entry.evidence} />
                {entry.evidence.note ? (
                  <p className="ledger-note__evidence">{entry.evidence.note}</p>
                ) : null}
                <SourceList sourceIds={entry.evidence.sourceIds} sources={sources} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {exclusions.length > 0 ? (
        <aside className="ledger-exclusions">
          <p className="eyebrow">Documented exclusions</p>
          <p>
            A winner living in Frankston is not evidence that the ticket came from 8
            Thompson Street.
          </p>
          <ul>
            {exclusions.map((entry) => (
              <li key={`${entry.date}-${entry.retailer}`}>
                <strong>{entry.date}</strong> · {entry.event} · {entry.retailer}
                <span>{entry.reason}</span>
                <SourceList sourceIds={entry.sourceIds} sources={sources} />
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </MuseumSection>
  );
}
