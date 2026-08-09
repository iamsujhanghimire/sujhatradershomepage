import Link from "next/link";
import { BRAND_NAME } from "@/lib/site";

/**
 * Interim mark. The "Runway Flow" lockup is still in development, so this is
 * the existing icon used as a placeholder per the build spec.
 *
 * Rendered as a CSS-masked silhouette rather than the raw PNG, for two
 * reasons. The file's green (~#8bac3a) is a bright yellow-green that clashes
 * with Deep Forest Green #355E3B, and the guidelines call for a simplified
 * silhouette below minimum reproduction size anyway — the internal white gaps
 * are roughly a pixel wide at header scale and only muddy the shape.
 *
 * The mask takes the file's alpha channel, so `currentColor` fills the whole
 * figure. That makes the reversed treatment on dark backgrounds free.
 */
export function Logo({
  className,
  tone = "purple",
}: {
  className?: string;
  tone?: "purple" | "white";
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-baseline gap-2.5"
      aria-label={`${BRAND_NAME} — home`}
    >
      <span
        aria-hidden
        className={[
          "block h-8 w-[1.375rem] shrink-0 self-center transition-opacity",
          "group-hover:opacity-80 motion-reduce:transition-none",
          tone === "purple" ? "bg-purple" : "bg-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          maskImage: "url(/images/brand/sujha-mark.png)",
          WebkitMaskImage: "url(/images/brand/sujha-mark.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <span
        className={[
          "font-display text-[1.375rem] leading-none tracking-tight",
          tone === "purple" ? "text-purple" : "text-white",
        ].join(" ")}
      >
        {BRAND_NAME}
      </span>
    </Link>
  );
}
