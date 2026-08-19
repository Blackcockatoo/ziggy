import type { ReactNode } from "react";

type MuseumSectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "paper" | "ink" | "red";
  children: ReactNode;
};

export function MuseumSection({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "paper",
  children,
}: MuseumSectionProps) {
  return (
    <section id={id} className={`museum-section museum-section--${tone}`}>
      <div className="museum-section__inner">
        <header className="section-heading">
          <p className="section-heading__index" aria-hidden="true">
            {index}
          </p>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            {intro ? <p className="section-heading__intro">{intro}</p> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
