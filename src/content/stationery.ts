export type StationeryCategory = "Correspondence" | "Archive" | "Ceremony" | "Ephemera";

export type StationeryFilter = "All" | StationeryCategory;

export type StationeryDownload = {
  label: string;
  note: string;
  size: "PDF";
  href: string;
  edition: "regal" | "working";
};

export type StationeryDrawer = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  rank: string;
  category: StationeryCategory;
  description: string;
  practical: string;
  format: string;
  preview: string;
  previewAlt: string;
  previewShape: "portrait" | "landscape" | "ticket";
  downloads: StationeryDownload[];
};

const downloadRoot = "/downloads/ziggy-stationery";
const previewRoot = "/images/ziggy/stationery/regal";

export const stationeryDrawers = [
  {
    id: "letterhead",
    number: "01",
    title: "Letterhead",
    shortTitle: "Correspondence",
    rank: "Quiet regalia",
    category: "Correspondence",
    description:
      "A calm writing page framed by the full Old Vic State furniture: bottle green, warm paper, a little brass and plenty of room for an actual human message.",
    practical:
      "Use the regal A4 sheet as supplied, or take the lighter fillable version when the correspondence needs to do some work.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/01-letterhead-regal.jpg`,
    previewAlt:
      "Ornate cream and bottle-green Ziggy letterhead with date, recipient, subject and ruled writing fields",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/01-letterhead-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · practical working copy",
        size: "PDF",
        href: `${downloadRoot}/01-letterhead-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "memorandum",
    number: "02",
    title: "Memorandum / Briefing Note",
    shortTitle: "Cabinet brief",
    rank: "Administrative majesty",
    category: "Correspondence",
    description:
      "A needlessly official home for ordinary decisions, with the ceremony held neatly in the header and the useful bits given room to breathe.",
    practical:
      "The regal print is ready for pen and paper. The companion PDF keeps nine digital fields for purpose, key points and the next sensible move.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/02-memorandum-briefing-note-regal.jpg`,
    previewAlt:
      "Cream and bottle-green Ziggy memorandum with fields for sender, recipient, date, subject, purpose, key points and next move",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/02-memorandum-briefing-note-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · practical working copy",
        size: "PDF",
        href: `${downloadRoot}/02-memorandum-brief-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "certificate",
    number: "03",
    title: "Certificate of Appreciation",
    shortTitle: "Appreciation",
    rank: "Full coronation setting",
    category: "Ceremony",
    description:
      "The drawer permitted to go completely ceremonial: heraldic Ziggy, a handsome seal and a properly warm thank-you to a valued patron.",
    practical:
      "Print the Valued Patron artwork as-is, or use the fillable version when a particular good local deserves naming.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/03-certificate-of-appreciation-regal.jpg`,
    previewAlt:
      "Ornate Ziggy certificate of appreciation recognising a valued patron of The Monkey Shop",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/03-certificate-of-appreciation-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · personalised presentation copy",
        size: "PDF",
        href: `${downloadRoot}/03-certificate-of-appreciation-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "archive-intake",
    number: "04",
    title: "Archive Intake Record",
    shortTitle: "Registrar",
    rank: "Royal archive registry",
    category: "Archive",
    description:
      "A disciplined place for one object, photograph, paper or memory at a time. No homework, no invented certainty and no loose story left unlabelled.",
    practical:
      "The artwork edition is made for handwriting. The fillable record keeps the same evidence language for digital archive work.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/04-archive-intake-record-regal.jpg`,
    previewAlt:
      "Ornate Ziggy archive intake record with source, period, people, restrictions, evidence status and curator-note fields",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/04-archive-intake-record-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · practical archive form",
        size: "PDF",
        href: `${downloadRoot}/04-archive-intake-record-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "owner-steering",
    number: "05",
    title: "Owner Steering Sheet",
    shortTitle: "Privy ballot",
    rank: "Low-effort high office",
    category: "Archive",
    description:
      "Seven decisions in one glance. The page carries the theatre so Rob and Carla do not have to carry a committee meeting.",
    practical:
      "Circle the supplied sheet by hand, or use the fillable working copy for mutually exclusive Keep, Park and Confirm decisions.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/05-owner-steering-sheet-regal.jpg`,
    previewAlt:
      "Bottle-green and cream Ziggy owner steering sheet with seven Keep, Park and Confirm decision rows",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/05-owner-steering-sheet-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · practical steering form",
        size: "PDF",
        href: `${downloadRoot}/05-owner-steering-sheet-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "product-record",
    number: "06",
    title: "Product Development Record",
    shortTitle: "Design warrant",
    rank: "Design office plate",
    category: "Archive",
    description:
      "The Zig air-freshener study presented as a serious product record: the complete troupe, recognition cues, packaging and scent system in one handsome plate.",
    practical:
      "Keep the regal sheet as the full design record. Use the fillable companion when version, status, review date and owner need updating.",
    format: "Regal A4 + fillable A4",
    preview: `${previewRoot}/06-product-development-record-regal.jpg`,
    previewAlt:
      "Detailed Ziggy product development record showing the air-freshener family, packaging, scent palette and design rules",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/06-product-development-record-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable version",
        note: "A4 · practical product record",
        size: "PDF",
        href: `${downloadRoot}/06-product-development-record-fillable.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "compliments",
    number: "07",
    title: "With Compliments",
    shortTitle: "Calling card",
    rank: "Pocket ceremony",
    category: "Ephemera",
    description:
      "Good fortune favours the local, now with a full heraldic presentation sheet and the original small-format card still ready for counter duty.",
    practical:
      "Use the A4 artwork as a display sheet, the actual-size A6 card for production, or the four-up A4 file for ordinary printing and cutting.",
    format: "Regal A4 + A6 card",
    preview: `${previewRoot}/07-with-compliments-regal.jpg`,
    previewAlt:
      "Cream and bottle-green Ziggy With Compliments presentation sheet with a heraldic seal and local-good-fortune message",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/07-with-compliments-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download A6 card",
        note: "Actual-size working piece",
        size: "PDF",
        href: `${downloadRoot}/07-with-compliments-a6.pdf`,
        edition: "working",
      },
      {
        label: "Download four-up sheet",
        note: "A4 · includes cut marks",
        size: "PDF",
        href: `${downloadRoot}/07-with-compliments-a4-four-up-print-sheet.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "archive-ticket",
    number: "08",
    title: "Commemorative Receipt / Archive Ticket",
    shortTitle: "Treasury docket",
    rank: "Penny-arcade bureaucracy",
    category: "Ephemera",
    description:
      "Thirty years of local life, already paid in time. A commemorative receipt that behaves like an archive object without pretending to be an old one.",
    practical:
      "The regal A4 edition is the display piece. The companion ticket remains available actual-size, fillable and three-up for cutting.",
    format: "Regal A4 + working ticket",
    preview: `${previewRoot}/08-commemorative-archive-ticket-regal.jpg`,
    previewAlt:
      "Ornate Ziggy commemorative receipt and archive ticket for thirty years of local life at The Monkey Shop",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download regal print",
        note: "A4 · supplied artwork",
        size: "PDF",
        href: `${downloadRoot}/08-commemorative-archive-ticket-regal-print.pdf`,
        edition: "regal",
      },
      {
        label: "Download fillable ticket",
        note: "80 × 180 mm · actual size",
        size: "PDF",
        href: `${downloadRoot}/08-commemorative-archive-ticket-fillable.pdf`,
        edition: "working",
      },
      {
        label: "Download three-up sheet",
        note: "A4 · includes cut marks",
        size: "PDF",
        href: `${downloadRoot}/08-archive-ticket-a4-three-up-print-sheet.pdf`,
        edition: "working",
      },
    ],
  },
  {
    id: "birth-certificate",
    number: "09",
    title: "Birth Certificate",
    shortTitle: "Birth ledger",
    rank: "Entirely fictional vital records",
    category: "Ceremony",
    description:
      "The official-looking record of Ziggy entering the great ledger in 1996, witnessed by exactly the sort of authority that a monkey invented for himself.",
    practical:
      "A4 fictional souvenir artwork only. It does not certify a birth, identity, public record or government authority.",
    format: "Regal A4",
    preview: `${previewRoot}/09-birth-certificate-regal.jpg`,
    previewAlt:
      "Highly ornate fictional Ziggy birth certificate recording The Monkey Shop in Frankston and its 1996 establishment",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download souvenir print",
        note: "A4 · fictional ceremonial artwork",
        size: "PDF",
        href: `${downloadRoot}/09-birth-certificate-regal-print.pdf`,
        edition: "regal",
      },
    ],
  },
  {
    id: "bachelor-degree",
    number: "10",
    title: "Bachelor Degree",
    shortTitle: "Monkey degree",
    rank: "Magna ledger cum laudis",
    category: "Ceremony",
    description:
      "A Bachelor of Monkey Administration, conferred upon Ziggy for distinguished standing in local remembrance and ceremonial bureaucracy.",
    practical:
      "A4 fictional honour only. It is a joke certificate, not an academic credential, qualification or public record.",
    format: "Regal A4",
    preview: `${previewRoot}/10-bachelor-degree-regal.jpg`,
    previewAlt:
      "Highly ornate fictional Bachelor Degree awarded to Ziggy for Monkey Administration and local remembrance",
    previewShape: "portrait",
    downloads: [
      {
        label: "Download souvenir print",
        note: "A4 · fictional ceremonial artwork",
        size: "PDF",
        href: `${downloadRoot}/10-bachelor-degree-regal-print.pdf`,
        edition: "regal",
      },
    ],
  },
] satisfies StationeryDrawer[];

export const stationeryFilters: StationeryFilter[] = [
  "All",
  "Correspondence",
  "Archive",
  "Ceremony",
  "Ephemera",
];
