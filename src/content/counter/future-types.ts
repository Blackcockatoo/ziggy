/** Content contracts reserved for later Counter passes. Nothing here renders yet. */
export type CulturalSnapshot = {
  id: string;
  year: number;
  heading: string;
  facts: readonly string[];
  sources: readonly { label: string; url: string }[];
};

export type TelevisionMemory = {
  id: string;
  title: string;
  era: string;
  note: string;
  source?: { label: string; url: string };
};

export type NumberOneRecord = {
  date: string;
  chart: string;
  title: string;
  artist: string;
  source: { label: string; url: string };
};

export type CounterPoll = {
  id: string;
  question: string;
  options: readonly [string, string, ...string[]];
};
