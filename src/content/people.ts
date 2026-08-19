import type { PersonRecord } from "./types";

/**
 * Rob and Carla.
 *
 * The closing room, and the quietest one. No founder bios, no achievements
 * list. Carla's role and preferred credit must come from Carla — inferring
 * either would be exactly the mistake this project exists to avoid.
 */
export const principals: PersonRecord[] = [
  {
    id: "rob",
    name: "Rob",
    role: "Owner. Storyteller. Keeper of the key.",
    years: "Thirty years",
    bio: "Named publicly as the agency's owner, and the voice in the record when the tenth Division One win was announced.",
    memoryPrompt:
      "Ask Rob for the first morning, the strangest request ever made at this counter, and the one object he could never bring himself to throw out.",
    evidence: {
      status: "verified",
      sourceIds: ["lott-2026-tenth-win"],
      permission: "pending",
    },
    media: {
      id: "rob-portrait",
      kind: "image",
      alt: "Portrait space reserved for Rob behind the counter",
      caption: "Commission: Rob behind the counter, looking toward the door.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
  {
    id: "carla",
    name: "Carla",
    role: "Family business. Role and preferred credit to be confirmed by Carla.",
    years: "Interview required",
    memoryPrompt:
      "Ask Carla what changed, what never did, and which single photograph tells the real story of the shop.",
    evidence: {
      status: "needs-confirmation",
      note: "Named alongside Rob in research leads. Her role, credit and involvement should be described in her own words.",
      sourceIds: ["interview-carla"],
      permission: "pending",
    },
    media: {
      id: "carla-portrait",
      kind: "image",
      alt: "Portrait space reserved for Carla in the shop",
      caption: "Commission: Carla, in the place she chooses to be remembered.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
];

/**
 * The Gang.
 *
 * Everyone else who ever worked a shift. This is not a team page: former staff
 * are people who moved on, and every record needs `permission: "granted"`
 * before a real name, photograph or anecdote is published.
 *
 * The records below are shaped slots showing what a completed entry looks
 * like. Replace them; do not decorate them.
 */
export const staff: PersonRecord[] = [
  {
    id: "staff-early",
    name: "Name to come",
    role: "Counter, early years",
    years: "Late 1990s",
    era: "The first crew",
    memoryPrompt:
      "Who worked the first years? Who opened when Rob could not? Who taught the next person the till?",
    evidence: { status: "placeholder", permission: "pending" },
    media: {
      id: "staff-early-photo",
      kind: "image",
      alt: "Archive space reserved for a photograph of the earliest staff",
      caption: "Wanted: any staff photograph from the first decade.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
  {
    id: "staff-long-service",
    name: "Name to come",
    role: "Long service",
    years: "Years to confirm",
    era: "The one who stayed",
    memoryPrompt:
      "Who stayed longest after Rob and Carla, and what did the customers call them?",
    evidence: { status: "placeholder", permission: "pending" },
    media: {
      id: "staff-long-service-photo",
      kind: "image",
      alt: "Archive space reserved for a portrait of the longest-serving staff member",
      caption: "Wanted: a portrait, and permission to use it.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
  {
    id: "staff-first-job",
    name: "Name to come",
    role: "First job",
    years: "A summer",
    era: "School holidays",
    memoryPrompt:
      "Who had their first ever job here? What did they get wrong on day one, and where are they now?",
    evidence: { status: "placeholder", permission: "pending" },
    media: {
      id: "staff-first-job-photo",
      kind: "image",
      alt: "Archive space reserved for a photograph of a first-job staff member",
      caption: "Wanted: the photograph they would actually agree to.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
  {
    id: "staff-covid",
    name: "Name to come",
    role: "Kept it open",
    years: "2020–2021",
    era: "Lockdown shifts",
    memoryPrompt:
      "Who worked the lockdown shifts, and what was the shop like with nobody on the street?",
    evidence: { status: "placeholder", permission: "pending" },
    media: {
      id: "staff-covid-photo",
      kind: "image",
      alt: "Archive space reserved for a photograph of the shop during lockdown trading",
      caption: "Wanted: anything at all from 2020 and 2021.",
      evidence: { status: "placeholder", permission: "pending" },
    },
  },
];
