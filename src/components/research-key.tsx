import { EvidencePill } from "./evidence-pill";

export function ResearchKey() {
  return (
    <aside className="research-key" aria-labelledby="research-key-title">
      <div>
        <p className="eyebrow">Editorial rule</p>
        <h2 id="research-key-title">No folklore disguised as fact.</h2>
      </div>
      <p>
        This working exhibition distinguishes sourced facts from promising leads and empty archive
        slots. The labels can disappear from the public edition once every claim is settled.
      </p>
      <div className="research-key__labels">
        <EvidencePill evidence={{ status: "verified" }} />
        <EvidencePill evidence={{ status: "research-lead" }} />
        <EvidencePill evidence={{ status: "placeholder" }} />
      </div>
    </aside>
  );
}
