"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./archive.module.css";

type ZigMode = "full" | "mild" | "sugar";
type EvidenceStatus = "documented" | "confirm" | "lore" | "creative";
type DecisionState = "keep" | "park" | "confirm";

type WorkbenchEntry = {
  date: string;
  tag: string;
  title: string;
  body: string;
};

const evidence: Array<{
  claim: string;
  status: EvidenceStatus;
  note: string;
}> = [
  {
    claim: "The exhibition is anchored to a real Frankston shop and a real physical monkey figure.",
    status: "documented",
    note: "Use the current exhibition source model for exact citations and public evidence.",
  },
  {
    claim: "The thirty-year story is framed as 1996–2026.",
    status: "documented",
    note: "The anniversary language is established in the exhibition; exact opening-day precision remains a primary-source question.",
  },
  {
    claim: "Every monkey name and physical succession is fully settled.",
    status: "confirm",
    note: "Keep Archie / Ziggie / replacement language separate until the owners or primary material settle the chain.",
  },
  {
    claim: "The Lucky Monkey Shop is formal historic naming.",
    status: "lore",
    note: "Treat it as local/customer language unless a formal source establishes otherwise.",
  },
  {
    claim: "Old Vic State was a real Victorian government institution.",
    status: "creative",
    note: "It is deliberately fictional visual theatre. Never imply government endorsement or historical existence.",
  },
];

const workbench: WorkbenchEntry[] = [
  {
    date: "19 AUG 2026",
    tag: "ORIGIN",
    title: "The monkey becomes an exhibition",
    body: "The thirty-year shop story becomes a serious Frankston exhibition and Ziggy starts behaving like an oracle rather than a decoration.",
  },
  {
    date: "19 AUG 2026",
    tag: "TRUTH",
    title: "No invented owner testimony",
    body: "Copy is tightened so Rob and Carla are never implied to have been interviewed or to have supplied records before they actually do.",
  },
  {
    date: "21 AUG 2026",
    tag: "RESEARCH",
    title: "Owner effort gets stripped back",
    body: "Public research is separated from owner-only questions so they can steer the project without being handed a homework assignment.",
  },
  {
    date: "22 AUG 2026",
    tag: "ART",
    title: "Museum × shop window × penny arcade",
    body: "Dead-serious archival discipline stays on the surface; strange local symbolism moves underneath it.",
  },
  {
    date: "22 AUG 2026",
    tag: "OBJECT",
    title: "The tray becomes the verb",
    body: "It stops being a prop. Ziggy offers: a fortune, a card, a ticket, a caption, a decision.",
  },
  {
    date: "22 AUG 2026",
    tag: "BRAND",
    title: "Frankston 3196",
    body: "Place becomes provenance. The strongest brand language is geographic before it is corporate.",
  },
  {
    date: "22 AUG 2026",
    tag: "SYSTEM",
    title: "Full Zig / Mild Zig / Sugar-Free Zig",
    body: "One visual system gains three strengths: character, host and learned visual DNA.",
  },
  {
    date: "22 AUG 2026",
    tag: "PLACE",
    title: "Frankston stops being background",
    body: "The calendar idea changes when the month begins with a Frankston mood, then decides how much Ziggy to add.",
  },
  {
    date: "23 AUG 2026",
    tag: "OBJECT",
    title: "The little moving sign",
    body: "The air freshener becomes a recognition experiment: silhouette at distance, ear/knot/tray at mid-range, provenance up close.",
  },
  {
    date: "23 AUG 2026",
    tag: "AIM",
    title: "Minimum Ziggy",
    body: "The project crystallises around one test: how little Ziggy can remain before Ziggy disappears?",
  },
];

