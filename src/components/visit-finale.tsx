import { artwork } from "@/content/artwork";
import type { ExhibitionIdentity } from "@/content/types";
import { ZiggyArtwork } from "./ziggy-artwork";

/**
 * Come see the real thing.
 *
 * The exit. Its whole job is to move somebody from a screen to a footpath, so
 * it says the address, says the instruction, and stops.
 *
 * The after-hours cabinet sits behind it, used once and only here. The shop is
 * shut and Ziggy is still lit — which is the entire argument of the exhibition
 * in one photograph, and stops working the moment it is used twice.
 */
export function VisitFinale({ identity }: { identity: ExhibitionIdentity }) {
  return (
    <footer id="visit" className="visit-finale">
      <div className="visit-finale__backdrop">
        <ZiggyArtwork
          artwork={artwork.cabinetAfterHours}
          sizes="100vw"
          decorative
        />
      </div>

      <div className="visit-finale__inner">
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
          Made as an unofficial gift · Nothing here requires a response, launch or next step ·
          Historical details remain subject to archive review · Ziggy artwork is interpretive,
          not archival.
        </p>
      </div>
    </footer>
  );
}
