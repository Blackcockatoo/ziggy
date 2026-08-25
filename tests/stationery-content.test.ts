import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { stationeryDrawers } from "../src/content/stationery";

const publicRoot = path.resolve(process.cwd(), "public");

describe("the stationery cupboard", () => {
  it("keeps ten uniquely numbered, uniquely named drawers", () => {
    expect(stationeryDrawers).toHaveLength(10);
    expect(stationeryDrawers.map((drawer) => drawer.number)).toEqual(
      Array.from({ length: 10 }, (_, index) => String(index + 1).padStart(2, "0")),
    );
    expect(new Set(stationeryDrawers.map((drawer) => drawer.id)).size).toBe(10);
  });

  it("gives every drawer a supplied regal preview and print edition", () => {
    for (const drawer of stationeryDrawers) {
      expect(drawer.preview).toMatch(/^\/images\/ziggy\/stationery\/regal\/.+\.jpg$/);
      expect(fs.existsSync(path.join(publicRoot, drawer.preview))).toBe(true);

      const regal = drawer.downloads.filter((download) => download.edition === "regal");
      expect(regal, drawer.title).toHaveLength(1);
      expect(fs.existsSync(path.join(publicRoot, regal[0].href))).toBe(true);
    }
  });

  it("keeps practical versions beside the matching artwork", () => {
    const workingDrawers = stationeryDrawers.filter((drawer) =>
      drawer.downloads.some((download) => download.edition === "working"),
    );

    expect(workingDrawers).toHaveLength(8);
    for (const drawer of workingDrawers) {
      for (const download of drawer.downloads.filter((item) => item.edition === "working")) {
        expect(fs.existsSync(path.join(publicRoot, download.href))).toBe(true);
      }
    }
  });

  it("labels credential-like ceremony as fictional souvenir artwork", () => {
    for (const id of ["birth-certificate", "bachelor-degree"]) {
      const drawer = stationeryDrawers.find((item) => item.id === id);
      expect(drawer?.practical.toLowerCase()).toContain("fictional");
      expect(drawer?.downloads[0].note.toLowerCase()).toContain("fictional");
    }
  });

  it("publishes both combined suites and the complete cupboard", () => {
    for (const filename of [
      "ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf",
      "ZIGGY_OLD_VIC_STATE_WORKING_STATIONERY_SUITE_2026.pdf",
      "ZIGGY_STATIONERY_CUPBOARD_2026.zip",
    ]) {
      expect(
        fs.existsSync(path.join(publicRoot, "downloads/ziggy-stationery", filename)),
      ).toBe(true);
    }
  });
});
