import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { FAIR_TRADE, KAMLARI } from "@/lib/site";
import Link from "next/link";

/**
 * Kamlari programme teaser.
 *
 * Numbers and outcome, never trauma — and deliberately no photograph. The only
 * images we hold of the programme are Nepal Youth Foundation training-centre
 * frames with participants' names legible on placards; those belong in the
 * full context of /sustainability, not as decoration on a homepage.
 *
 * Green leads this section: the guidelines reserve Deep Forest Green for
 * sustainability content, and it's the one place on the homepage where green
 * rather than purple carries the block.
 */
export function ImpactTeaser() {
  return (
    <Section tone="forest">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow tone="light">Social impact</Eyebrow>
              <h2 className="mt-5 text-[length:var(--text-h2)] text-white">
                <span className="tnum">{KAMLARI.currentlyEmployed}</span> of our team are former
                Kamlari women in <em className="italic">stable, skilled employment.</em>
              </h2>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[1.0625rem] leading-relaxed text-white/80">
                The Kamlari system was a form of bonded domestic servitude that historically
                affected girls and young women from Nepal&apos;s Tharu community in the western
                Terai, officially abolished in 2013. Working with {KAMLARI.partner}, we train and
                then directly employ women leaving the programme —{" "}
                <span className="tnum">{KAMLARI.trainedSince2015}</span> have come through it since
                2015.
              </p>

              <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/60">
                {FAIR_TRADE.honestyLine}
              </p>

              <Link
                href="/sustainability"
                className="group mt-8 inline-flex w-fit items-center gap-2.5 border-b border-white/30 pb-1 font-sans text-[0.9375rem] font-medium text-white transition-colors hover:border-white"
              >
                Read the full programme
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