const objectStudies = [
  {
    id: "freshener",
    name: "The Zig",
    type: "High circulation",
    headline: "The little moving sign",
    copy: "A proprietary hanging silhouette. It should be desirable without explanation and identifiable from outside a car once the code has been learned.",
    cues: ["ear curve", "gold knot", "silver tray line", "one cream diamond", "3196"],
  },
  {
    id: "cards",
    name: "Old Vic Deck",
    type: "Premium artefact",
    headline: "A proper playing deck first",
    copy: "King, Queen, Jack, Ace and two Jokers let the Old Vic world feel ceremonial while still obeying real playing-card logic.",
    cues: ["rotational symmetry", "traditional indices", "engraved linework", "restrained colour", "sugar-free back"],
  },
  {
    id: "calendar",
    name: "Frankston Calendar",
    type: "Place system",
    headline: "One month, three Zig strengths",
    copy: "The month begins with Frankston as the subject. Ziggy can then be the hero, the host, or almost completely absent.",
    cues: ["place first", "seasonal memory", "full/mild/sugar-free", "collectible print", "restrained calendar grid"],
  },
  {
    id: "oldvic",
    name: "Old Vic State",
    type: "Ceremonial language",
    headline: "Beautiful bureaucratic redundancy",
    copy: "Letterheads, seals, certificates and file furniture behave as if Ziggy has always had his own impossibly dignified civic department.",
    cues: ["invented heraldry", "bottle green", "tarnished gold", "archive numbering", "explicitly fictional"],
  },
  {
    id: "apparel",
    name: "Ziggy Standard",
    type: "Premium restraint",
    headline: "The less monkey rule",
    copy: "Full Ziggy is reserved for theatre. Better objects can survive on provenance, a tray mark, a check fragment and the right proportions.",
    cues: ["small mark", "heavy fabric", "woven label", "3196", "one recurring irregularity"],
  },
];

const steeringItems = [
  "Full / Mild / Sugar-Free as the master creative dial",
  "Frankston 3196 as provenance language",
  "Old Vic State as an explicitly fictional ceremonial layer",
  "Air freshener as the first recognition experiment",
  "Playing cards as a premium artefact",
  "Calendar as a Frankston-first place system",
];

function statusLabel(status: EvidenceStatus) {
  if (status === "documented") return "Documented";
  if (status === "confirm") return "Needs confirming";
  if (status === "lore") return "Local lore";
  return "Creative interpretation";
}

