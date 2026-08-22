"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { artwork } from "@/content/artwork";
import { categoryProfiles } from "@/content/fortunes/categories";
import { fortunes } from "@/content/fortunes/library";
import type { FortuneTicket } from "@/content/fortunes/types";
import { drawFortune } from "@/lib/fortune-engine";
import {
  machineStatus,
  sequenceFor,
  stateDurations,
  type MachineState,
} from "@/lib/machine-states";
import { FortuneCard } from "./fortune-card";
import { ZiggyArtwork } from "./ziggy-artwork";

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

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Ask Ziggy.
 *
 * The real Monkey Shop waiter monkey, thirty years of watching Frankston, and
 * a cabinet. Everything he says was written by hand and lives in
 * `src/content/fortunes` — the machine only selects, composes and stamps. No
 * model call, no network, no server.
 *
 * The cabinet is a mechanism rather than a form with a spinner. One pull runs
 * `idle → waking → thinking → issuing → revealed`; later pulls skip the wake.
 * The state drives CSS through `data-machine-state`, so the bulbs, the glass
 * and the tray all move off one source of truth.
 *
 * Accessibility:
 * - The ticket is drawn synchronously on submit. The animation only delays
 *   *display*, and under `prefers-reduced-motion: reduce` it is skipped
 *   entirely — reduced-motion users get the fortune immediately.
 * - The slot is a polite live region. While the machine works it announces
 *   what the machine is doing, which is information, not decoration.
 * - The lever is a real submit button, the field has a real label, and the
 *   fortune is real text. The artwork is a layer behind all of it.
 * - With JavaScript off, the `<noscript>` block still shows Ziggy's voice.
 */
