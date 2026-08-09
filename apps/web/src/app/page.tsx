import { BRAND_NAME, COMPANY, FAIR_TRADE, KAMLARI } from "@/lib/site";

/**
 * Scaffold only — the real homepage is phase 2, where the design system and
 * layout primitives get built alongside it. This exists so the workspace,
 * fonts, and brand tokens can be verified end to end on a deployed URL.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-sans text-sm font-medium tracking-widest text-forest uppercase">
        Scaffold · phase 1
      </p>

      <h1 className="mt-6 text-5xl leading-tight">
        A Kathmandu garment factory that publishes its numbers,{" "}
        <em>not just its promises.</em>
      </h1>

      {/* AEO lead sentence: standalone, factual, quotable, ahead of any framing. */}
      <p className="mt-8 max-w-2xl text-lg text-ink">
        {BRAND_NAME} is a Kathmandu-based garment manufacturer producing{" "}
        {COMPANY.monthlyPieces.toLocaleString("en-US")} pieces monthly with a{" "}
        {COMPANY.moqPieces}-piece MOQ and {COMPANY.sampleTurnaroundHours}-hour sample
        turnaround. The company is a {FAIR_TRADE.membership.toLowerCase()} and employs{" "}
        {KAMLARI.currentlyEmployed} former Kamlari women through an ongoing partnership
        with {KAMLARI.partner}.
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-warm-gray sm:grid-cols-3">
        {[
          ["Established", String(COMPANY.foundedYear)],
          ["Employees", COMPANY.employees],
          ["Per month", `${COMPANY.monthlyPieces.toLocaleString("en-US")} pcs`],
          ["MOQ", `${COMPANY.moqPieces} pcs`],
          ["Sampling", `${COMPANY.sampleTurnaroundHours} hrs`],
          ["Fair trade", "FTG Nepal member"],
        ].map(([label, value]) => (
          <div key={label} className="bg-ivory px-5 py-4">
            <dt className="text-xs font-medium tracking-wide text-ink/60 uppercase">
              {label}
            </dt>
            <dd className="mt-1 font-display text-2xl text-purple">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
