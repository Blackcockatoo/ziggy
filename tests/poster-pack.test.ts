import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  posterPackDownload,
  posterPackItems,
  posterPackQrTarget,
} from "../src/content/poster-pack";

function publicFile(publicPath: string) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

describe("the finished Monkey Shop poster pack", () => {
  it("keeps the six posters in a stable numbered edition", () => {
    expect(posterPackItems).toHaveLength(6);
    expect(posterPackItems.map((item) => item.number)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(new Set(posterPackItems.map((item) => item.id)).size).toBe(6);
    expect(new Set(posterPackItems.map((item) => item.src)).size).toBe(6);
  });

  it("ships every full-resolution PNG used by the Image Room", () => {
    posterPackItems.forEach((item) => {
      const file = publicFile(item.src);
      expect(existsSync(file), item.src).toBe(true);

      const png = readFileSync(file);
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBe(item.width);
      expect(png.readUInt32BE(20)).toBe(item.height);
      expect(png.length).toBeGreaterThan(2_000_000);
    });
  });

  it("ships the complete download and preserves the verified QR destination", () => {
    const pack = publicFile(posterPackDownload);
    expect(existsSync(pack)).toBe(true);
    expect(statSync(pack).size).toBeGreaterThan(15_000_000);
    expect(new URL(posterPackQrTarget).hostname).toBe("www.themonkeyshop.com");
  });
});
