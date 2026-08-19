export function FrontWindow() {
  return (
    <header id="top" className="front-window">
      <div className="front-window__grain" aria-hidden="true" />
      <p className="front-window__location">Frankston, Victoria · Est. 1996</p>
      <div className="front-window__title">
        <p>Thirty years behind the counter</p>
        <h1>
          The <span>Monkey</span> Shop
        </h1>
      </div>
      <p className="front-window__manifesto">
        Some businesses trade in Frankston.
        <br />
        Some become part of Frankston.
      </p>
      <a className="enter-link" href="#story">
        Enter the exhibition <span aria-hidden="true">↓</span>
      </a>
      <div className="front-window__stamp" aria-label="A digital exhibition, working archive">
        <span>A digital exhibition</span>
        <strong>1996—2026</strong>
        <span>Working archive</span>
      </div>
    </header>
  );
}
