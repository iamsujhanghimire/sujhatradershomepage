import Image from "next/image";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { MACHINERY } from "@/lib/site";

/**
 * Process walkthrough, numbered like a route sheet.
 *
 * Only one of these six stages has a photograph today — the sewing floor.
 * Rather than illustrate the other five with stock or with a generic icon set,
 * the strip stays typographic and the single real photograph carries the
 * section. The gaps are recorded in public/images/MANIFEST.md.
 */
const STAGES = [
  { n: "01", name: "Fabric intake", note: "Inspection and relaxation before cutting" },
  { n: "02", name: "Cutting", note: "CAD marker, spreading, modern cutting machines" },
  { n: "03", name: "Sewing", note: "Flatlock, overlock, lockstitch, bartack lines" },
  { n: "04", name: "Finishing & QC", note: "Trim, press, inline and final inspection" },
  { n: "05", name: "Packing", note: "Labelling, folding, cartonisation" },
  { n: "06", name: "Dispatch", note: "Export documentation and handover" },
];

export function ProcessTeaser() {
  return (
    <Section tone="ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>What we make &amp; how</Eyebrow>
            <h2 className="mt-5 text-[length:var(--text-h2)]">
              Six stages, one floor, <em className="italic">nothing subcontracted out.</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink/75">
              Cutting through dispatch happens in the same building in Kathmandu, across{" "}
              <span className="tnum font-medium text-purple">{MACHINERY.length}</span> machine and
              capability types — from flatlock and five-thread overlock to embroidery, printing,
              CAD and digitising.
            </p>

            <div className="relative mt-10 aspect-[3/2] max-w-md overflow-hidden">
              <Image
                src="/images/factory/sewing-floor-wide-01.jpeg"
                alt="Rows of industrial lockstitch machines in operation on the Sujha Traders sewing floor"
                fill
                sizes="(max-width: 1023px) 92vw, 28rem"
                className="object-cover"
              />
            </div>

            <div className="mt-9">
              <Button href="/capabilities" variant="outline">
                Full capability list
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ol className="rule-t">
              {STAGES.map((stage) => (
                <li
                  key={stage.n}
                  className="rule-b group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6 transition-colors sm:grid-cols-[4.5rem_1fr]"
                >
                  <span className="tnum font-display text-2xl text-forest transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none sm:text-3xl">
                    {stage.n}
                  </span>
                  <div>
                    <h3 className="font-sans text-[length:var(--text-h3)] font-medium">
                      {stage.name}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/60">
                      {stage.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
