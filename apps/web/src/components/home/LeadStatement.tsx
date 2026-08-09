import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND_NAME, COMPANY, KAMLARI } from "@/lib/site";

/**
 * The AEO anchor.
 *
 * Two standalone, factual, self-contained sentences ahead of any marketing
 * framing — written to be liftable verbatim by an answer engine. No pronouns
 * depending on earlier context, no adjectives that can't be checked, every
 * number sourced from lib/site.ts.
 *
 * Marked up as a <blockquote> with cite so the extractable claim is
 * structurally distinct from surrounding prose.
 */
export function LeadStatement() {
  return (
    <Section tone="white">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <blockquote className="mx-auto max-w-4xl">
            <p className="font-display text-[length:var(--text-h2)] leading-[1.18] text-purple">
              {BRAND_NAME} is a Kathmandu-based garment manufacturer producing{" "}
              <span className="tnum">{COMPANY.monthlyPieces.toLocaleString("en-US")}</span> pieces
              monthly with a <span className="tnum">{COMPANY.moqPieces}</span>-piece MOQ and{" "}
              <span className="tnum">{COMPANY.sampleTurnaroundHours}</span>-hour sample turnaround.
            </p>
            <p className="mt-7 max-w-3xl font-sans text-[length:var(--text-lead)] leading-relaxed text-ink/75">
              The company is a member of Fair Trade Group Nepal and employs{" "}
              <span className="tnum">{KAMLARI.currentlyEmployed}</span> former Kamlari women through
              an ongoing partnership with {KAMLARI.partner}. It has been manufacturing readymade
              garments, apparel accessories and sustainable clothing since {COMPANY.foundedYear}.
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}