export function AskZiggy() {
  const questionId = useId();
  const [question, setQuestion] = useState("");
  const [issued, setIssued] = useState<Issued | null>(null);
  const [pending, setPending] = useState<Issued | null>(null);
  const [drawIndex, setDrawIndex] = useState(0);
  const [state, setState] = useState<MachineState>("idle");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const sampleFortunes = useMemo(
    () => fortunes.filter((_, index) => index % 37 === 0).slice(0, 4),
    [],
  );

  const issue = useCallback(
    (input: string, nextDrawIndex: number) => {
      const cleanQuestion = input.trim();
      if (!cleanQuestion) {
        inputRef.current?.focus();
        return;
      }

      // The fortune exists before any animation does. Nothing below can change
      // what it says; the sequence only decides when it becomes visible.
      const ticket = drawFortune({
        question: cleanQuestion,
        library: fortunes,
        drawIndex: nextDrawIndex,
      });
      const next: Issued = { ticket, issuedOn: dateFormat.format(new Date()) };

      clearTimers();
      setQuestion(cleanQuestion);
      setDrawIndex(nextDrawIndex);
      setCopied(false);

      if (prefersReducedMotion()) {
        setPending(null);
        setIssued(next);
        setState("revealed");
        return;
      }

      const firstPull = state === "idle";
      setIssued(null);
      setPending(next);

      let elapsed = 0;
      const steps = sequenceFor(firstPull);
      steps.forEach((step) => {
        timers.current.push(
          window.setTimeout(() => setState(step), elapsed),
        );
        elapsed += stateDurations[step];
      });
      timers.current.push(
        window.setTimeout(() => {
          setPending(null);
          setIssued(next);
          setState("revealed");
        }, elapsed),
      );
    },
    [clearTimers, state],
  );

  const printTicket = useCallback(() => {
    document.body.dataset.printing = "fortune";
    const clear = () => {
      delete document.body.dataset.printing;
      window.removeEventListener("afterprint", clear);
    };
    window.addEventListener("afterprint", clear);
    window.print();
  }, []);

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

  const working = state === "waking" || state === "thinking" || state === "issuing";
  const activeCategory = (issued ?? pending)?.ticket.category;

  return (
    <section id="ask-ziggy" className="ziggy-room" aria-labelledby="ask-ziggy-title">
      <div className="ziggy-room__ambient" aria-hidden="true">
        <ZiggyArtwork
          artwork={artwork.oraclePortrait}
          sizes="100vw"
          decorative
        />
      </div>

      <div className="ziggy-room__intro">
        <p className="section-heading__index" aria-hidden="true">
          05
        </p>
        <div>
          <p className="eyebrow">The exhibition&apos;s Monkey Shop oracle</p>
          <h2 id="ask-ziggy-title">Ask Ziggy</h2>
          <p className="section-heading__intro">
            Handwritten fortunes, deterministic answers, and no chatbot pretending to be
            local folklore. Ask the same question twice and Ziggy keeps his story
            straight. Pull the lever again and he elaborates.
          </p>
        </div>
        <figure className="ziggy-room__plate">
          <ZiggyArtwork
            artwork={artwork.trayTicket}
            sizes="(max-width: 900px) 60vw, 22vw"
          />
          <figcaption>{artwork.trayTicket.description}</figcaption>
        </figure>
      </div>

      <div className="fortune-machine" data-machine-state={state}>
        <div className="fortune-machine__bulbs" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index} style={{ ["--bulb" as string]: String(index) }} />
          ))}
        </div>

        <div className="fortune-machine__top" aria-hidden="true">
          <span>Fortune</span>
          <strong>Ziggy</strong>
          <span>Wisdom</span>
        </div>

        <div className="fortune-machine__cabinet">
          <div className="fortune-machine__glass">
            {/*
              The cutout, not the photographed cabinet: the photographs carry
              their own painted ASK ZIGGY signage, which would collide with the
              real heading above. This way the artwork supplies the figure and
              the HTML supplies every word.
            */}
            <div className="fortune-machine__scene">
              <div className="fortune-machine__interior" aria-hidden="true" />
              <ZiggyArtwork
                artwork={artwork.ziggyWithTray}
                className="fortune-machine__ziggy"
                sizes="(max-width: 780px) 70vw, 30vw"
              />
              <div className="fortune-machine__shelf" aria-hidden="true" />
              <div className="fortune-machine__glare" aria-hidden="true" />
            </div>

            <p className="fortune-machine__plate" aria-hidden="true">
              {state === "idle"
                ? "Ask your question"
                : state === "revealed"
                  ? "The monkey knows"
                  : machineStatus[state]}
            </p>

            <ul className="fortune-machine__dial" aria-hidden="true">
              {categoryProfiles.map((profile) => (
                <li
                  key={profile.id}
                  data-active={activeCategory === profile.id ? "true" : "false"}
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
                <button type="submit" className="fortune-lever" disabled={working}>
                  <span className="fortune-lever__knob" aria-hidden="true" />
                  {working ? "Working" : "Pull"}
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
                    <button type="button" onClick={() => issue(example, 0)} disabled={working}>
                      {example}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The tray is the delivery device, exactly as it is on the statue. */}
          <div className="fortune-tray">
            <div className="fortune-tray__rim" aria-hidden="true" />
            <div className="fortune-tray__surface" aria-live="polite" aria-atomic="true">
              {issued ? (
                <FortuneCard ticket={issued.ticket} issuedOn={issued.issuedOn} />
              ) : working ? (
                <p className="fortune-tray__status">{machineStatus[state]}</p>
              ) : (
                <p className="fortune-tray__empty">
                  Ziggy will put your fortune on the tray.
                </p>
              )}
            </div>

            {issued ? (
              <div className="fortune-actions">
                <button
                  type="button"
                  onClick={() => issue(issued.ticket.question, drawIndex + 1)}
                >
                  Pull again
                </button>
                <button type="button" onClick={copyTicket}>
                  {copied ? "Copied" : "Copy"}
                </button>
                <button type="button" onClick={printTicket}>
                  Print ticket
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
