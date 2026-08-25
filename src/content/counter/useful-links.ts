import type { CounterLink, TodayBoardLink } from "./types";

export const todayBoardLinks = [
  {
    id: "frankston-forecast",
    label: "Frankston forecast",
    detail: "Official Bureau of Meteorology forecast",
    href: "https://www.bom.gov.au/places/vic/frankston/forecast/",
    publisher: "Bureau of Meteorology",
  },
  {
    id: "shop-directions",
    label: "Find the shop",
    detail: "8 Thompson Street, Frankston",
    href: "https://www.google.com/maps/search/?api=1&query=8+Thompson+Street+Frankston+Victoria",
    publisher: "Google Maps",
  },
] as const satisfies readonly TodayBoardLink[];

/** Official information only. Nothing here predicts, sells or simulates a bet. */
export const usefulLinks = [
  {
    id: "official-results",
    label: "Latest results",
    description: "Official draw results and past-result search.",
    href: "https://www.thelott.com/results",
    publisher: "The Lott",
  },
  {
    id: "check-ticket",
    label: "Check a ticket",
    description: "Use the official ticket-checking service.",
    href: "https://www.thelott.com/results/check-my-ticket",
    publisher: "The Lott",
  },
  {
    id: "claiming-prizes",
    label: "Claim information",
    description: "Official guidance for claiming a prize.",
    href: "https://www.thelott.com/results/claiming-prizes",
    publisher: "The Lott",
  },
] as const satisfies readonly CounterLink[];
