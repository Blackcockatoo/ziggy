import type { Metadata } from "next";
import Image from "next/image";
import { LegacyImageGallery } from "@/components/legacy-image-gallery";
import { visualArchiveChapters, visualArchiveItems } from "@/content/visual-archive";
import styles from "./visual-archive.module.css";

export const metadata: Metadata = {
  title: "Ziggy — The Image Room",
  description:
    "The audited visual archive behind Ziggy: reference images, Old Vic stationery, air-freshener studies, playing cards, calendars and ephemera.",
};

const rooms = [
  ["references", "References"],
  ["legacy", "Legacy 44"],
  ["stationery", "Stationery"],
  ["fresheners", "Fresheners"],
  ["cards", "Cards"],
  ["calendar", "Calendar"],
  ["ephemera", "Ephemera"],
] as const;

const stats = [
  ["44", "legacy chat images retained"],
  ["5", "later production systems recovered"],
  ["0", "new images generated in this audit"],
] as const;

const freshenerVariants = [
  "THE ZIG — master recognition mark",
  "THE TRAY — quietest extension",
  "3196 — place / provenance",
  "THE BOW — gold-centre geometry",
  "THE CARD — deck crossover",
  "THE CREST — ceremonial Old Vic",
];

const cardSet = [
  "King of Spades — Gentleman of the Old Vic State",
  "Queen of Hearts — Lady of the Bay",
  "Jack of Clubs — the local lad",
  "Ace of Spades — heraldic Ziggy",
  "Joker — the monkey breaks the rules",
  "Two-way back — the Sugar-Free Zig test",
];

function Plate({
  src,
  alt,
  ratio,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.plate} style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 760px) 100vw, (max-width: 1200px) 78vw, 960px"
        className={styles.plateImage}
      />
    </div>
  );
}

function SectionHead({
  number,
  eyebrow,
  title,
  copy,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.sectionNumber}>{number}</span>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        <p className={styles.lead}>{copy}</p>
      </div>
    </header>
  );
}

