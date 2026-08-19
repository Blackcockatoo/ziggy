export function VisitFinale() {
  return (
    <footer id="visit" className="visit-finale">
      <div className="visit-finale__monkey" aria-hidden="true">
        <span>● ●</span>
      </div>
      <p className="eyebrow">The exhibition ends. The shop does not.</p>
      <h2>Come see the real thing.</h2>
      <address>
        <strong>8 Thompson Street</strong>
        <span>Frankston, Victoria</span>
      </address>
      <a
        href="https://www.google.com/maps/search/?api=1&query=8+Thompson+Street+Frankston+Victoria"
        target="_blank"
        rel="noreferrer"
      >
        Get directions <span aria-hidden="true">↗</span>
      </a>
      <p className="visit-finale__last-line">Look for the monkey.</p>
      <p className="visit-finale__credit">
        A working digital exhibition scaffold · Historical details remain subject to archive review.
      </p>
    </footer>
  );
}
