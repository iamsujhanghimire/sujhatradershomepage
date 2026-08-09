import Image from "next/image";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/site";

/**
 * "Is this a real organisation?" — the objection this block answers.
 *
 * One honest group photograph does more for that than any amount of copy, and
 * it's the only image we hold that shows the scale of the floor.
 */
export function TeamTeaser() {
  return (
    <Section tone="ivory">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/factory/team-group-portrait.jpeg"
                alt="Members of the Sujha Traders production team gathered on the sewing floor in Kathmandu"
                fill
                sizes="(max-width: 1023px) 92vw, 34rem"
                className="object-cover"
              />
            </div>

            <div>
              <Eyebrow>Team &amp; organisation</Eyebrow>
              <h2 className="mt-5 text-[length:var(--text-h2)]">
                {COMPANY.employees} people, <em className="italic">organised by department.</em>
              </h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink/75">
                Cutting, sewing, finishing, QC, design and sampling, and admin. We show the
                organisation by department rather than profiling every employee individually —
                a deliberate choice, given how much of the floor workforce came through the
                Kamlari programme.
              </p>
              <div className="mt-9">
                <Button href="/team" variant="outline">
                  Meet the organisation
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
