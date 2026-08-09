import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/primitives";
import { COMPANY } from "@/lib/site";
import { PRIMARY_CTA } from "@/lib/navigation";

/**
 * Closing band. Answers the last objection — "will this actually go
 * anywhere?" — by saying plainly what happens after the form.
 */
export function ClosingCta() {
  return (
    <Section tone="purple">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <h2 className="max-w-2xl text-[length:var(--text-h2)] text-white">
              Send us a tech pack or a rough idea.{" "}
              <em className="italic">We&apos;ll quote it properly.</em>
            </h2>

            <div>
              <p className="text-[1.0625rem] leading-relaxed text-white/70">
                Minimum {COMPANY.moqPieces} pieces per style. Samples in{" "}
                <span className="tnum">{COMPANY.sampleTurnaroundHours}</span> hours. Lead times
                quoted per order rather than guessed at up front.
              </p>
              <div className="mt-8">
                <Button href={PRIMARY_CTA.href} variant="onDark">
                  {PRIMARY_CTA.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