export function ArchiveExperience() {
  const [zigMode, setZigMode] = useState<ZigMode>("full");
  const [evidenceFilter, setEvidenceFilter] = useState<"all" | EvidenceStatus>("all");
  const [workbenchFilter, setWorkbenchFilter] = useState("ALL");
  const [workbenchSearch, setWorkbenchSearch] = useState("");
  const [activeObject, setActiveObject] = useState(objectStudies[0].id);
  const [distance, setDistance] = useState(88);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, DecisionState>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ziggy-archive-steering");
      if (saved) setDecisions(JSON.parse(saved) as Record<string, DecisionState>);
    } catch {
      // Local steering is convenience only; the archive still works without it.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("ziggy-archive-steering", JSON.stringify(decisions));
    } catch {
      // Ignore storage failures in private / restricted browsers.
    }
  }, [decisions]);

  const filteredEvidence = useMemo(
    () => evidence.filter((item) => evidenceFilter === "all" || item.status === evidenceFilter),
    [evidenceFilter],
  );

  const filteredWorkbench = useMemo(() => {
    const term = workbenchSearch.trim().toLowerCase();
    return workbench.filter((item) => {
      const matchesTag = workbenchFilter === "ALL" || item.tag === workbenchFilter;
      const matchesTerm =
        !term ||
        `${item.date} ${item.tag} ${item.title} ${item.body}`.toLowerCase().includes(term);
      return matchesTag && matchesTerm;
    });
  }, [workbenchFilter, workbenchSearch]);

  const selectedObject = objectStudies.find((item) => item.id === activeObject) ?? objectStudies[0];
  const distanceState = distance > 68 ? "near" : distance > 34 ? "mid" : "far";

  function cycleDecision(item: string) {
    setDecisions((current) => {
      const next: DecisionState = current[item] === "keep" ? "park" : current[item] === "park" ? "confirm" : "keep";
      return { ...current, [item]: next };
    });
  }

  function exportSteering() {
    const lines = [
      "ZIGGY — OWNER STEERING NOTES",
      "",
      ...steeringItems.map((item) => `- ${decisions[item] ?? "unmarked"}: ${item}`),
      "",
      "Generated locally from the Working Archive.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "ziggy-steering-notes.txt";
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className={styles.appShell}>
      <div className={styles.progress} style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className={styles.topbar}>
        <a href="/" className={styles.brandLink} aria-label="Back to the exhibition">
          <span className={styles.brandMonogram}>M</span><span>The Monkey Shop</span>
        </a>
        <nav className={styles.quickNav} aria-label="Working archive sections">
          <a href="#truth">Truth</a><a href="#anatomy">Anatomy</a><a href="#dial">Zig Dial</a><a href="#objects">Objects</a><a href="#workbench">Workbench</a>
        </nav>
        <a href="#steer" className={styles.steerLink}>Steer it</a>
      </header>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Working Archive · Frankston 3196 · 1996–2026</p>
            <h1>ZIGGY<span>Thirty Years in Frankston</span></h1>
            <p className={styles.heroDeck}>Exhibition on the surface. Dossier underneath. Workbench in the seams. One strange local object becoming a visual language without pretending the myth is history.</p>
            <div className={styles.heroActions}>
              <a href="#orientation" className={styles.primaryAction}>Open the archive</a><a href="/" className={styles.secondaryAction}>Return to exhibition</a>
            </div>
            <p className={styles.heroLine}>The people change. The monkey remains.</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.halo} aria-hidden="true" />
            <Image src="/images/ziggy/character/ziggy-with-tray.webp" alt="Ziggy holding the silver tray" fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.heroImage} />
            <span className={`${styles.callout} ${styles.calloutEar}`}>ear</span><span className={`${styles.callout} ${styles.calloutKnot}`}>gold knot</span><span className={`${styles.callout} ${styles.calloutTray}`}>tray / offer</span>
          </div>
        </section>

        <section className={`${styles.section} ${styles.paperSection}`} id="orientation">
          <SectionHeading number="00" eyebrow="Orientation" title="Not a branding proposal. An archive box." copy="The page has to work at three speeds: beautiful enough to browse, disciplined enough to verify, and transparent enough to show how the thinking evolved." />
          <div className={styles.threeUp}>
            <InfoCard eyebrow="Layer I" title="The Exhibition">Big image, sparse text, objects, dates and atmosphere. The owners should be able to enjoy it without studying it.</InfoCard>
            <InfoCard eyebrow="Layer II" title="The Dossier">Evidence states, provenance, design rationale and the points still waiting on primary confirmation.</InfoCard>
            <InfoCard eyebrow="Layer III" title="The Workbench">The named turns, wrong turns, surviving phrases and object experiments that show how the system formed.</InfoCard>
          </div>
          <blockquote className={styles.bigQuote}>The project did not begin by inventing a brand. It began by looking hard enough at something that had already survived thirty years to discover the <em>brand hiding inside it.</em></blockquote>
        </section>

        <section className={`${styles.section} ${styles.nightSection}`} id="truth">
          <SectionHeading number="01" eyebrow="The monkey was already there" title="Truth first. Myth second." copy="The archive does not become weaker when it says ‘needs confirming’. That is the discipline that gives the stranger parts permission to breathe." invert />
          <div className={styles.truthLayout}>
            <button type="button" className={styles.posterButton} onClick={() => setSelectedImage("/images/ziggy/anniversary/thirty-years-poster.webp")} aria-label="Open the thirty years poster">
              <Image src="/images/ziggy/anniversary/thirty-years-poster.webp" alt="Thirty years anniversary poster" fill sizes="(max-width: 900px) 100vw, 44vw" className={styles.coverImage} /><span>Reference / concept material</span>
            </button>
            <div>
              <div className={styles.filterRow} role="group" aria-label="Evidence status filter">
                {(["all", "documented", "confirm", "lore", "creative"] as const).map((status) => <button type="button" key={status} className={evidenceFilter === status ? styles.filterActive : styles.filterButton} onClick={() => setEvidenceFilter(status)}>{status === "all" ? "All" : statusLabel(status)}</button>)}
              </div>
              <div className={styles.evidenceList}>
                {filteredEvidence.map((item) => <article key={item.claim} className={styles.evidenceCard} data-status={item.status}><span className={styles.statusPill}>{statusLabel(item.status)}</span><h3>{item.claim}</h3><p>{item.note}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.greenSection}`} id="anatomy">
          <SectionHeading number="02" eyebrow="Look at him properly" title="He already arrived with a design system." copy="The useful question is not how much detail we can add. It is which cues survive when detail is stripped away." invert />
          <div className={styles.anatomyLayout}>
            <div className={styles.anatomyVisual}>
              <Image src="/images/ziggy/character/ziggy-with-tray.webp" alt="Ziggy visual anatomy" fill sizes="(max-width: 900px) 100vw, 46vw" className={styles.containImage} />
              <span className={`${styles.pin} ${styles.pinOne}`}>01 · ears</span><span className={`${styles.pin} ${styles.pinTwo}`}>02 · grin</span><span className={`${styles.pin} ${styles.pinThree}`}>03 · knot</span><span className={`${styles.pin} ${styles.pinFour}`}>04 · tray</span><span className={`${styles.pin} ${styles.pinFive}`}>05 · check</span>
            </div>
            <div className={styles.dnaList}>
              <DnaRow index="01" title="Ear silhouette">The structural anchor. It needs to survive at tiny scale and from across a road.</DnaRow><DnaRow index="02" title="Gold centre">A small ceremonial flash. More punctuation than wallpaper.</DnaRow><DnaRow index="03" title="Tray ellipse">The second axis and the brand’s verb: Ziggy offers.</DnaRow><DnaRow index="04" title="One cream diamond">Close-range confirmation. The pattern becomes more valuable when it is rationed.</DnaRow><DnaRow index="05" title="3196">Place as provenance. It says where before it says brand.</DnaRow><DnaRow index="→" title="Behaviour: offer">A fortune, ticket, card, caption or decision arrives on the tray.</DnaRow>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.burgundySection}`} id="dial">
          <SectionHeading number="03" eyebrow="How much monkey?" title="One creative dial. Three useful strengths." copy="Full Zig is theatre. Mild Zig is host. Sugar-Free Zig is learned visual memory. They are three settings of the same system." invert />
          <div className={styles.dialLayout}>
            <div className={styles.dialStage} data-mode={zigMode}>
              <div className={styles.placeTexture} aria-hidden="true" /><Image src="/images/ziggy/character/ziggy-with-tray.webp" alt="Ziggy in the visual strength experiment" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.dialZiggy} /><MinimumZiggy />
              <div className={styles.dialCaption}><span>PIER LIGHT</span><strong>{zigMode === "full" ? "FULL ZIG" : zigMode === "mild" ? "MILD ZIG" : "SUGAR-FREE ZIG"}</strong></div>
            </div>
            <div className={styles.dialPanel}>
              <div className={styles.segmented} role="group" aria-label="Ziggy strength">{(["full", "mild", "sugar"] as ZigMode[]).map((mode) => <button key={mode} type="button" className={zigMode === mode ? styles.segmentActive : styles.segmentButton} onClick={() => setZigMode(mode)}>{mode === "full" ? "Full Zig" : mode === "mild" ? "Mild Zig" : "Sugar-Free"}</button>)}</div>
              <h3>{zigMode === "full" && "Ziggy is the subject."}{zigMode === "mild" && "Frankston is the subject; Ziggy hosts."}{zigMode === "sugar" && "Frankston leads; Ziggy becomes visual DNA."}</h3>
              <p>{zigMode === "full" && "Big grin, full body, complete visual theatre. Best for exhibition moments, posters and character-led objects."}{zigMode === "mild" && "The place does the heavy lifting. Ziggy behaves like inherited signage, a medallion, a host or a local oddity."}{zigMode === "sugar" && "No mascot is required. Ear curves, one gold centre, a tray line, one cream diamond and provenance do the work."}</p>
              <div className={styles.questionCard}><span className={styles.eyebrow}>The experiment</span><strong>How little Ziggy can remain before Ziggy disappears?</strong><p>The symbol earns recognition through repetition. The app makes that learning visible rather than pretending the mark is already famous.</p></div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.paperSection}`} id="place">
          <SectionHeading number="04" eyebrow="Frankston is not the backdrop" title="The place has to earn equal billing." copy="The strongest calendar and campaign work begins with a recognisable Frankston mood, then decides how much Ziggy belongs in it." />
          <div className={styles.galleryGrid}>
            <GalleryTile src="/images/ziggy/oracle/cabinet-full.webp" title="The cabinet" note="Museum catalogue × shop window × penny arcade." onOpen={setSelectedImage} />
            <GalleryTile src="/images/ziggy/oracle/cabinet-after-hours.webp" title="After hours" note="Slightly haunted without becoming horror." onOpen={setSelectedImage} />
            <GalleryTile src="/images/ziggy/oracle/oracle-portrait.webp" title="The oracle" note="The monkey is allowed to interpret. He is not allowed to become evidence." onOpen={setSelectedImage} />
            <GalleryTile src="/images/ziggy/oracle/tray-ticket.webp" title="The tray ticket" note="The tray becomes a behaviour: request → offer → fortune." onOpen={setSelectedImage} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.nightSection}`} id="objects">
          <SectionHeading number="05" eyebrow="Objects in circulation" title="Do not make merch. Make carriers." copy="A useful object teaches the same visual code repeatedly outside the shop. It has to remain desirable after the joke has worn off." invert />
          <div className={styles.objectLab}>
            <div className={styles.objectMenu}>{objectStudies.map((item) => <button key={item.id} type="button" className={activeObject === item.id ? styles.objectActive : styles.objectButton} onClick={() => setActiveObject(item.id)}><span>{item.type}</span><strong>{item.name}</strong></button>)}</div>
            <div className={styles.objectDisplay}><div className={styles.objectSeal}>{selectedObject.name.slice(0, 1)}</div><span className={styles.eyebrow}>{selectedObject.type}</span><h3>{selectedObject.headline}</h3><p>{selectedObject.copy}</p><div className={styles.cueRow}>{selectedObject.cues.map((cue) => <span key={cue}>{cue}</span>)}</div></div>
          </div>
          <div className={styles.freshenerLab}>
            <div className={styles.freshenerScene} data-distance={distanceState}><div className={styles.cord} /><div className={styles.freshenerMark}><span className={styles.freshEarLeft} /><span className={styles.freshEarRight} /><span className={styles.freshKnot} /><span className={styles.freshTray} /><span className={styles.freshDiamond} /><strong>3196</strong></div></div>
            <div className={styles.distancePanel}><span className={styles.eyebrow}>Recognition test</span><h3>The little moving sign</h3><p>Move the distance control. The design should lose detail gracefully instead of becoming meaningless.</p><label htmlFor="distance">Viewing distance</label><input id="distance" type="range" min="0" max="100" value={distance} onChange={(event) => setDistance(Number(event.target.value))} /><div className={styles.distanceLegend}><span>10m</span><span>5m</span><span>1m</span></div><div className={styles.distanceReadout}><strong>{distanceState === "far" ? "Silhouette" : distanceState === "mid" ? "Recognition cues" : "Reward detail"}</strong><span>{distanceState === "far" && "Broad side curves + one gold centre. Text is irrelevant."}{distanceState === "mid" && "Ear construction, knot and tray axis begin to make sense."}{distanceState === "near" && "3196, one cream diamond and provenance can finally become legible."}</span></div></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.greenSection}`} id="old-vic">
          <SectionHeading number="06" eyebrow="Old Vic State" title="Beautiful bureaucratic redundancy." copy="The joke works because the paperwork behaves as if a ceramic monkey has always had its own impossibly dignified civic department." invert />
          <div className={styles.oldVicLayout}>
            <div className={styles.certificate}><span className={styles.certificateTop}>OLD VIC STATE · ARCHIVE OF LOCAL PECULIARITIES · 3196</span><div className={styles.certificateOrnament}>✦</div><h3>Department of the Monkey</h3><p className={styles.certificateSub}>Office of Service, Style & Civic Peculiarity</p><p>Issued for the proper recording of local objects which have remained stationary long enough to become folklore.</p><div className={styles.fakeSeal}>OVS<br />3196</div><div className={styles.disclaimer}><strong>ARCHIVAL NOTE</strong>Old Vic State is a fictional artistic institution used within the Ziggy project. It is not a historical Victorian government body and does not imply public endorsement.</div></div>
            <div className={styles.oldVicRules}><DnaRow index="I" title="Invent the heraldry">Build from the tray, bow, ears, check and Z. Do not borrow real government insignia.</DnaRow><DnaRow index="II" title="Keep the paper serious">Fine rules, archive numbers, warm stock, sparse metallic detail.</DnaRow><DnaRow index="III" title="Let the joke sit underneath">The fun comes from perfect procedural dignity applied to a ridiculous monkey.</DnaRow><DnaRow index="IV" title="Say what is fictional">A tiny archival note preserves the joke and the truth at the same time.</DnaRow></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.burgundySection}`} id="workbench">
          <SectionHeading number="07" eyebrow="The conversation archive" title="The idea is visible because the wrong turns remain." copy="This is a curated project spine, not a transcript dump. Search the turns and watch the system emerge from the sequence." invert />
          <div className={styles.workbenchToolbar}><input value={workbenchSearch} onChange={(event) => setWorkbenchSearch(event.target.value)} placeholder="Search the workbench…" aria-label="Search the workbench" /><div className={styles.workbenchFilters}>{["ALL", "TRUTH", "RESEARCH", "ART", "BRAND", "SYSTEM", "PLACE", "OBJECT", "AIM"].map((tag) => <button key={tag} type="button" className={workbenchFilter === tag ? styles.filterActive : styles.filterButton} onClick={() => setWorkbenchFilter(tag)}>{tag}</button>)}</div></div>
          <div className={styles.workbenchGrid}>{filteredWorkbench.map((item) => <article key={`${item.date}-${item.title}`} className={styles.workbenchCard}><div className={styles.workbenchMeta}><span>{item.date}</span><strong>{item.tag}</strong></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className={`${styles.section} ${styles.paperSection}`} id="steer">
          <SectionHeading number="08" eyebrow="Owner steering" title="Control without homework." copy="This board is deliberately tiny. Tap each line to cycle Keep → Park → Needs confirming. It saves on this device and can export one plain-text note." />
          <div className={styles.steeringBoard}>{steeringItems.map((item) => { const state = decisions[item] ?? "keep"; return <button type="button" key={item} className={styles.steeringItem} data-decision={state} onClick={() => cycleDecision(item)}><span>{state === "keep" ? "KEEP" : state === "park" ? "PARK" : "CONFIRM"}</span><strong>{item}</strong></button>; })}</div>
          <div className={styles.steeringActions}><button type="button" className={styles.primaryActionButton} onClick={exportSteering}>Export steering note</button><p>No account. No form. No project management theatre.</p></div>
        </section>

        <section className={styles.finale}><MinimumZiggy large /><p className={styles.kicker}>The minimum Ziggy</p><h2>How little Ziggy can remain before Ziggy disappears?</h2><p>If the mark below already feels like him after this archive, the experiment has started to work.</p><span>FRANKSTON ORIGINAL · 3196 · 1996–2026</span></section>
      </main>

      {selectedImage ? <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setSelectedImage(null)}><button type="button" onClick={() => setSelectedImage(null)} aria-label="Close preview">×</button><div className={styles.lightboxImage} onClick={(event) => event.stopPropagation()}><Image src={selectedImage} alt="Archive visual preview" fill sizes="95vw" className={styles.containImage} /></div></div> : null}
    </div>
  );
}