export default function VisualArchivePage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a href="/archive" className={styles.backLink}>
          ← Working Archive
        </a>
        <span className={styles.topLabel}>Visual audit · 23 Aug 2026</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The working visual archive · Frankston 3196</p>
          <h1>
            THE IMAGE
            <span>ROOM</span>
          </h1>
          <p className={styles.heroDeck}>
            The project was bigger than the first upload suggested. This audit pulls the useful image work back together: the original references, the older forty-four-image chat archive, Old Vic stationery, the air-freshener system, a proper card deck, the Frankston calendar studies and the small commemorative objects around them.
          </p>
          <p className={styles.auditNote}>
            Nothing on this page was newly generated for the audit. Existing project images were recovered, grouped and re-filed so the archive finally shows the breadth of the work.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src="/images/ziggy/character/ziggy-with-tray.webp"
            alt="Ziggy holding the silver tray"
            fill
            priority
            sizes="(max-width: 840px) 100vw, 42vw"
            className={styles.heroImage}
          />
          <div className={styles.heroStamp}>
            <span>AUDITED</span>
            <b>3196</b>
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Archive audit summary">
        {stats.map(([value, label]) => (
          <div key={label} className={styles.stat}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <nav className={styles.roomNav} aria-label="Image room sections">
        {rooms.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <section className={`${styles.section} ${styles.paper}`} id="references">
        <SectionHead
          number="00"
          eyebrow="Anchor material"
          title="Start with the monkey that actually exists."
          copy="The full-body tray reference and the thirty-year anniversary image remain the visual anchors. They are not interchangeable with later creative studies: one helps us look closely at the physical character; the other records how the anniversary idea first announced itself."
        />
        <div className={styles.referenceGrid}>
          <figure className={styles.figureCard}>
            <div className={styles.referenceImage}>
              <Image
                src="/images/ziggy/character/ziggy-with-tray.webp"
                alt="Full-body Ziggy tray reference"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className={styles.coverContain}
              />
            </div>
            <figcaption>
              <span>Physical character reference</span>
              <small>Ear construction · grin · gold knot · harlequin · silver tray</small>
            </figcaption>
          </figure>
          <figure className={styles.figureCard}>
            <div className={styles.referenceImage}>
              <Image
                src="/images/ziggy/anniversary/thirty-years-poster.webp"
                alt="Ziggy thirty years anniversary concept poster"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className={styles.coverContain}
              />
            </div>
            <figcaption>
              <span>Thirty-year anniversary concept</span>
              <small>Creative campaign material · not historical evidence by itself</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.night}`} id="legacy">
        <SectionHead
          number="01"
          eyebrow="Recovered chat archive"
          title="The forty-four are back on the wall."
          copy="What was compressed into one contact sheet is now a proper browsable collection: two supplied references, forty-two creative studies and a separate Ziggy museum note for every image. Funny where the work invites it, serious where the archive needs it, and always clear about what is reference, invention or folklore."
        />
        <LegacyImageGallery items={visualArchiveItems} chapters={visualArchiveChapters} />
      </section>

      <section className={`${styles.section} ${styles.green}`} id="stationery">
        <SectionHead
          number="02"
          eyebrow="Old Vic State · ceremonial layer"
          title="The stationery is where the joke learned manners."
          copy="Letterheads, envelopes, certificates, seals, heraldry and restrained brand sheets turn Old Vic State into useful visual theatre. It works because it behaves with institutional confidence while remaining explicitly fictional."
        />
        <div className={styles.splitFeature}>
          <Plate
            src="/images/ziggy/archive-audit/brand-stationery.webp"
            alt="Audited Ziggy Old Vic stationery, letterhead, heraldic and identity studies"
            ratio="420 / 319"
          />
          <aside className={styles.sideNote}>
            <p className={styles.eyebrow}>What survived the audit</p>
            <h3>Keep the bureaucracy beautiful.</h3>
            <ul>
              <li>letterhead + envelope system</li>
              <li>certificate / proclamation language</li>
              <li>invented crest + seal family</li>
              <li>Frankston 3196 provenance</li>
              <li>bottle green, cream, black and restrained gold</li>
            </ul>
            <p className={styles.warning}>OLD VIC STATE IS FICTIONAL. Never present the stationery as a historic Victorian government identity or endorsement.</p>
            <a className={styles.cupboardLink} href="/archive/stationery">
              Open the Stationery Cupboard
              <span>Browse and download all eight finished objects →</span>
            </a>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.paper}`} id="fresheners">
        <SectionHead
          number="03"
          eyebrow="The little moving sign"
          title="The air freshener became the cleanest recognition test."
          copy="This is the moment the project stops asking whether a funny monkey can go on merchandise and starts asking what the smallest learnable Ziggy might be. The strongest answer is not a face — it is a proprietary silhouette."
        />
        <div className={styles.splitFeatureReverse}>
          <aside className={styles.sideNoteDark}>
            <p className={styles.eyebrow}>Master recommendation</p>
            <h3>THE ZIG</h3>
            <p>Two exaggerated ear curves. One small gold centre. One shallow silver tray interruption. One cream diamond only when it helps. Tiny 3196 on the reverse.</p>
            <ol className={styles.compactList}>
              {freshenerVariants.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className={styles.rule}>Object first. Advertisement second.</p>
          </aside>
          <Plate
            src="/images/ziggy/archive-audit/air-freshener-system.webp"
            alt="Ziggy custom air freshener concept system including The Zig, tray, bow, crest and 3196 variants"
            ratio="420 / 280"
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.night}`} id="cards">
        <SectionHead
          number="04"
          eyebrow="Premium artefact"
          title="A real deck first. Ziggy theatre second."
          copy="The card work is strongest when conventional playing-card mechanics are boringly good: instant indices, two-way symmetry, familiar suits and a restrained back. The mythology lives inside those rules rather than replacing them."
        />
        <div className={styles.splitFeature}>
          <Plate
            src="/images/ziggy/archive-audit/playing-cards.webp"
            alt="Old Vic Ziggy playing-card studies with King, Queen, Jack, Ace, Joker and card back"
            ratio="340 / 334"
          />
          <aside className={styles.sideNoteNight}>
            <p className={styles.eyebrow}>Recovered card suite</p>
            <ol className={styles.compactList}>
              {cardSet.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className={styles.rule}>The back is one of the earliest serious Sugar-Free Zig tests.</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.paper}`} id="calendar">
        <SectionHead
          number="05"
          eyebrow="Frankston leads"
          title="Full Zig. Mild Zig. Sugar-Free Zig."
          copy="The calendar solved the scale problem. One place can be expressed at three strengths without inventing three brands: Ziggy can be the subject, become the host, or recede until only visual DNA remains."
        />
        <Plate
          src="/images/ziggy/archive-audit/calendar-jan-jun.webp"
          alt="Frankston Ziggy calendar studies showing Full Zig, Mild Zig and Sugar-Free Zig approaches"
          ratio="420 / 290"
        />
        <div className={styles.threeDial}>
          <article>
            <span>FULL ZIG</span>
            <b>Ziggy is the subject.</b>
          </article>
          <article>
            <span>MILD ZIG</span>
            <b>Frankston leads; Ziggy hosts.</b>
          </article>
          <article>
            <span>SUGAR-FREE ZIG</span>
            <b>The brand survives as visual DNA.</b>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.green}`} id="ephemera">
        <SectionHead
          number="06"
          eyebrow="Small evidence of a large world"
          title="Stamps, receipts and paper scraps make the fiction feel handled."
          copy="The best ceremonial pieces look as if they might have lived in a drawer for years. The commemorative stamp and thirty-year receipt are useful because they translate the larger system into humble, believable paper objects."
        />
        <div className={styles.splitFeature}>
          <Plate
            src="/images/ziggy/archive-audit/ephemera.webp"
            alt="Ziggy commemorative stamp and thirty-year receipt concept studies"
            ratio="420 / 264"
          />
          <aside className={styles.sideNote}>
            <p className={styles.eyebrow}>Application rule</p>
            <h3>Make artefacts, not a merch catalogue.</h3>
            <p>The strongest objects either teach a distinctive Ziggy asset or gain meaning because of the Ziggy story. If an object does neither, it probably does not need to exist.</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.auditResult}`} id="result">
        <SectionHead
          number="07"
          eyebrow="Audit result"
          title="One visual system, not six unrelated ideas."
          copy="The useful material now points in the same direction: repeat fewer things, more confidently. Keep the full monkey for theatre. Let the expensive and everyday objects learn how to survive on less."
        />
        <div className={styles.minimumMark}>
          <div><span>01</span><b>Paired ear curves</b><small>shape</small></div>
          <div><span>02</span><b>Small gold centre</b><small>colour cue</small></div>
          <div><span>03</span><b>Silver tray stroke</b><small>behaviour / offer</small></div>
          <div><span>04</span><b>Frankston 3196</b><small>provenance when space permits</small></div>
        </div>
        <blockquote>
          How little Ziggy can remain before Ziggy disappears?
        </blockquote>
        <footer className={styles.footer}>
          <div>
            <p className={styles.eyebrow}>Archive discipline</p>
            <p>Creative study ≠ historical evidence. Old Vic State ≠ government identity. Product imagination ≠ owner approval. The archive keeps those boundaries visible because that is what lets the strange stuff stay strange.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="/archive">Working Archive</a>
            <a href="/">Exhibition</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
