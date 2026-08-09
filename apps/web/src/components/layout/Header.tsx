"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/primitives";
import { COMPANY_NAV, PRIMARY_CTA, PRIMARY_NAV } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);

  // Route change closes everything — otherwise the drawer survives navigation.
  useEffect(() => {
    setMobileOpen(false);
    setCompanyOpen(false);
  }, [pathname]);

  // A dropdown that can only be dismissed by clicking its trigger again is a
  // trap for anyone who opened it by accident.
  useEffect(() => {
    if (!companyOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!companyRef.current?.contains(event.target as Node)) setCompanyOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setCompanyOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [companyOpen]);

  // Stop the page scrolling behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const companyActive = COMPANY_NAV.some((l) => isActive(l.href));

  return (
    <>
      <header className="rule-b sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((link) => (
              <NavItem key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavItem>
            ))}

            <div ref={companyRef} className="relative">
              <button
                type="button"
                onClick={() => setCompanyOpen((v) => !v)}
                aria-expanded={companyOpen}
                aria-haspopup="true"
                className={[
                  "inline-flex items-center gap-1.5 px-3.5 py-2 font-sans text-[0.9375rem] transition-colors",
                  companyActive || companyOpen ? "text-purple" : "text-ink/75 hover:text-purple",
                ].join(" ")}
              >
                Company
                <span
                  aria-hidden
                  className={`text-[0.625rem] transition-transform duration-200 motion-reduce:transition-none ${
                    companyOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {companyOpen && (
                <div className="animate-rise absolute top-full left-0 mt-1 w-[19rem] border border-warm-gray bg-white p-2 shadow-[0_16px_40px_-12px_rgba(42,38,34,0.18)]">
                  {COMPANY_NAV.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3.5 py-2.5 transition-colors hover:bg-ivory"
                    >
                      <span className="block font-sans text-[0.9375rem] font-medium text-purple">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-0.5 block font-sans text-[0.8125rem] text-ink/55">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:block">
            <Link
              href={PRIMARY_CTA.href}
              className="inline-flex items-center bg-purple px-5 py-2.5 font-sans text-[0.875rem] font-medium text-white transition-colors hover:bg-purple/90"
            >
              {PRIMARY_CTA.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            // 44×44 rather than the 29px the bars alone produced. This is the
            // only way to open navigation on mobile, so it gets a comfortable
            // target well past the 24px WCAG 2.1 AA minimum.
            className="-mr-2.5 inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                className={`block h-px w-6 bg-purple transition-transform duration-200 motion-reduce:transition-none ${
                  mobileOpen && i === 0 ? "translate-y-[6px] rotate-45" : ""
                } ${mobileOpen && i === 1 ? "opacity-0" : ""} ${
                  mobileOpen && i === 2 ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            ))}
          </button>
          </div>
        </Container>
      </header>

      {/* Deliberately a sibling of <header>, not a child.
          The header sets backdrop-blur, and a backdrop-filter establishes a
          containing block for position:fixed descendants — so nested here the
          drawer resolved `top-[4.5rem] bottom-0` against the 72px header and
          collapsed to 1px tall, making mobile navigation invisible. Outside
          the header, `fixed` resolves against the viewport as intended. */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="rule-t fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <Container className="py-6">
            <nav aria-label="Mobile" className="flex flex-col">
              {[...PRIMARY_NAV, ...COMPANY_NAV].map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className="animate-rise rule-b py-4 font-display text-2xl text-purple"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={PRIMARY_CTA.href}
              className="mt-7 flex items-center justify-center gap-2 bg-purple px-6 py-4 font-sans font-medium text-white"
            >
              {PRIMARY_CTA.label} <span aria-hidden>→</span>
            </Link>
          </Container>
        </div>
      )}
    </>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "relative px-3.5 py-2 font-sans text-[0.9375rem] transition-colors",
        // The underline scales from the left on hover rather than appearing —
        // transform only, so it can't shift the row it sits in.
        "after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-purple after:transition-transform after:duration-200 hover:after:scale-x-100 motion-reduce:after:transition-none",
        active ? "text-purple after:scale-x-100" : "text-ink/75 hover:text-purple",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
