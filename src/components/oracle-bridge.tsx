import { artwork } from "@/content/artwork";
import { oracleBridge } from "@/content/board";
import { ZiggyArtwork } from "./ziggy-artwork";

/**
 * The hinge.
 *
 * Board → machine. The one place the exhibition says out loud why a
 * tobacconist's ornament ended up as a fortune teller: the voice came first,
 * and the cabinet is only the theatrical version of it.
 */
export function OracleBridge() {
  return (
    <section className="bridge" aria-labelledby="bridge-title">
      <div className="bridge__inner">
        <figure className="bridge__figure">
          <ZiggyArtwork
            artwork={artwork.cabinetFull}
            sizes="(max-width: 900px) 70vw, 34vw"
          />
        </figure>
        <div className="bridge__copy">
          <p className="eyebrow">{oracleBridge.eyebrow}</p>
          <h2 id="bridge-title">{oracleBridge.line}</h2>
          <p>{oracleBridge.body}</p>
          <a className="bridge__cta" href="#ask-ziggy">
            {oracleBridge.callToAction} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
