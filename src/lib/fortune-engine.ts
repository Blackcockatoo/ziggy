import type { Fortune, FortuneCategory } from "@/content/fortunes";

const categoryKeywords: Record<Exclude<FortuneCategory, "general">, string[]> = {
  money: ["money", "rich", "lotto", "ticket", "afford", "buy", "rent", "house"],
  love: ["love", "date", "marry", "partner", "girlfriend", "boyfriend", "relationship"],
  work: ["work", "job", "boss", "quit", "career", "meeting", "payday"],
  luck: ["luck", "lucky", "win", "chance", "odds", "tomorrow"],
  frankston: ["frankston", "thompson", "beach", "bay", "leave", "monkey shop"],
};

export function classifyQuestion(question: string): FortuneCategory {
  const normalized = question.toLocaleLowerCase("en-AU");
  const match = Object.entries(categoryKeywords).find(([, keywords]) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );

  return (match?.[0] as FortuneCategory | undefined) ?? "general";
}

export function hashQuestion(question: string): number {
  return Array.from(question.trim().toLocaleLowerCase("en-AU")).reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
}

export function getFortune(question: string, allFortunes: Fortune[]): Fortune {
  const category = classifyQuestion(question);
  const categoryFortunes = allFortunes.filter((fortune) => fortune.category === category);
  const pool = categoryFortunes.length > 0 ? categoryFortunes : allFortunes;

  if (pool.length === 0) {
    throw new Error("At least one Ziggy fortune is required.");
  }

  return pool[hashQuestion(question) % pool.length];
}
