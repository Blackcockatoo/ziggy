import type { ExhibitionIdentity } from "@/content/types";
import { EvidencePill } from "./evidence-pill";

/**
 * The front window.
 *
 * A full-height shopfront after hours, with no navigation over the top of it —
 * the nav is a sibling further down the document, so it only arrives once the
 * visitor has walked past the glass.
 */
export function FrontWindow({ identity }: { identity: ExhibitionIdentity }) {
  return (
    <header id="top" className="front-window">
      <div className="front-window__grain" aria-hidden="true" />
      <div className="front-window__bulbs" aria-hidden="true">
        {Array.from({ length: 11 }, (_, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.18}s` }} />
        ))}
      </div>

      <p className="front-window__location">
        {identity.address.suburb}, {identity.address.state} · Est. 1996
      </p>

      <div className="front-window__title">
        <p>{identity.subtitle}</p>
        <h1>
          The <span>Monkey</span> Shop
        </h1>
      </div>

      <p className="front-window__manifesto">
        {identity.thesis[0]}
        <br />
        {identity.thesis[1]}
      </p>

      <a className="enter-link" href="#story">
        Enter the tribute <span aria-hidden="true">↓</span>
      </a>

      <aside className="mornings-counter">
        <p className="mornings-counter__number">
          <span>{identity.approximateMornings.display}</span> mornings
        </p>
        <p className="mornings-counter__caveat">
          Approximately thirty years of opening up. No exact first day is claimed or hidden
          inside the count.
        </p>
        <EvidencePill evidence={identity.approximateMornings.evidence} />
      </aside>

      <div className="front-window__stamp" aria-label="An unofficial digital tribute">
        <span>Made as a gift</span>
        <strong>1996—2026</strong>
        <span>Unofficial tribute</span>
      </div>
    </header>
  );
}
