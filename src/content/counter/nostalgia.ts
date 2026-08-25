import type { NostalgiaEntry } from "./types";

/**
 * Original text only for this pass. Images and sourced historical snapshots
 * can be added later without changing the component.
 */
export const nostalgiaEntries = [
  {
    id: "melways",
    title: "Melways",
    yearOrEra: "The glovebox era",
    description:
      "Before your phone confidently sent you into a lake, Melbourne trusted a book the size of a paving stone.",
    category: "getting-around",
  },
  {
    id: "nokia-5110",
    title: "Nokia 5110",
    yearOrEra: "Late 1990s",
    description:
      "A phone that survived the floor, the driveway and possibly the collapse of civilisation. Battery measured in weekends.",
    category: "phones",
  },
  {
    id: "vhs-rewinder",
    title: "VHS rewinders",
    yearOrEra: "Be kind, rewind",
    description:
      "A second machine whose entire career was saving the first machine from having to do one job.",
    category: "video",
  },
  {
    id: "video-ezy",
    title: "Video Ezy",
    yearOrEra: "Friday night",
    description:
      "Entertainment meant walking the aisles, judging films by their covers and learning every good copy was already out.",
    category: "video",
  },
  {
    id: "cd-wallet",
    title: "The CD wallet",
    yearOrEra: "Road-trip technology",
    description:
      "Forty discs in a zip-up binder, none in the case they came from, plus one mystery CD-R labelled MIX 3.",
    category: "music",
  },
  {
    id: "tamagotchi",
    title: "Tamagotchi",
    yearOrEra: "Pocket responsibility",
    description:
      "Proof an entire generation could feel parental guilt toward three black pixels before first period.",
    category: "digital-pets",
  },
  {
    id: "crt-television",
    title: "CRT televisions",
    yearOrEra: "Before flat screens",
    description:
      "Deep enough to need its own postcode and heavy enough to end friendships on moving day.",
    category: "television",
  },
  {
    id: "dial-up",
    title: "Dial-up internet",
    yearOrEra: "Nobody use the phone",
    description:
      "The internet arrived screaming, occupied the home phone and disconnected the instant somebody's nan rang.",
    category: "internet",
  },
] as const satisfies readonly NostalgiaEntry[];
