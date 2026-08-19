export type EvidenceStatus = "verified" | "research-lead" | "placeholder";

export type Source = {
  id: string;
  label: string;
  publisher: string;
  url: string;
};

export type Evidence = {
  status: EvidenceStatus;
  note?: string;
  sourceIds?: string[];
};

export type MediaAsset = {
  id: string;
  kind: "image" | "document" | "audio";
  alt: string;
  caption: string;
  src?: string;
  evidence: Evidence;
};

export type TimelineEntry = {
  id: string;
  year: string;
  eyebrow?: string;
  title: string;
  body: string;
  evidence: Evidence;
  media?: MediaAsset;
};

export type LoreItem = {
  id: string;
  label: string;
  value: string;
  body: string;
  evidence: Evidence;
};

export type LedgerEntry = {
  number: number;
  date?: string;
  game?: string;
  draw?: string;
  prize?: string;
  entry?: string;
  story?: string;
  evidence: Evidence;
};

export type LineageEntry = {
  id: string;
  name: string;
  era: string;
  role: string;
  body: string;
  evidence: Evidence;
  media: MediaAsset;
};

export type StoryPrompt = {
  id: string;
  title: string;
  prompt: string;
  speaker?: string;
  quote?: string;
  evidence: Evidence;
};

export type PersonRecord = {
  id: string;
  name: string;
  role: string;
  years?: string;
  memoryPrompt: string;
  evidence: Evidence;
  media: MediaAsset;
};

export type CommunityRecord = {
  id: string;
  title: string;
  detail: string;
  evidence: Evidence;
  media?: MediaAsset;
};

export type NavigationItem = {
  href: `#${string}`;
  label: string;
};

export type ExhibitionContent = {
  navigation: NavigationItem[];
  timeline: TimelineEntry[];
  lore: LoreItem[];
  ledger: LedgerEntry[];
  lineage: LineageEntry[];
  counterStories: StoryPrompt[];
  people: PersonRecord[];
  community: CommunityRecord[];
  sources: Source[];
};
