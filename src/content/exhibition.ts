import { artefacts } from "./artefacts";
import { community } from "./community";
import { identity } from "./identity";
import { memories, counterObjects } from "./memories";
import { lore, monkeys } from "./monkeys";
import { principals, staff } from "./people";
import { sources } from "./sources";
import { timeline } from "./timeline";
import { ledger } from "./wins";
import type { ExhibitionContent, NavigationItem } from "./types";

/**
 * The exhibition rooms, in the order a visitor walks them.
 *
 * Each href must match the `id` of a rendered section. The content test
 * asserts that, so a room can never be listed in the navigation and then
 * quietly fail to exist.
 */
export const navigation: NavigationItem[] = [
  { href: "#story", label: "1996 → 2026" },
  { href: "#monkey", label: "The monkey" },
  { href: "#ledger", label: "The ten" },
  { href: "#ask-ziggy", label: "Ask Ziggy" },
  { href: "#counter", label: "The counter" },
  { href: "#gang", label: "The gang" },
  { href: "#archive", label: "The archive" },
  { href: "#visit", label: "Visit" },
];

export const exhibition: ExhibitionContent = {
  identity,
  navigation,
  timeline,
  lore,
  ledger,
  monkeys,
  counterObjects,
  memories,
  principals,
  staff,
  community,
  artefacts,
  sources,
};

export { lotteryExclusions, unplacedWins } from "./wins";
