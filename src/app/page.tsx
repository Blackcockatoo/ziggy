import { AroundTown } from "@/components/around-town";
import { AskZiggy } from "@/components/ask-ziggy";
import { Counter } from "@/components/counter";
import { FrontWindow } from "@/components/front-window";
import { Gang } from "@/components/gang";
import { LuckLedger } from "@/components/luck-ledger";
import { LuckyMonkey } from "@/components/lucky-monkey";
import { ObjectArchive } from "@/components/object-archive";
import { Principals } from "@/components/principals";
import { ResearchKey } from "@/components/research-key";
import { SiteNav } from "@/components/site-nav";
import { Timeline } from "@/components/timeline";
import { VisitFinale } from "@/components/visit-finale";
import { exhibition, lotteryExclusions, unplacedWins } from "@/content/exhibition";

/**
 * The exhibition, in walking order.
 *
 * The front window comes before the navigation on purpose: you approach the
 * glass first, and the nav only sticks once you have gone inside.
 */
export default function Home() {
  const { identity, sources } = exhibition;

  return (
    <>
      <a className="skip-link" href="#story">
        Skip to the exhibition
      </a>
      <FrontWindow identity={identity} />
      <SiteNav items={exhibition.navigation} />
      <main>
        <ResearchKey />
        <Timeline entries={exhibition.timeline} sources={sources} />
        <LuckLedger
          entries={exhibition.ledger}
          unplaced={unplacedWins}
          exclusions={lotteryExclusions}
          sources={sources}
        />
        <LuckyMonkey lore={exhibition.lore} monkeys={exhibition.monkeys} sources={sources} />
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
