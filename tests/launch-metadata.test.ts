import { describe, expect, it } from "vitest";
import manifest from "../src/app/manifest";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { absoluteSiteUrl, SITE_URL } from "../src/lib/site";

describe("the permanent public identity", () => {
  it("uses the purchased domain for crawl and discovery routes", () => {
    expect(SITE_URL).toBe("https://themonkeyshop.com");
    expect(absoluteSiteUrl("/sitemap.xml")).toBe(
      "https://themonkeyshop.com/sitemap.xml",
    );
    expect(robots()).toMatchObject({
      host: SITE_URL,
      sitemap: "https://themonkeyshop.com/sitemap.xml",
    });
    expect(sitemap()).toEqual([
      expect.objectContaining({ url: SITE_URL, priority: 1 }),
    ]);
  });

  it("publishes an installable, branded manifest", () => {
    const appManifest = manifest();
    expect(appManifest.name).toContain("The Monkey Shop");
    expect(appManifest.start_url).toBe("/");
    expect(appManifest.icons?.[0]?.src).toBe("/icon.svg");
  });
});
