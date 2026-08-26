import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { recordRoomTracks } from "../src/app/archive/record-room/record-room";

const publicRoot = path.resolve(process.cwd(), "public");

describe("the optional Record Room", () => {
  it("keeps thirteen local covers and audio tracks in sequence", () => {
    expect(recordRoomTracks).toHaveLength(13);
    expect(recordRoomTracks.map((track) => track.no)).toEqual(
      Array.from({ length: 13 }, (_, index) => index + 1),
    );

    for (const track of recordRoomTracks) {
      expect(track.assetSlug.startsWith(String(track.no).padStart(2, "0"))).toBe(true);

      const cover = path.join(
        publicRoot,
        "archive/record-room/covers",
        `${track.assetSlug}.webp`,
      );
      const audio = path.join(
        publicRoot,
        "archive/record-room/audio",
        `${track.assetSlug}.mp3`,
      );

      expect(fs.existsSync(cover), cover).toBe(true);
      expect(fs.statSync(cover).size, cover).toBeGreaterThan(10_000);
      expect(fs.existsSync(audio), audio).toBe(true);
      expect(fs.statSync(audio).size, audio).toBeGreaterThan(100_000);
    }
  });

  it("does not depend on private Google Drive delivery", () => {
    const component = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "src/app/archive/record-room/record-room.tsx",
      ),
      "utf8",
    );
    expect(component).not.toContain("drive.google.com");
  });

  it("ignores a stale pause event after changing tracks", () => {
    const component = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "src/app/archive/record-room/record-room.tsx",
      ),
      "utf8",
    );

    expect(component).toContain(
      "if (event.currentTarget.paused) setPlaying(false);",
    );
  });
});
