import { artwork } from "@/content/artwork";
import { ZiggyArtwork } from "./ziggy-artwork";

/**
 * The thirtieth-anniversary plate.
 *
 * A commemorative poster, framed and labelled as one. It is deliberately a
 * plate rather than a hero: the exhibition's argument is the timeline, and a
 * celebration image should not be allowed to take that job.
 *
 * The poster shows illustrated people. The caption says so, because an
 * unlabelled illustration of a workforce is exactly the kind of thing that
 * gets mistaken for a photograph of one.
 */
export function Commemorative() {
  const poster = artwork.anniversaryPoster;

  return (
    <aside className="commemorative" aria-labelledby="commemorative-title">
      <figure className="commemorative__inner">
        <div className="commemorative__frame">
          <ZiggyArtwork artwork={poster} sizes="(max-width: 900px) 80vw, 32vw" />
        </div>
        <figcaption className="commemorative__copy">
          <p className="eyebrow">Commemorative artwork · 2026</p>
          <h2 id="commemorative-title">Thirty years, and the tenth one landed in the same month.</h2>
          <p>{poster.description}</p>
          <p className="commemorative__note">
            Interpretive artwork, not archive material. The people shown are
            illustrations rather than documented portraits, and this poster is not
            evidence of who worked in the shop or when.
          </p>
        </figcaption>
      </figure>
    </aside>
  );
}
