import type { ExhibitionIdentity } from "@/content/types";

/**
 * Come see the real thing.
 *
 * The exit. Its whole job is to move somebody from a screen to a footpath, so
 * it says the address, says the instruction, and stops.
 */
export function VisitFinale({ identity }: { identity: ExhibitionIdentity }) {
  return (
    <footer id="visit" className="visit-finale">
      <div className="visit-finale__monkey" aria-hidden="true">
        <span>● ●</span>
      </div>
      <p className="eyebrow">The exhibition ends. The shop does not.</p>
      <h2>Come see the real thing.</h2>
      <address>
        <strong>{identity.address.line}</strong>
        <span>
          {identity.address.suburb}, {identity.address.state}
        </span>
      </address>
      <a href={identity.address.mapUrl} target="_blank" rel="noreferrer">
        Get directions <span aria-hidden="true">↗</span>
      </a>
      <p className="visit-finale__last-line">Look for the monkey.</p>
      <p className="visit-finale__credit">
        A working digital exhibition · Historical details remain subject to archive review.
      </p>
    </footer>
  );
}
