"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  stationeryDrawers,
  stationeryFilters,
  type StationeryFilter,
} from "@/content/stationery";
import styles from "./stationery.module.css";

const downloadRoot = "/downloads/ziggy-stationery";

export function StationeryCupboard() {
  const [filter, setFilter] = useState<StationeryFilter>("All");
  const [activeId, setActiveId] = useState(stationeryDrawers[0].id);

  const visibleDrawers = stationeryDrawers.filter(
    (drawer) => filter === "All" || drawer.category === filter,
  );

  const active =
    stationeryDrawers.find((drawer) => drawer.id === activeId) ??
    visibleDrawers[0] ??
    stationeryDrawers[0];
  const hasWorkingEdition = active.downloads.some(
    (download) => download.edition === "working",
  );

  function chooseFilter(next: StationeryFilter) {
    setFilter(next);
    const first = stationeryDrawers.find(
      (drawer) => next === "All" || drawer.category === next,
    );
    if (first) setActiveId(first.id);
  }

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#cupboard">
        Skip to the drawers
      </a>

      <header className={styles.topbar}>
        <Link href="/archive" className={styles.backLink}>
          ← Working Archive
        </Link>
        <div className={styles.topLinks}>
          <Link href="/archive/images">Image Room</Link>
          <Link href="/">Exhibition</Link>
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
            Ten useful and ceremonial papers, now gathered into one properly dressed local administration. Browse a drawer, inspect the actual artwork, then take one sheet or the entire cupboard home.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={`${downloadRoot}/ZIGGY_STATIONERY_CUPBOARD_2026.zip`} download>
              Download the entire cupboard
              <span>Complete ZIP · all editions</span>
            </a>
            <a className={styles.secondaryAction} href={`${downloadRoot}/ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf`} download>
              Combined ten-page regal suite
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
          <p>Ten papers. One unnecessarily complete local administration.</p>
        </div>
      </section>

      <section className={styles.facts} aria-label="Stationery pack summary">
        <div><strong>10</strong><span>finished regal paper objects</span></div>
        <div><strong>06</strong><span>digitally fillable working forms</span></div>
        <div><strong>00</strong><span>claims to actual public authority</span></div>
      </section>

      <section className={styles.cupboardSection} id="cupboard">
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>The drawers</p>
            <h2>Browse before issuing anything official-looking.</h2>
          </div>
          <p>
            Select a brass label to inspect the supplied artwork. Regal print editions sit beside the existing practical files; Old Vic State remains an explicitly fictional ceremonial layer throughout.
          </p>
        </header>

        <nav className={styles.filters} aria-label="Filter stationery drawers">
          {stationeryFilters.map((item) => (
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
                  aria-label={`Open ${drawer.title}`}
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

          <article className={styles.inspectionPanel} aria-live="polite" aria-atomic="true">
            <div className={styles.documentStage} data-shape={active.previewShape}>
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
              <p className={styles.editionFlag}>
                Regal artwork edition · {hasWorkingEdition ? "working file preserved" : "fictional souvenir"}
              </p>
              <p>{active.description}</p>
              <div className={styles.practicalNote}>
                <strong>Practical bit</strong>
                <span>{active.practical}</span>
              </div>
              <div className={styles.downloadList}>
                {active.downloads.map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    download
                    data-edition={download.edition}
                  >
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
          <p>The complete pack includes all ten regal prints, every existing working PDF and cut sheet, both combined suites, a manifest and plain-English printing instructions.</p>
        </div>
        <div className={styles.issueActions}>
          <a href={`${downloadRoot}/ZIGGY_STATIONERY_CUPBOARD_2026.zip`} download>
            <span>Complete cupboard</span><strong>ZIP · all files</strong>
          </a>
          <a href={`${downloadRoot}/ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf`} download>
            <span>Combined regal suite</span><strong>PDF · 10 pages</strong>
          </a>
          <a href={`${downloadRoot}/ZIGGY_OLD_VIC_STATE_WORKING_STATIONERY_SUITE_2026.pdf`} download>
            <span>Combined working suite</span><strong>PDF · 8 pages</strong>
          </a>
          <a href={`${downloadRoot}/README.txt`} download>
            <span>Printing instructions</span><strong>TXT · tiny</strong>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>OLD VIC STATE IS FICTIONAL. It is not a historic Victorian government identity, public authority or endorsement.</p>
        <div><Link href="/archive/images#stationery">Image Room</Link><Link href="/archive">Working Archive</Link></div>
      </footer>
    </main>
  );
}
