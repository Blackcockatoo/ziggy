import type { CommunityRecord } from "./types";

/**
 * Around Town.
 *
 * A scrapbook drawer, not a corporate responsibility statement. Each entry
 * should end up being a specific dated thing — a raffle book, a sponsored
 * jumper, a tin on the counter — rather than a claim about being a good
 * neighbour. Where there is no object and no date, the record stays open.
 */
export const community: CommunityRecord[] = [
  {
    id: "raffles",
    title: "The raffle book on the counter",
    detail:
      "Clubs, schools and causes left books here and collected them full. Which ones, for what, and in which years is the part worth recording.",
    category: "raffle",
    evidence: { status: "placeholder", sourceIds: ["shop-ledger"] },
  },
  {
    id: "clubs",
    title: "Local clubs and teams",
    detail:
      "Sponsorship in a suburb usually means a name on a jumper or a sign on a fence. Photographs and dates needed before anything is claimed here.",
    category: "club",
    evidence: { status: "placeholder", sourceIds: ["shop-ledger"] },
  },
  {
    id: "fundraisers",
    title: "Tins, drives and collections",
    detail:
      "Small, specific and easy to forget. Record each with a date, an object and permission, rather than as a boast.",
    category: "fundraiser",
    evidence: { status: "placeholder" },
  },
  {
    id: "services",
    title: "Everything at the counter",
    detail:
      "Newspapers, Lotto, tobacco, dry cleaning, key cutting and — a lead worth chasing — a specialist pipe trade. Build a dated inventory from invoices and signage before any of it is stated as fact.",
    category: "trading",
    evidence: {
      status: "needs-confirmation",
      note: "The service list is locally repeated. Individual dates and the pipe trade lead are unconfirmed.",
      sourceIds: ["shop-ledger", "interview-rob"],
    },
  },
  {
    id: "mural",
    title: "The mural",
    detail:
      "Community art material is reported to exist in connection with the shop. Artist, date, location and current condition all need establishing.",
    category: "street",
    evidence: {
      status: "needs-confirmation",
      note: "Lead only. Do not describe a mural the exhibition has not seen.",
      sourceIds: ["shop-social"],
    },
  },
  {
    id: "street",
    title: "Frankston changed around it",
    detail:
      "The neighbouring businesses, the shopfront views and the street details that show three decades of Thompson Street moving while one door stayed put.",
    category: "street",
    evidence: { status: "placeholder" },
  },
];
