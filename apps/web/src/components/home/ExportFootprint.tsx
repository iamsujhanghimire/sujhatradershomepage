import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { EXPORT_MARKETS } from "@/lib/site";

/**
 * Export markets as a typographic ledger rather than a world map. A dotted
 * world map is the single most generic device in B2B manufacturing sites, and
 * it conveys less than the plain list: these are shipped-to markets, not
 * aspirations. The closing line keeps the list from reading as a boundary.
 */
export function ExportFootprint() {
  return (
    <Section tone="white">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <Eyebrow>Export footprint</Eyebrow>
              <h2 className="mt-5 text-[length:var(--text-h2)]">
                <span className="tnum">{EXPORT_MARKETS.length}</span> markets shipped to.
              </h2>
              <p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-ink/70">
                Not a target list — countries garments have already been produced for and
                delivered to. We export anywhere.
              </p>
            </div>

            <ul className="rule-t grid grid-cols-2 sm:grid-cols-3">
              {EXPORT_MARKETS.map((market, i) => (
                <li
                  key={market}
                  className="rule-b flex items-baseline gap-3 py-4 pr-4 font-sans text-[0.9375rem]"
                >
                  <span className="tnum text-[0.75rem] text-warm-gray">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink/80">{market}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
