import type { ExhibitionIdentity } from "./types";

/**
 * The fixed points of the exhibition.
 *
 * `assumedFirstMorning` exists only to drive the "10,957 mornings" editorial
 * device. It carries its own evidence record and must be rendered with that
 * status visible until Rob confirms the real first trading day.
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
  assumedFirstMorning: {
    iso: "1996-01-01",
    evidence: {
      status: "needs-confirmation",
      note: "A placeholder date used only to demonstrate the counter. The real first morning has not been established, so the number it produces is an illustration, not a fact.",
      sourceIds: ["shop-ledger", "interview-rob"],
    },
  },
};
