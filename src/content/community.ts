import type { CommunityRecord } from "./types";

/**
 * Around Town: one documented example, one documented service record and two
 * carefully labelled archive opportunities. No generic philanthropy claims.
 */
export const community: CommunityRecord[] = [
  {
    id: "butt-out-day",
    title: "Butt Out Day with Great Flavours café",
    detail:
      "Raff and Bree from Great Flavours joined the shop's Butt Out Day in March 2018; the shop's post records cigarette-butt drawings appearing on the coffee cups. One specific collaboration, kept at its actual size.",
    category: "street",
    year: "2018",
    evidence: {
      status: "verified",
      note: "Documents one local litter-awareness/promotion activity. Not evidence of an ongoing environmental or charity program.",
      sourceIds: ["cignall-butt-out-2018"],
    },
  },
  {
    id: "services",
    title: "Everything at the counter",
    detail:
      "TattsLotto, newspapers, tobacco, dry cleaning and house-key cutting are publicly listed services. Archived 2016 pages separately document a specialist online catalogue; start/end dates and in-store continuity remain open.",
    category: "trading",
    evidence: {
      status: "verified",
      sourceIds: [
        "shop-facebook-profile",
        "tobacco-blends-home-2016",
        "tobacco-blends-contact-2016",
      ],
    },
  },
  {
    id: "community-opportunity",
    title: "One connection worth remembering",
    detail:
      "No reliable public record has yet established a specific sporting sponsorship, school partnership or broad charity program. One genuine club, school, raffle, cause or neighbour story is enough if Rob or Carla feel it belongs.",
    category: "club",
    evidence: {
      status: "placeholder",
      note: "Archive opportunity, not a claim that these activities did or did not occur.",
    },
  },
  {
    id: "street",
    title: "Frankston changed around it",
    detail:
      "One old view and one current view could show Thompson Street moving around the same doorway. Public image leads exist, but dates, provenance and display rights must be settled before exhibition use.",
    category: "street",
    evidence: { status: "placeholder" },
  },
];
