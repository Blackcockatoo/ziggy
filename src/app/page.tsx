import { AroundTown } from "@/components/around-town";
import { AskZiggy } from "@/components/ask-ziggy";
import { Commemorative } from "@/components/commemorative";
import { Counter } from "@/components/counter";
import { CounterHome } from "@/components/counter-home/counter-home";
import { FrontWindow } from "@/components/front-window";
import { Gang } from "@/components/gang";
import { LuckLedger } from "@/components/luck-ledger";
import { LuckyMonkey } from "@/components/lucky-monkey";
import { ObjectArchive } from "@/components/object-archive";
import { OracleBridge } from "@/components/oracle-bridge";
import { Principals } from "@/components/principals";
import { ResearchKey } from "@/components/research-key";
import { SiteNav } from "@/components/site-nav";
import { Timeline } from "@/components/timeline";
import { VisitFinale } from "@/components/visit-finale";
import { ZiggySays } from "@/components/ziggy-says";
import { exhibition, lotteryExclusions, unplacedWins } from "@/content/exhibition";

/**
 * The exhibition, in walking order.
 *
 * The original front window remains the opening image. The everyday Counter
 * then becomes the fast public front door before the exhibition resumes in
 * its established walking order. The documentary board still comes before
 * Ask Ziggy so the machine grows out of the shop's voice.
 */
export default function Home() {
  const { identity, sources } = exhibition;

  return (
    <>
      <a className="skip-link" href="#daily-counter">
        Skip to today&apos;s counter
      </a>
      <FrontWindow identity={identity} />
      <SiteNav items={exhibition.navigation} />
      <main>
        <CounterHome />
        <ResearchKey />
        <Timeline entries={exhibition.timeline} sources={sources} />
        <Commemorative />
        <LuckLedger
          entries={exhibition.ledger}
          unplaced={unplacedWins}
          exclusions={lotteryExclusions}
          sources={sources}
        />
        <LuckyMonkey lore={exhibition.lore} monkeys={exhibition.monkeys} sources={sources} />
        <ZiggySays entries={exhibition.boardEntries} sources={sources} />
        <OracleBridge />
        <AskZiggy />
        <Counter
          objects={exhibition.counterObjects}
          memories={exhibition.memories}
          sources={sources}
        />
        <Gang staff={exhibition.staff} sources={sources} />
        <AroundTown records={exhibition.community} sources={sources} />
        <ObjectArchive artefacts={exhibition.artefacts} sources={sources} />
        <Principals people={exhibition.principals} sources={sources} />
      </main>
      <VisitFinale identity={identity} />
    </>
  );
}
