import type { LedgerEntry } from "@/content/types";
import { EvidencePill } from "./evidence-pill";
import { MuseumSection } from "./museum-section";

export function LuckLedger({ entries }: { entries: LedgerEntry[] }) {
  return (
    <MuseumSection
      id="ledger"
      index="03"
      eyebrow="Ten times lightning struck"
      title="The Luck Ledger"
      intro="All ten slots exist now. Nine remain responsibly blank until draw records and shop material put a date and story against each number."
    >
      <div className="ledger" role="table" aria-label="Ten Division One winning entries">
        <div className="ledger__head" role="row">
          <span role="columnheader">No.</span>
          <span role="columnheader">Draw</span>
          <span role="columnheader">Prize</span>
          <span role="columnheader">Story</span>
          <span role="columnheader">Status</span>
        </div>
        {entries.map((entry) => (
          <article className="ledger__row" role="row" key={entry.number}>
            <strong role="cell" className="ledger__number">
              {String(entry.number).padStart(2, "0")}
            </strong>
            <div role="cell">
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
            <div role="cell">
              <span className="ledger__mobile-label">Prize</span>
              {entry.prize ? (
                <>
                  <strong>{entry.prize}</strong>
                  <span>{entry.entry}</span>
                </>
              ) : (
                <span className="ledger__unknown">Archive slot</span>
              )}
            </div>
            <p role="cell">{entry.story ?? entry.evidence.note}</p>
            <div role="cell">
              <EvidencePill evidence={entry.evidence} />
            </div>
          </article>
        ))}
      </div>
      <aside className="ledger-note">
        <p className="eyebrow">Confirmed, sequence pending</p>
        <p>
          The 8 January 2022 TattsLotto Division One entry worth $1 million is sourced, but its
          exact place within wins 1–9 has not been assumed.
        </p>
      </aside>
    </MuseumSection>
  );
}