function SectionHeading({ number, eyebrow, title, copy, invert = false }: { number: string; eyebrow: string; title: string; copy: string; invert?: boolean; }) {
  return <div className={`${styles.sectionHeading} ${invert ? styles.sectionHeadingInvert : ""}`}><div className={styles.sectionNumber}>{number}</div><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div></div>;
}

function InfoCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <article className={styles.infoCard}><span className={styles.eyebrow}>{eyebrow}</span><h3>{title}</h3><p>{children}</p></article>;
}

function DnaRow({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return <div className={styles.dnaRow}><span>{index}</span><div><strong>{title}</strong><p>{children}</p></div></div>;
}

function MinimumZiggy({ large = false }: { large?: boolean }) {
  return <div className={`${styles.minimumZiggy} ${large ? styles.minimumLarge : ""}`} aria-label="Minimum Ziggy mark"><span className={styles.minEarLeft} /><span className={styles.minEarRight} /><span className={styles.minKnot} /><span className={styles.minTray} /><span className={styles.minDiamond} /></div>;
}

function GalleryTile({ src, title, note, onOpen }: { src: string; title: string; note: string; onOpen: (src: string) => void; }) {
  return <button type="button" className={styles.galleryTile} onClick={() => onOpen(src)}><Image src={src} alt={title} fill sizes="(max-width: 900px) 100vw, 25vw" className={styles.coverImage} /><span><strong>{title}</strong><small>{note}</small></span></button>;
}
