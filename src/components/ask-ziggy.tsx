"use client";

import { useId, useState } from "react";
import { fortunes } from "@/content/fortunes";
import { getFortune } from "@/lib/fortune-engine";

const exampleQuestions = [
  "Should I quit my job?",
  "Will I get lucky?",
  "Should I leave Frankston?",
];

export function AskZiggy() {
  const questionId = useId();
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [fortuneId, setFortuneId] = useState<string | null>(null);
  const fortune = fortunes.find((item) => item.id === fortuneId);

  function ask(input: string) {
    const cleanQuestion = input.trim();
    if (!cleanQuestion) return;

    const nextFortune = getFortune(cleanQuestion, fortunes);
    setQuestion(cleanQuestion);
    setAskedQuestion(cleanQuestion);
    setFortuneId(nextFortune.id);
  }

  return (
    <section id="ask-ziggy" className="ziggy-room" aria-labelledby="ask-ziggy-title">
      <div className="ziggy-room__intro">
        <p className="section-heading__index" aria-hidden="true">
          05
        </p>
        <div>
          <p className="eyebrow">A digital penny arcade</p>
          <h2 id="ask-ziggy-title">Ask Ziggy</h2>
          <p>
            Handwritten fortunes, deterministic answers and no chatbot pretending to be local
            folklore. Ask the same question and Ziggy keeps his story straight.
          </p>
        </div>
      </div>

      <div className="fortune-machine">
        <div className="fortune-machine__top" aria-hidden="true">
          <span>Fortunes</span>
          <strong>Ziggy</strong>
          <span>One question</span>
        </div>
        <div className="fortune-machine__cabinet">
          <div className="fortune-machine__portrait" aria-label="Ziggy portrait artwork placeholder">
            <span className="fortune-machine__eyes" aria-hidden="true">● ●</span>
            <span className="fortune-machine__portrait-label">Portrait to come</span>
          </div>
          <form
            className="fortune-form"
            onSubmit={(event) => {
              event.preventDefault();
              ask(question);
            }}
          >
            <label htmlFor={questionId}>Insert question</label>
            <div className="fortune-form__controls">
              <input
                id={questionId}
                value={question}
                maxLength={140}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Should I…?"
                autoComplete="off"
              />
              <button type="submit">Ask</button>
            </div>
          </form>
          <div className="question-chips" aria-label="Example questions">
            {exampleQuestions.map((example) => (
              <button key={example} type="button" onClick={() => ask(example)}>
                {example}
              </button>
            ))}
          </div>
          <div className="fortune-slot" aria-live="polite" aria-atomic="true">
            {fortune ? (
              <article className="fortune-card">
                <p className="fortune-card__brand">Cignall Frankston presents</p>
                <p className="fortune-card__question">“{askedQuestion}”</p>
                <h3>Ziggy says</h3>
                <strong>{fortune.answer}</strong>
                <p>{fortune.kicker}</p>
                <span>For entertainment. The monkey accepts no liability.</span>
              </article>
            ) : (
              <p className="fortune-slot__empty">Your fortune will emerge here.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
