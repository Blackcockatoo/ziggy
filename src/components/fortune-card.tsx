import Image from "next/image";
import { artwork } from "@/content/artwork";
import { categoryLabel } from "@/content/fortunes/categories";
import type { FortuneTicket } from "@/content/fortunes/types";

/**
 * The printed ticket.
 *
 * A small physical thing: aged cream stock, black ink, a narrow ruled border,
 * a Ziggy seal, a serial and a date. The answer is the hero and everything
 * else is small print around it.
 *
 * It carries its own light colours rather than inheriting the room's, so it
 * looks like paper on the dark cabinet *and* prints correctly on white without
 * depending on a dark background being rendered.
 */
export function FortuneCard({
  ticket,
  issuedOn,
}: {
  ticket: FortuneTicket;
  issuedOn: string;
}) {
  return (
    <article className="fortune-card" data-mood={ticket.mood}>
      <div className="fortune-card__rule" aria-hidden="true" />

      <header className="fortune-card__head">
        <Image
          className="fortune-card__seal"
          src={artwork.seal.src}
          width={artwork.seal.width}
          height={artwork.seal.height}
          sizes="56px"
          alt=""
          aria-hidden="true"
          quality={82}
        />
        <div>
          <p className="fortune-card__brand">Ask Ziggy</p>
          <p className="fortune-card__sub">The Monkey Shop · Frankston</p>
        </div>
      </header>

      <p className="fortune-card__question">“{ticket.question}”</p>

      <h3 className="fortune-card__says">Ziggy says</h3>
      <strong className="fortune-card__answer">{ticket.answer}</strong>
      <p className="fortune-card__kicker">{ticket.kicker}</p>

      <dl className="fortune-card__meta">
        <div>
          <dt>Issued</dt>
          <dd>{issuedOn}</dd>
        </div>
        <div>
          <dt>Drawer</dt>
          <dd>{categoryLabel(ticket.category)}</dd>
        </div>
        <div>
          <dt>Serial</dt>
          <dd className="fortune-card__serial">{ticket.serial}</dd>
        </div>
      </dl>

      <p className="fortune-card__smallprint">
        8 Thompson Street, Frankston · For entertainment · The monkey accepts no liability
      </p>
    </article>
  );
}
