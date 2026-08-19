import { AroundTown } from "@/components/around-town";
import { AskZiggy } from "@/components/ask-ziggy";
import { CounterStories } from "@/components/counter-stories";
import { FrontWindow } from "@/components/front-window";
import { Gang } from "@/components/gang";
import { LuckyMonkey } from "@/components/lucky-monkey";
import { LuckLedger } from "@/components/luck-ledger";
import { MonkeyLineage } from "@/components/monkey-lineage";
import { ResearchKey } from "@/components/research-key";
import { RobClosing } from "@/components/rob-closing";
import { SiteNav } from "@/components/site-nav";
import { Timeline } from "@/components/timeline";
import { VisitFinale } from "@/components/visit-finale";
import { exhibition } from "@/content/exhibition";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#story">
        Skip to the exhibition
      </a>
      <SiteNav items={exhibition.navigation} />
      <main>
        <FrontWindow />
        <ResearchKey />
        <Timeline entries={exhibition.timeline} sources={exhibition.sources} />
        <LuckyMonkey lore={exhibition.lore} />
        <LuckLedger entries={exhibition.ledger} />
        <MonkeyLineage entries={exhibition.lineage} />
        <AskZiggy />
        <CounterStories stories={exhibition.counterStories} />
        <Gang people={exhibition.people} />
        <AroundTown records={exhibition.community} />
        <RobClosing />
      </main>
      <VisitFinale />
    </>
  );
}
