import { describe, expect, it } from "vitest";
import { fortunes } from "../src/content/fortunes";
import { classifyQuestion, getFortune, hashQuestion } from "../src/lib/fortune-engine";

describe("Ziggy fortune engine", () => {
  it("classifies shop-relevant question themes", () => {
    expect(classifyQuestion("Should I quit my job?")).toBe("work");
    expect(classifyQuestion("Will I win the lotto?")).toBe("money");
    expect(classifyQuestion("Should I leave Frankston?")).toBe("frankston");
    expect(classifyQuestion("Is this a terrible plan?")).toBe("general");
  });

  it("returns the same handcrafted answer for the same question", () => {
    const first = getFortune("Should I quit my job?", fortunes);
    const second = getFortune("Should I quit my job?", fortunes);

    expect(second).toEqual(first);
    expect(first.category).toBe("work");
  });

  it("normalizes case and surrounding whitespace", () => {
    expect(hashQuestion("  FRANKSTON  ")).toBe(hashQuestion("frankston"));
  });

  it("fails clearly when no fortunes exist", () => {
    expect(() => getFortune("hello", [])).toThrow("At least one Ziggy fortune is required");
  });
});
