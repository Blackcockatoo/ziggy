import type { CategoryProfile, FortuneCategory } from "./types";

/**
 * The eleven drawers in the machine.
 *
 * Order matters: it is the deterministic tie-break when a question scores
 * equally across two categories, and it is the order the dial reads in.
 *
 * `mystery` is the fallback for anything the classifier cannot place, which is
 * both the honest behaviour and the funnier one.
 */
export const categoryProfiles: CategoryProfile[] = [
  {
    id: "money",
    label: "Money",
    code: "MNY",
    keywords: [
      "money", "rich", "cash", "afford", "buy", "rent", "mortgage", "loan",
      "debt", "bill", "bills", "price", "cost", "expensive", "cheap", "save",
      "savings", "wage", "wages", "pay", "paid", "salary", "broke", "invest",
      "super", "tax", "budget", "spend",
    ],
  },
  {
    id: "luck",
    label: "Luck",
    code: "LCK",
    keywords: [
      "luck", "lucky", "unlucky", "win", "winning", "lotto", "lottery",
      "ticket", "draw", "odds", "chance", "chances", "jackpot", "gamble",
      "bet", "numbers", "division one", "scratchie", "fate",
    ],
  },
  {
    id: "love",
    label: "Love",
    code: "LOV",
    keywords: [
      "love", "date", "dating", "marry", "married", "marriage", "partner",
      "girlfriend", "boyfriend", "husband", "wife", "relationship", "crush",
      "romance", "ex", "break up", "breakup", "divorce", "text them",
      "ask them out", "single",
    ],
  },
  {
    id: "work",
    label: "Work",
    code: "WRK",
    keywords: [
      "work", "working", "job", "jobs", "boss", "quit", "resign", "career",
      "meeting", "payday", "shift", "shifts", "colleague", "coworker",
      "promotion", "interview", "fired", "redundant", "manager", "roster",
      "business", "office",
    ],
  },
  {
    id: "family",
    label: "Family",
    code: "FAM",
    keywords: [
      "family", "mum", "mother", "dad", "father", "brother", "sister", "son",
      "daughter", "kid", "kids", "child", "children", "nan", "nanna",
      "grandma", "grandpa", "pop", "cousin", "aunt", "uncle", "parents",
      "christmas", "birthday", "in-laws",
    ],
  },
  {
    id: "frankston",
    label: "Frankston",
    code: "FRK",
    keywords: [
      "frankston", "thompson", "thompson street", "monkey shop", "beach",
      "bay", "peninsula", "melbourne", "move away", "leave town", "suburb",
      "the line", "train", "station", "pier", "foreshore", "seaford",
      "carrum", "mornington", "local",
    ],
  },
  {
    id: "regret",
    label: "Regret",
    code: "RGT",
    keywords: [
      "regret", "sorry", "apologise", "apologize", "mistake", "wrong",
      "should i have", "shouldn't have", "guilty", "guilt", "ashamed",
      "stuffed up", "ruined", "forgive", "too late", "wasted",
    ],
  },
  {
    id: "future",
    label: "Future",
    code: "FUT",
    keywords: [
      "future", "will i", "when will", "tomorrow", "next year", "someday",
      "one day", "eventually", "destiny", "prediction", "predict", "forecast",
      "years from now", "ever happen", "happen to me",
    ],
  },
  {
    id: "silly",
    label: "Stupid questions",
    code: "SLY",
    keywords: [
      "banana", "bananas", "poo", "fart", "your mum", "are you real",
      "are you a monkey", "hello", "hi", "test", "asdf", "lol", "haha",
      "penguin", "can i eat", "am i cool", "what am i thinking",
    ],
  },
  {
    id: "mystery",
    label: "Mysterious nonsense",
    code: "MYS",
    keywords: [
      "meaning", "universe", "god", "soul", "dream", "dreams", "sign", "signs",
      "ghost", "spirit", "why", "purpose", "truth", "secret", "the void",
      "everything", "nothing",
    ],
  },
  {
    id: "encouragement",
    label: "Genuine encouragement",
    code: "ENC",
    keywords: [
      "can i", "am i good", "am i enough", "should i keep going", "give up",
      "giving up", "keep going", "try again", "worth it", "proud", "brave",
      "scared", "afraid", "nervous", "tired", "struggling", "hard right now",
      "cope", "carry on",
    ],
  },
];

/** The drawer the machine opens when a question refuses to be classified. */
export const fallbackCategory: FortuneCategory = "mystery";

export const categoryProfileById = new Map<FortuneCategory, CategoryProfile>(
  categoryProfiles.map((profile) => [profile.id, profile]),
);

export function categoryLabel(category: FortuneCategory): string {
  return categoryProfileById.get(category)?.label ?? "Unfiled";
}
