import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Consistent page gutter and measure. Every section uses this — nothing sets
 *  its own max-width, or the vertical rhythm drifts. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cx("mx-auto w-full max-w-[76rem] px-5 sm:px-8", className)}>{children}</div>;
}

/**
 * Section rhythm. The guidelines call for alternating white and ivory rather
 * than tinted washes; `grain` adds paper texture to the ivory bands so they
 * read as stock, not as a flat grey.
 */
export function Section({
  tone = "white",
  className,
  children,
  ...rest
}: {
  tone?: "white" | "ivory" | "purple" | "forest";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"section">, "className" | "children">) {
  const tones = {
    white: "bg-white text-ink",
    ivory: "bg-ivory text-ink grain",
    purple: "bg-purple text-white",
    forest: "bg-forest text-white",
  } as const;

  return (
    <section className={cx("relative isolate", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}

/** Small caps label. Sets the technical register above a heading. */
export function Eyebrow({
  children,
  tone = "forest",
  className,
}: {
  children: ReactNode;
  tone?: "forest" | "purple" | "light";
  className?: string;
}) {
  const tones = {
    forest: "text-forest",
    purple: "text-purple",
    light: "text-white/70",
  } as const;

  return (
    <p
      className={cx(
        "font-sans text-[0.6875rem] font-medium tracking-[0.18em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "onDark";
  className?: string;
};

/**
 * One CTA system. Primary is purple everywhere — the spec asks for a single
 * consistent "Request a Quote" across nav, hero, mid-page and footer, and
 * varying its treatment would undercut that.
 *
 * Purple and green never appear at full saturation side by side (guidelines
 * §2), so a button row pairs primary with `outline`, not with `secondary`.
 */
export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const variants = {
    primary: "bg-purple text-white hover:bg-purple/90",
    secondary: "bg-forest text-white hover:bg-forest/90",
    outline: "border border-purple/30 text-purple hover:border-purple hover:bg-purple/5",
    onDark: "bg-white text-purple hover:bg-ivory",
  } as const;

  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2.5 px-6 py-3.5",
        "font-sans text-[0.9375rem] font-medium",
        "transition-colors duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </Link>
  );
}

/**
 * A single measured fact. Serif numeral over a sans label — the pairing that
 * makes the trust bar read as a spec sheet rather than marketing.
 */
export function Stat({
  value,
  label,
  tone = "purple",
}: {
  value: string;
  label: string;
  tone?: "purple" | "light";
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={cx(
          "tnum font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none",
          tone === "purple" ? "text-purple" : "text-white",
        )}
      >
        {value}
      </span>
      <span
        className={cx(
          "font-sans text-[0.75rem] tracking-[0.08em] uppercase",
          tone === "purple" ? "text-ink/55" : "text-white/60",
        )}
      >
        {label}
      </span>
    </div>
  );
}
