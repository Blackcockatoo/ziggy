import { AroundTown } from "@/components/around-town";
import { AskZiggy } from "@/components/ask-ziggy";
import { Commemorative } from "@/components/commemorative";
import { Counter } from "@/components/counter";
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
import { exhibition, unplacedWins } from "@/content/exhibition";

/**
 * The exhibition, in walking order.
 *
 * Two deliberate orderings:
 * - the front window comes before the navigation, so you approach the glass
 *   first and the nav only sticks once you are inside
 * - Ziggy Says comes before Ask Ziggy, so the machine arrives as the
 *   theatrical version of a voice you have already met
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
        <Commemorative />
        <LuckLedger entries={exhibition.ledger} unplaced={unplacedWins} sources={sources} />
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
