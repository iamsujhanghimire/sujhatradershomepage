"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered reveal.
 *
 * Progressive enhancement on purpose: the server renders with no reveal state,
 * so anyone without JavaScript — and every crawler — gets fully visible
 * content. The hidden state is only applied once the effect runs, which also
 * means content can never get stuck invisible if the observer fails.
 *
 * IntersectionObserver rather than a scroll listener: no main-thread work per
 * frame, which keeps INP clear. Each element unobserves after firing.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount — show it immediately rather than animating
    // content the reader is looking at.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setState("shown");
      return;
    }

    setState("pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);

    // Failsafe. Hiding content behind an observer means any circumstance that
    // stops it firing — an odd overflow ancestor, a browser quirk, a
    // programmatic jump past the element — leaves that section permanently
    // invisible. On a site whose whole argument is legibility, a blank section
    // is the worst possible failure, so a decoration is never allowed to
    // outrank the content: after 2.5s it reveals regardless.
    const failsafe = window.setTimeout(() => {
      setState("shown");
      observer.disconnect();
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state === "idle" ? undefined : state}
      style={state === "pending" ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
