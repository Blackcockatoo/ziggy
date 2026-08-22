import type { ExhibitionIdentity } from "./types";

/**
 * The fixed points of the exhibition.
 *
 * The mornings device is deliberately approximate. No day/month is stored,
 * because the public record supports the 1996 frame but not an exact opening
 * morning.
 */
export const identity: ExhibitionIdentity = {
  title: "The Monkey Shop",
  subtitle: "Thirty Years in Frankston",
  alternativeTitle: "10,957 Mornings",
  alternativeSubtitle: "Thirty Years Behind the Counter in Frankston",
  thesis: [
    "Some businesses trade in Frankston.",
    "Some become part of Frankston.",
  ],
  address: {
    line: "8 Thompson Street",
    suburb: "Frankston",
    state: "Victoria",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=8+Thompson+Street+Frankston+Victoria",
  },
  approximateMornings: {
    display: "≈ 11,000",
    evidence: {
      status: "probable",
      note: "An anniversary-scale illustration based on the publicly supported Est. 1996 / thirty-year frame. It is not calculated from a claimed opening day.",
      sourceIds: ["lott-2026-tenth-win", "shop-facebook-profile", "tobacco-blends-about-2016"],
    },
  },
};
