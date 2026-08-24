"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./stationery.module.css";

type Category = "Correspondence" | "Archive" | "Ceremony" | "Ephemera";

type Download = {
  label: string;
  note: string;
  size: string;
  href: string;
};

type Drawer = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  rank: string;
  category: Category;
  description: string;
  practical: string;
  format: string;
  preview: string;
  previewAlt: string;
  downloads: Download[];
};

const downloadRoot = "/downloads/ziggy-stationery";

const drawers: Drawer[] = [
  {
    id: "letterhead",
    number: "01",
    title: "Letterhead",
    shortTitle: "Correspondence",
    rank: "Quiet regalia",
    category: "Correspondence",
    description:
      "A proper local letterhead: ceremonial at the edges, calm where a human being actually has to write.",
    practical: "Fill the date, recipient, subject and correspondence fields digitally, or print it blank on A4.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/01-letterhead-fillable.webp",
    previewAlt: "Regal Ziggy letterhead with a bottle-green header and large correspondence field",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 working copy",
        size: "71 KB",
        href: `${downloadRoot}/01-letterhead-fillable.pdf`,
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
      "A needlessly official home for practical decisions, working notes and the next sensible move.",
    practical: "Nine fillable fields with generous purpose, key-points and decision areas. Nothing crosses the footer.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/02-memorandum-brief-fillable.webp",
    previewAlt: "Ziggy memorandum and briefing note with structured fillable fields",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 working copy",
        size: "75 KB",
        href: `${downloadRoot}/02-memorandum-brief-fillable.pdf`,
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
      "The one drawer permitted to go completely ceremonial: double rule, heraldic seal, witness Ziggy and room for sincere gratitude.",
    practical: "Fill the recipient, reason, signature and date digitally, or print a clean presentation copy.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/03-certificate-of-appreciation-fillable.webp",
    previewAlt: "Ziggy certificate of appreciation with a central seal and small Ziggy figure",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 presentation copy",
        size: "1.6 MB",
        href: `${downloadRoot}/03-certificate-of-appreciation-fillable.pdf`,
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
      "A disciplined place for one object, photograph, paper or memory at a time. No homework and no invented certainty.",
    practical: "Nine fillable fields and a clear four-state evidence control: Documented, Needs confirming, Local lore or Creative interpretation.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/04-archive-intake-record-fillable.webp",
    previewAlt: "Ziggy archive intake record with evidence status controls and large note fields",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 archive form",
        size: "80 KB",
        href: `${downloadRoot}/04-archive-intake-record-fillable.pdf`,
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
      "Seven decisions in one glance. The page carries the ceremony so the people using it do not carry the burden.",
    practical: "Each row has mutually exclusive Keep, Park and Confirm controls, followed by one short note field.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/05-owner-steering-sheet-fillable.webp",
    previewAlt: "Owner steering sheet with green decision rows and Keep Park Confirm controls",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 steering form",
        size: "82 KB",
        href: `${downloadRoot}/05-owner-steering-sheet-fillable.pdf`,
      },
    ],
  },
  {
    id: "product-record",
    number: "06",
    title: "Product Development Record",
    shortTitle: "Royal warrant",
    rank: "Design office plate",
    category: "Archive",
    description:
      "The air-freshener system is presented as a serious design object rather than a pasted-in moodboard.",
    practical: "The full product plate remains readable, the design rules stay fixed, and version, status, review date and owner remain fillable.",
    format: "A4 / fillable",
    preview: "/images/ziggy/stationery/06-product-development-record-fillable.webp",
    previewAlt: "Product development record with a clean framed Ziggy air freshener design plate",
    downloads: [
      {
        label: "Download fillable PDF",
        note: "A4 product record",
        size: "2.8 MB",
        href: `${downloadRoot}/06-product-development-record-fillable.pdf`,
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
      "A small dark-green calling card that behaves like a real object instead of a specimen floating on an A4 page.",
    practical: "Use the actual-size A6 file for digital production or the four-up A4 sheet for ordinary printing and cutting.",
    format: "A6 + four-up A4",
    preview: "/images/ziggy/stationery/07-with-compliments-a6.webp",
    previewAlt: "Dark green Ziggy With Compliments A6 calling card with a gold seal",
    downloads: [
      {
        label: "Download A6 card",
        note: "Actual size",
        size: "44 KB",
        href: `${downloadRoot}/07-with-compliments-a6.pdf`,
      },
      {
        label: "Download print sheet",
        note: "Four-up A4 with cut marks",
        size: "69 KB",
        href: `${downloadRoot}/07-with-compliments-a4-four-up-print-sheet.pdf`,
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
      "A narrow, believable paper object with the correct amount of civic theatre and no invented historic date or signature.",
    practical: "Fill the issued-to, serial and date fields, or print three tickets on one A4 sheet and cut on the supplied marks.",
    format: "80 x 180 mm + three-up A4",
    preview: "/images/ziggy/stationery/08-commemorative-archive-ticket-fillable.webp",
    previewAlt: "Tall Ziggy commemorative archive ticket with receipt language and fillable issue fields",
    downloads: [
      {
        label: "Download fillable ticket",
        note: "Actual size",
        size: "70 KB",
        href: `${downloadRoot}/08-commemorative-archive-ticket-fillable.pdf`,
      },
      {
        label: "Download print sheet",
        note: "Three-up A4 with cut marks",
        size: "69 KB",
        href: `${downloadRoot}/08-archive-ticket-a4-three-up-print-sheet.pdf`,
      },
    ],
  },
];

const filters: Array<"All" | Category> = ["All", "Correspondence", "Archive", "Ceremony", "Ephemera"];

export function StationeryCupboard() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [activeId, setActiveId] = useState(drawers[0].id);

  const visibleDrawers = useMemo(
    () => drawers.filter((drawer) => filter === "All" || drawer.category === filter),
    [filter],
  );

  const active = drawers.find((drawer) => drawer.id === activeId) ?? visibleDrawers[0] ?? drawers[0];

  function chooseFilter(next: "All" | Category) {
    setFilter(next);
    const first = drawers.find((drawer) => next === "All" || drawer.category === next);
    if (first) setActiveId(first.id);
  }

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#cupboard">
        Skip to the drawers
      </a>

      <header className={styles.topbar}>
        <a href="/archive" className={styles.backLink}>
          ← Working Archive
        </a>
        <div className={styles.topLinks}>
          <a href="/archive/images">Image Room</a>
          <a href="/">Exhibition</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Old Vic State · Paper Department · Frankston 3196</p>
          <h1>
            THE STATIONERY
            <span>CUPBOARD</span>
          </h1>
          <p className={styles.heroDeck}>
            Eight useful papers dressed with considerably more dignity than the situation requires. Browse a drawer, inspect the actual page, then take one sheet or the entire administration home.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={`${downloadRoot}/ZIGGY_STATIONERY_CUPBOARD_2026.zip`} download>
              Download the entire cupboard
              <span>Complete ZIP · 7.7 MB</span>
            </a>
            <a className={styles.secondaryAction} href={`${downloadRoot}/ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf`} download>
              Combined eight-page suite
            </a>
          </div>
        </div>

        <div className={styles.heroCabinet} aria-hidden="true">
          <div className={styles.cabinetCrown}>Z</div>
          <div className={styles.cabinetDoors}>
            <span>Correspondence</span>
            <span>Archive</span>
            <span>Ceremony</span>
            <span>Ephemera</span>
          </div>
          <p>Eight papers. One unnecessarily complete local administration.</p>
        </div>
      </section>

      <section className={styles.facts} aria-label="Stationery pack summary">
        <div><strong>08</strong><span>finished paper objects</span></div>
        <div><strong>06</strong><span>digitally fillable working forms</span></div>
        <div><strong>00</strong><span>raw moodboard crops remaining</span></div>
      </section>

      <section className={styles.cupboardSection} id="cupboard">
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>The drawers</p>
            <h2>Browse before issuing anything official-looking.</h2>
          </div>
          <p>
            Select a brass label to inspect the page. Each download is a finished object, not a screenshot. Old Vic State remains an explicitly fictional ceremonial layer throughout.
          </p>
        </header>

        <nav className={styles.filters} aria-label="Filter stationery drawers">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? styles.filterActive : styles.filterButton}
              onClick={() => chooseFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className={styles.cupboardLayout}>
          <div className={styles.drawerCabinet}>
            <div className={styles.drawerGrid}>
              {visibleDrawers.map((drawer) => (
                <button
                  type="button"
                  key={drawer.id}
                  className={active.id === drawer.id ? styles.drawerActive : styles.drawer}
                  onClick={() => setActiveId(drawer.id)}
                  aria-pressed={active.id === drawer.id}
                >
                  <span className={styles.drawerNumber}>{drawer.number}</span>
                  <span className={styles.drawerTitle}>{drawer.shortTitle}</span>
                  <span className={styles.drawerHandle} aria-hidden="true" />
                  <small>{drawer.rank}</small>
                </button>
              ))}
            </div>
            <p className={styles.cabinetNotice}>Fictional ceremonial furniture · practical contemporary files</p>
          </div>

          <article className={styles.inspectionPanel} aria-live="polite">
            <div className={styles.documentStage} data-shape={active.id === "compliments" ? "landscape" : active.id === "archive-ticket" ? "ticket" : "a4"}>
              <Image
                key={active.preview}
                src={active.preview}
                alt={active.previewAlt}
                fill
                sizes="(max-width: 900px) 92vw, 42vw"
                className={styles.documentImage}
              />
            </div>
            <div className={styles.inspectionCopy}>
              <div className={styles.inspectionMeta}>
                <span>{active.number} / {active.category}</span>
                <span>{active.format}</span>
              </div>
              <h3>{active.title}</h3>
              <p className={styles.rank}>{active.rank}</p>
              <p>{active.description}</p>
              <div className={styles.practicalNote}>
                <strong>Practical bit</strong>
                <span>{active.practical}</span>
              </div>
              <div className={styles.downloadList}>
                {active.downloads.map((download) => (
                  <a key={download.href} href={download.href} download>
                    <span><strong>{download.label}</strong><small>{download.note}</small></span>
                    <b>{download.size} ↓</b>
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.issueDesk}>
        <div>
          <p className={styles.eyebrow}>Issue desk</p>
          <h2>Take the lot, or take precisely one ridiculous form.</h2>
          <p>The complete pack includes all individual PDFs, both print sheets, the combined suite, a manifest and plain-English printing instructions.</p>
        </div>
        <div className={styles.issueActions}>
          <a href={`${downloadRoot}/ZIGGY_STATIONERY_CUPBOARD_2026.zip`} download>
            <span>Complete cupboard</span><strong>ZIP · 7.7 MB</strong>
          </a>
          <a href={`${downloadRoot}/ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf`} download>
            <span>Combined stationery suite</span><strong>PDF · 4.4 MB</strong>
          </a>
          <a href={`${downloadRoot}/README.txt`} download>
            <span>Printing instructions</span><strong>TXT · tiny</strong>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>OLD VIC STATE IS FICTIONAL. It is not a historic Victorian government identity, public authority or endorsement.</p>
        <div><a href="/archive/images#stationery">Image Room</a><a href="/archive">Working Archive</a></div>
      </footer>
    </main>
  );
}
