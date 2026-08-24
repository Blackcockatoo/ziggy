import { describe, expect, it } from "vitest";
import { visualArchiveChapters, visualArchiveItems } from "../src/content/visual-archive";

describe("the legacy visual archive", () => {
  it("keeps all forty-four plates in a stable numbered sequence", () => {
    expect(visualArchiveItems).toHaveLength(44);
    expect(visualArchiveItems.map((item) => item.number)).toEqual(
      Array.from({ length: 44 }, (_, index) => index + 1),
    );
    expect(new Set(visualArchiveItems.map((item) => item.id)).size).toBe(44);
    expect(new Set(visualArchiveItems.map((item) => item.src)).size).toBe(44);
  });

  it("keeps supplied references separate from creative studies", () => {
    expect(visualArchiveItems.filter((item) => item.status === "Original reference")).toHaveLength(2);
    expect(visualArchiveItems.filter((item) => item.status === "Creative study")).toHaveLength(42);
  });

  it("keeps every chapter populated and every image interpreted", () => {
    const expectedChapterCounts = [2, 10, 10, 10, 10, 2];

    visualArchiveChapters.forEach((chapter, index) => {
      expect(visualArchiveItems.filter((item) => item.chapter === chapter.id)).toHaveLength(
        expectedChapterCounts[index],
      );
    });

    visualArchiveItems.forEach((item) => {
      expect(item.title.length).toBeGreaterThan(4);
      expect(item.alt.length).toBeGreaterThan(20);
      expect(item.commentary.length).toBeGreaterThan(100);
      expect(item.src).toMatch(/^\/images\/ziggy\/legacy-44\/\d{2}-[a-z0-9-]+\.webp$/);
    });
  });
});
