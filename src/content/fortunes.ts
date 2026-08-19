export type FortuneCategory =
  | "money"
  | "love"
  | "work"
  | "luck"
  | "frankston"
  | "general";

export type Fortune = {
  id: string;
  category: FortuneCategory;
  answer: string;
  kicker: string;
};

export const fortunes: Fortune[] = [
  { id: "money-1", category: "money", answer: "Possible.", kicker: "But check the ticket before you resign." },
  { id: "money-2", category: "money", answer: "Keep the receipt.", kicker: "Luck has terrible filing habits." },
  { id: "money-3", category: "money", answer: "Not today.", kicker: "Today is for avoiding a worse decision." },
  { id: "love-1", category: "love", answer: "Say the honest bit.", kicker: "The clever bit can wait outside." },
  { id: "love-2", category: "love", answer: "Yes, probably.", kicker: "Buy flowers only if you know which ones." },
  { id: "love-3", category: "love", answer: "Give it a week.", kicker: "A monkey should not be your rebound." },
  { id: "work-1", category: "work", answer: "Absolutely.", kicker: "Just not before payday." },
  { id: "work-2", category: "work", answer: "Take the meeting.", kicker: "You can complain about it accurately afterwards." },
  { id: "work-3", category: "work", answer: "The door still needs opening.", kicker: "Do the next useful thing." },
  { id: "luck-1", category: "luck", answer: "Your odds improve when you look.", kicker: "They also improve when you read the fine print." },
  { id: "luck-2", category: "luck", answer: "A small yes is coming.", kicker: "Do not frighten it with a five-year plan." },
  { id: "luck-3", category: "luck", answer: "Not all luck jingles.", kicker: "Some of it remembers your name." },
  { id: "frankston-1", category: "frankston", answer: "You can try leaving.", kicker: "Frankston has your forwarding address." },
  { id: "frankston-2", category: "frankston", answer: "Meet me on Thompson Street.", kicker: "Look for the monkey." },
  { id: "frankston-3", category: "frankston", answer: "The bay knows.", kicker: "It is refusing to comment." },
  { id: "general-1", category: "general", answer: "Ask again after lunch.", kicker: "Wisdom has low blood sugar." },
  { id: "general-2", category: "general", answer: "You already know.", kicker: "You came here hoping a monkey would take the blame." },
  { id: "general-3", category: "general", answer: "Proceed carefully.", kicker: "Confidence is not a receipt." },
  { id: "general-4", category: "general", answer: "No.", kicker: "That felt important to say quickly." },
  { id: "general-5", category: "general", answer: "Yes.", kicker: "Keep enough doubt for the drive home." },
];
