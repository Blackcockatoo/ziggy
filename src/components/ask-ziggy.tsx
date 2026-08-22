"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { categoryProfiles } from "@/content/fortunes/categories";
import { fortunes } from "@/content/fortunes/library";
import type { FortuneTicket } from "@/content/fortunes/types";
import { drawFortune } from "@/lib/fortune-engine";
import { FortuneCard } from "./fortune-card";

const exampleQuestions = [
  "Should I leave Frankston?",
  "Will I get rich?",
  "Should I quit my job?",
  "Is it too late to apologise?",
];

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

type Issued = { ticket: FortuneTicket; issuedOn: string };

/**
 * Ask Ziggy.
 *
 * Ziggy is the exhibition's invented fortune-teller and narrator, not a claim
 * about the historical name of a physical shop monkey. Everything he says was
 * written by hand and lives in `src/content/fortunes` — the machine only
 * selects, composes and stamps. No model call, no network, no server.
 *
 * Accessibility notes:
 * - The lever is a real submit button; the cabinet is a real form.
 * - The slot is an `aria-live` region, so the fortune is announced when it
 *   arrives rather than only appearing.
 * - All the movement is decorative and disappears under reduced-motion.
 * - With JavaScript off, the `<noscript>` block still shows what Ziggy sounds
 *   like, so the room keeps its meaning.
 */
export function AskZiggy() {
  const questionId = useId();
  const [question, setQuestion] = useState("");
  const [issued, setIssued] = useState<Issued | null>(null);
  const [drawIndex, setDrawIndex] = useState(0);
  const [working, setWorking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleFortunes = useMemo(
    () => fortunes.filter((_, index) => index % 37 === 0).slice(0, 4),
    [],
  );

  const issue = useCallback((input: string, nextDrawIndex: number) => {
    const cleanQuestion = input.trim();
    if (!cleanQuestion) {
      inputRef.current?.focus();
      return;
    }

    const ticket = drawFortune({
      question: cleanQuestion,
      library: fortunes,
      drawIndex: nextDrawIndex,
    });

    setQuestion(cleanQuestion);
    setDrawIndex(nextDrawIndex);
    setIssued({ ticket, issuedOn: dateFormat.format(new Date()) });
    setWorking(true);
    window.setTimeout(() => setWorking(false), 700);
  }, []);

  const printTicket = useCallback(() => {
    document.body.dataset.printing = "fortune";
    const clear = () => {
      delete document.body.dataset.printing;
      window.removeEventListener("afterprint", clear);
    };
    window.addEventListener("afterprint", clear);
    window.print();
  }, []);

  const [copied, setCopied] = useState(false);
  const copyTicket = useCallback(async () => {
    if (!issued) return;
    const text = [
      "ZIGGY SAYS",
      `“${issued.ticket.question}”`,
      issued.ticket.answer,
      issued.ticket.kicker,
      `${issued.ticket.serial} · ${issued.issuedOn} · The Monkey Shop, 8 Thompson Street, Frankston`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }, [issued]);

  return (
    <section id="ask-ziggy" className="ziggy-room" aria-labelledby="ask-ziggy-title">
      <div className="ziggy-room__intro">
        <p className="section-heading__index" aria-hidden="true">
          04
        </p>
        <div>
          <p className="eyebrow">A digital penny arcade</p>
          <h2 id="ask-ziggy-title">Ask Ziggy</h2>
          <p className="section-heading__intro">
            Handwritten fortunes, deterministic answers, and no chatbot pretending to be
            local folklore. Ziggy belongs to the exhibition; Archie and Ziggie belong to
            the historical record. Ask the same question twice and Ziggy keeps his story
            straight. Pull again and he elaborates.
          </p>
        </div>
      </div>

      <div className="fortune-machine" data-working={working ? "true" : "false"}>
        <div className="fortune-machine__bulbs" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.11}s` }} />
          ))}
        </div>

        <div className="fortune-machine__top" aria-hidden="true">
          <span>Fortunes</span>
          <strong>Ziggy</strong>
          <span>One question</span>
        </div>

        <div className="fortune-machine__cabinet">
          <div className="fortune-machine__glass">
            <div
              className="fortune-machine__portrait"
              role="img"
              aria-label="Artwork space reserved for Ziggy inside the cabinet glass"
            >
              <span className="fortune-machine__eyes" aria-hidden="true">
                ● ●
              </span>
              <span className="fortune-machine__portrait-label">Portrait to come</span>
            </div>
            <ul className="fortune-machine__dial" aria-hidden="true">
              {categoryProfiles.map((profile) => (
                <li
                  key={profile.id}
                  data-active={issued?.ticket.category === profile.id ? "true" : "false"}
                >
                  {profile.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="fortune-machine__controls">
            <form
              className="fortune-form"
              onSubmit={(event) => {
                event.preventDefault();
                issue(question, 0);
              }}
            >
              <label htmlFor={questionId}>Insert question</label>
              <div className="fortune-form__controls">
                <input
                  id={questionId}
                  ref={inputRef}
                  value={question}
                  maxLength={140}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Should I…?"
                  autoComplete="off"
                  enterKeyHint="go"
                />
                <button type="submit" className="fortune-lever">
                  <span className="fortune-lever__knob" aria-hidden="true" />
                  Pull
                </button>
              </div>
            </form>

            <div className="question-chips">
              <p id={`${questionId}-examples`} className="question-chips__label">
                Or borrow one:
              </p>
              <ul aria-labelledby={`${questionId}-examples`}>
                {exampleQuestions.map((example) => (
                  <li key={example}>
                    <button type="button" onClick={() => issue(example, 0)}>
                      {example}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="fortune-slot">
            <div className="fortune-slot__lip" aria-hidden="true" />
            <div className="fortune-slot__output" aria-live="polite" aria-atomic="true">
              {issued ? (
                <FortuneCard ticket={issued.ticket} issuedOn={issued.issuedOn} />
              ) : (
                <p className="fortune-slot__empty">Your fortune prints here.</p>
              )}
            </div>

            {issued ? (
              <div className="fortune-actions">
                <button type="button" onClick={() => issue(issued.ticket.question, drawIndex + 1)}>
                  Pull again
                </button>
                <button type="button" onClick={copyTicket}>
                  {copied ? "Copied" : "Copy"}
                </button>
                <button type="button" onClick={printTicket}>
                  Print card
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <noscript>
        <div className="ziggy-noscript">
          <p>
            The machine needs JavaScript to take your question. It does not need it to
            have opinions. A few, straight from the drawer:
          </p>
          <ul>
            {sampleFortunes.map((fortune) => (
              <li key={fortune.id}>
                <strong>{fortune.answer}</strong> {fortune.kicker}
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </section>
  );
}
