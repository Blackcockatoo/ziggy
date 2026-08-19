import {
  categoryProfileById,
  categoryProfiles,
  fallbackCategory,
} from "@/content/fortunes/categories";
import type {
  Fortune,
  FortuneCategory,
  FortuneTicket,
} from "@/content/fortunes/types";

/**
 * The Ziggy machine.
 *
 * Deterministic by design: the same question always produces the same first
 * ticket, so Ziggy keeps his story straight and the site needs no server, no
 * model call and no network round trip. Pulling the lever again advances the
 * draw index, which is the only source of variation.
 *
 * Composition rule: draws past the first may pair an answer with a kicker
 * borrowed from another fortune in the same drawer, but only when both lines
 * are marked `open`. That is how a library of ~150 handwritten lines yields
 * several hundred distinct tickets without a single generated word.
 */

const WORD_BOUNDARY = /[^a-z0-9']+/;

function normalise(question: string): string {
  return question.trim().toLocaleLowerCase("en-AU");
}

/** FNV-style rolling hash. Stable across runtimes; that is the whole job. */
export function hashQuestion(question: string): number {
  return Array.from(normalise(question)).reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
}

/**
 * Scores a question against every drawer and returns the best match.
 *
 * Multi-word keywords match as substrings; single words must match a whole
 * token, so "local" does not fire on "locally" being absent from a sentence
 * about a lockdown. Longer keywords score higher, because they are more
 * specific. Ties break on {@link categoryProfiles} order, which keeps the
 * result deterministic.
 */
export function classifyQuestion(question: string): FortuneCategory {
  const normalised = normalise(question);
  if (!normalised) return fallbackCategory;

  const tokens = new Set(normalised.split(WORD_BOUNDARY).filter(Boolean));

  let best: { category: FortuneCategory; score: number } | null = null;

  for (const profile of categoryProfiles) {
    let score = 0;
    for (const keyword of profile.keywords) {
      const hit = keyword.includes(" ")
        ? normalised.includes(keyword)
        : tokens.has(keyword);
      if (hit) score += keyword.length;
    }
    if (score > 0 && (best === null || score > best.score)) {
      best = { category: profile.id, score };
    }
  }

  return best?.category ?? fallbackCategory;
}

function poolFor(
  library: Fortune[],
  category: FortuneCategory,
): { category: FortuneCategory; pool: Fortune[] } {
  const scoped = library.filter((fortune) => fortune.category === category);
  if (scoped.length > 0) return { category, pool: scoped };

  const fallback = library.filter(
    (fortune) => fortune.category === fallbackCategory,
  );
  if (fallback.length > 0) {
    return { category: fallbackCategory, pool: fallback };
  }

  return { category, pool: library };
}

/** `ZG-WRK-4F2A9-02` — drawer code, question hash, draw number. */
export function fortuneSerial(
  category: FortuneCategory,
  question: string,
  drawIndex: number,
): string {
  const code = categoryProfileById.get(category)?.code ?? "UNF";
  const stamp = hashQuestion(question).toString(36).toUpperCase().padStart(5, "0");
  return `ZG-${code}-${stamp}-${String(drawIndex + 1).padStart(2, "0")}`;
}

export type DrawOptions = {
  question: string;
  library?: Fortune[];
  /** 0 for the first pull of the lever, then 1, 2, 3… */
  drawIndex?: number;
};

/**
 * Selects, composes and stamps one ticket.
 *
 * @throws if the question is empty or the library has no usable fortunes.
 */
export function drawFortune({
  question,
  library = [],
  drawIndex = 0,
}: DrawOptions): FortuneTicket {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    throw new Error("Ziggy needs a question.");
  }
  if (library.length === 0) {
    throw new Error("At least one Ziggy fortune is required.");
  }

  const requested = classifyQuestion(cleanQuestion);
  const { category, pool } = poolFor(library, requested);

  // Re-hash per draw rather than stepping by a fixed stride: a stride that
  // shares a factor with the drawer size collapses into a short cycle, and the
  // drawers are not all the same size.
  const drawSeed = hashQuestion(`${cleanQuestion}#${drawIndex}`);
  const base = pool[drawSeed % pool.length];

  // Compositional rule: only remix on later draws, only within the drawer,
  // and only between lines whose halves are written to stand alone.
  let kickerSource = base;
  const remixable = pool.filter((fortune) => fortune.pairing !== "fixed");
  const shouldRemix =
    drawIndex > 0 && base.pairing !== "fixed" && remixable.length > 1 && drawSeed % 3 === 0;

  if (shouldRemix) {
    const candidates = remixable.filter((fortune) => fortune.id !== base.id);
    const kickerSeed = hashQuestion(`${cleanQuestion}#${drawIndex}#kicker`);
    kickerSource = candidates[kickerSeed % candidates.length];
  }

  const remixed = kickerSource.id !== base.id;

  return {
    question: cleanQuestion,
    category,
    answer: base.answer,
    kicker: kickerSource.kicker,
    mood: base.mood,
    serial: fortuneSerial(category, cleanQuestion, drawIndex),
    remixed,
    sourceIds: remixed ? [base.id, kickerSource.id] : [base.id],
  };
}
