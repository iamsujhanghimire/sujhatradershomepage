import Image from "next/image";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { COMPANY, FAIR_TRADE } from "@/lib/site";
import { PRIMARY_CTA } from "@/lib/navigation";

/**
 * Asymmetric split rather than a full-bleed image, and that's an asset
 * decision as much as an aesthetic one: every photograph we hold caps at
 * 1280px wide. Stretched across a 1216px container it renders at roughly 1×
 * and looks soft on any modern display. Capped at 30rem it renders above 2×
 * and stays crisp, so the offset block behind it does the grid-breaking work
 * instead of a low-resolution bleed.
 */
export function Hero() {
  return (
    <Section tone="white" className="overflow-hidden">
      <Container className="pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div>
            <Eyebrow className="animate-rise">
              Kathmandu, Nepal · Est. {COMPANY.foundedYear}
            </Eyebrow>

            <h1
              className="animate-rise mt-6 text-[length:var(--text-display)]"
              style={{ animationDelay: "90ms" }}
            >
              A Kathmandu garment factory that publishes its numbers,{" "}
              <em className="italic">not just its promises.</em>
            </h1>

            <p
              className="animate-rise mt-6 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-ink/75"
              style={{ animationDelay: "180ms" }}
            >
              Manufacturing garments since {COMPANY.foundedYear}. {FAIR_TRADE.membership}, and{" "}
              {70} of our team are former Kamlari women building stable careers through our
              partnership with Nepal Youth Foundation.
            </p>

            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "270ms" }}
            >
              <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
              <Button href="/capabilities" variant="outline">
                See What We Make
              </Button>
            </div>
          </div>

          <div
            className="animate-rise relative mx-auto w-full max-w-[30rem] lg:mx-0"
            style={{ animationDelay: "360ms" }}
          >
            {/* Offset frame — the grid-break. Purely decorative, sits behind. */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 bottom-8 left-8 border border-warm-gray"
            />
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/factory/sewing-operator-portrait-01.jpeg"
                alt="A machine operator at a single-needle lockstitch machine on the Sujha Traders sewing floor in Kathmandu"
                fill
                sizes="(max-width: 1023px) 92vw, 30rem"
                className="object-cover"
                priority
                // Explicit LCP candidate. priority preloads it; the fixed
                // aspect ratio reserves the box so nothing shifts on load.
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
