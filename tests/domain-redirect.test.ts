import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("the permanent public domain", () => {
  it("redirects www requests to the canonical apex host", () => {
    const config = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf8"),
    );

    expect(config.redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "www.themonkeyshop.com" }],
      destination: "https://themonkeyshop.com/:path*",
      permanent: true,
    });
  });
});
