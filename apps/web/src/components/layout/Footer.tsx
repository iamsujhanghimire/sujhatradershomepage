import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/primitives";
import { FOOTER_NAV, PRIMARY_CTA } from "@/lib/navigation";
import { COMPANY, FAIR_TRADE, LEGAL_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-purple text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <Logo tone="white" />

            <address className="mt-6 space-y-0.5 font-sans text-[0.9375rem] leading-relaxed text-white/70 not-italic">
              <p>{COMPANY.address.street}</p>
              <p>
                {COMPANY.address.city}, {COMPANY.address.country}
              </p>
              <p className="pt-1.5">
                <a
                  href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-block py-1 hover:text-white"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-block py-1 hover:text-white"
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="font-sans text-[0.6875rem] font-medium tracking-[0.18em] text-white/45 uppercase">
                  {group.heading}
                </h2>
                <ul className="mt-3 space-y-0.5">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-${link.href}`}>
                      {/* inline-block + vertical padding lifts the tap target
                          from 20px to 28px, clearing the 24px AA minimum
                          without changing the visual rhythm. */}
                      <Link
                        href={link.href}
                        className="inline-block py-1 font-sans text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Fair trade block. The FTG Nepal mark never sits beside the word
            "Certified" — Sujha is a member, not a certificate holder. */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
              <Image
                src="/images/brand/fair-trade-group-nepal.png"
                alt="Fair Trade Group Nepal"
                width={225}
                height={225}
                className="h-full w-full object-contain"
              />
            </span>
            <p className="max-w-sm font-sans text-[0.875rem] leading-relaxed text-white/70">
              {FAIR_TRADE.membership}. {FAIR_TRADE.inProgress}
            </p>
          </div>

          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3.5 font-sans text-[0.9375rem] font-medium text-purple transition-colors hover:bg-ivory"
          >
            {PRIMARY_CTA.label} <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-8 font-sans text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {LEGAL_NAME}
          </p>
          <p>Registered {COMPANY.foundedYear} · Kathmandu, Nepal</p>
        </div>
      </Container>
    </footer>
  );
}
