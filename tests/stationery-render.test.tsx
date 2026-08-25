import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StationeryCupboard } from "../src/app/archive/stationery/stationery-cupboard";

const markup = renderToStaticMarkup(<StationeryCupboard />);

describe("the stationery cupboard interface", () => {
  it("renders all ten drawers in the default view", () => {
    expect(markup.match(/aria-label="Open [^"]+"/g)).toHaveLength(10);
    expect(markup).toContain("THE STATIONERY");
    expect(markup).toContain("CUPBOARD");
  });

  it("starts with the supplied letterhead artwork and both of its editions", () => {
    expect(markup).toContain("01-letterhead-regal.jpg");
    expect(markup).toContain("01-letterhead-regal-print.pdf");
    expect(markup).toContain("01-letterhead-fillable.pdf");
    expect(markup).toContain("working file preserved");
  });

  it("offers the complete pack and both combined suites", () => {
    expect(markup).toContain("ZIGGY_STATIONERY_CUPBOARD_2026.zip");
    expect(markup).toContain("ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf");
    expect(markup).toContain("ZIGGY_OLD_VIC_STATE_WORKING_STATIONERY_SUITE_2026.pdf");
  });

  it("keeps the fictional status explicit in the public interface", () => {
    expect(markup).toContain("claims to actual public authority");
    expect(markup).toContain("OLD VIC STATE IS FICTIONAL");
  });
});
