import type { FortuneTicket } from "@/content/fortunes/types";
import { categoryLabel } from "@/content/fortunes/categories";

/**
 * The printed ticket.
 *
 * Deliberately shaped like something that came out of a slot: brand line,
 * question, answer, kicker, then the small print — date, drawer and serial.
 * It is the shareable unit of the whole exhibition, so it carries the address.
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
      <p className="fortune-card__brand">The Monkey Shop · Frankston</p>
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
        8 Thompson Street, Frankston. For entertainment. The monkey accepts no liability.
      </p>
    </article>
  );
}
