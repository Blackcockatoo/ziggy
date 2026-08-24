"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type {
  VisualArchiveChapter,
  VisualArchiveChapterId,
  VisualArchiveItem,
} from "@/content/visual-archive";
import styles from "./legacy-image-gallery.module.css";

type GalleryFilter = "all" | VisualArchiveChapterId;

type LegacyImageGalleryProps = {
  items: readonly VisualArchiveItem[];
  chapters: readonly VisualArchiveChapter[];
};

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

export function LegacyImageGallery({ items, chapters }: LegacyImageGalleryProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const visibleItems = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.chapter === filter)),
    [filter, items],
  );

  if (items.length === 0) return null;

  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const visibleIndex = Math.max(
    0,
    visibleItems.findIndex((item) => item.id === selected.id),
  );
  const selectedChapter = chapters.find((chapter) => chapter.id === selected.chapter);

  function move(direction: -1 | 1) {
    if (visibleItems.length === 0) return;
    const nextIndex = (visibleIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex].id);
  }

  function chooseFilter(nextFilter: GalleryFilter) {
    setFilter(nextFilter);
    if (nextFilter === "all") return;
    const firstInChapter = items.find((item) => item.chapter === nextFilter);
    if (firstInChapter && firstInChapter.chapter !== selected.chapter) {
      setSelectedId(firstInChapter.id);
    }
  }

  function openDialog() {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <section
      className={styles.gallery}
      aria-label="Browse the forty-four legacy Ziggy images"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "Home" && visibleItems[0]) {
          event.preventDefault();
          setSelectedId(visibleItems[0].id);
        }
        if (event.key === "End" && visibleItems.at(-1)) {
          event.preventDefault();
          setSelectedId(visibleItems.at(-1)!.id);
        }
      }}
    >
      <div className={styles.filters} role="group" aria-label="Filter image collection">
        <button
          type="button"
          className={filter === "all" ? styles.filterActive : styles.filterButton}
          aria-pressed={filter === "all"}
          onClick={() => chooseFilter("all")}
        >
          All <span>{items.length}</span>
        </button>
        {chapters.map((chapter) => {
          const count = items.filter((item) => item.chapter === chapter.id).length;
          return (
            <button
              type="button"
              key={chapter.id}
              className={filter === chapter.id ? styles.filterActive : styles.filterButton}
              aria-pressed={filter === chapter.id}
              onClick={() => chooseFilter(chapter.id)}
            >
              {chapter.shortLabel} <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.viewer}>
        <div className={styles.imageColumn}>
          <button
            type="button"
            className={styles.imageButton}
            onClick={openDialog}
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(distance) < 54) return;
              move(distance > 0 ? -1 : 1);
            }}
            aria-label={`Enlarge ${selected.title}`}
          >
            <span
              className={styles.imageStage}
              data-orientation={selected.width > selected.height ? "landscape" : "portrait"}
              style={{ aspectRatio: `${selected.width} / ${selected.height}` }}
            >
              <Image
                key={selected.id}
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="(max-width: 820px) 94vw, (max-width: 1280px) 57vw, 760px"
                className={styles.mainImage}
              />
              <span className={styles.enlargeHint}>Open full view</span>
            </span>
          </button>

          <div className={styles.controls}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous image">
              <span aria-hidden="true">←</span> Previous
            </button>
            <p aria-live="polite">
              <b>{twoDigits(selected.number)}</b>
              <span>/ {twoDigits(items.length)}</span>
            </p>
            <button type="button" onClick={() => move(1)} aria-label="Next image">
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <article className={styles.caption} aria-live="polite">
          <div className={styles.captionTopline}>
            <span>{selectedChapter?.label}</span>
            <span>{selected.mood}</span>
          </div>
          <p className={selected.status === "Original reference" ? styles.referenceStatus : styles.studyStatus}>
            {selected.status}
          </p>
          <span className={styles.bigNumber} aria-hidden="true">
            {twoDigits(selected.number)}
          </span>
          <h3>{selected.title}</h3>
          <p className={styles.commentary}>{selected.commentary}</p>
          <div className={styles.archiveRule}>
            {selected.status === "Original reference" ? (
              <>
                <b>Archive note</b>
                <span>Reference material is preserved as supplied; identities and history are not inferred from the image alone.</span>
              </>
            ) : (
              <>
                <b>Ziggy’s licence</b>
                <span>Atmosphere and interpretation only. This image is not documentary evidence.</span>
              </>
            )}
          </div>
        </article>
      </div>

      <div className={styles.thumbHeader}>
        <p>{filter === "all" ? "The complete contact rail" : selectedChapter?.label}</p>
        <span>Tap a plate · swipe the large image · arrow keys also work</span>
      </div>

      <div className={styles.thumbnails}>
        {visibleItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === selected.id ? styles.thumbnailActive : styles.thumbnail}
            onClick={() => setSelectedId(item.id)}
            aria-label={`Show ${twoDigits(item.number)} — ${item.title}`}
            aria-current={item.id === selected.id ? "true" : undefined}
          >
            <span className={styles.thumbnailImage}>
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 620px) 22vw, (max-width: 1000px) 14vw, 110px"
                className={styles.thumbnailPhoto}
              />
            </span>
            <span className={styles.thumbnailNumber}>{twoDigits(item.number)}</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`${selected.title}, full image view`}
        onClick={(event) => {
          if (event.currentTarget === event.target) closeDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            event.stopPropagation();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            move(1);
          }
        }}
      >
        <div className={styles.dialogShell}>
          <header className={styles.dialogHeader}>
            <div>
              <span>{twoDigits(selected.number)} / {twoDigits(items.length)}</span>
              <b>{selected.title}</b>
            </div>
            <button type="button" onClick={closeDialog} aria-label="Close full image view">
              Close <span aria-hidden="true">×</span>
            </button>
          </header>
          <div className={styles.dialogImage}>
            <Image
              key={`dialog-${selected.id}`}
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="96vw"
              className={styles.dialogPhoto}
            />
          </div>
          <footer className={styles.dialogFooter}>
            <button type="button" onClick={() => move(-1)}>
              ← Previous
            </button>
            <p>{selected.commentary}</p>
            <button type="button" onClick={() => move(1)}>
              Next →
            </button>
          </footer>
        </div>
      </dialog>
    </section>
  );
}
