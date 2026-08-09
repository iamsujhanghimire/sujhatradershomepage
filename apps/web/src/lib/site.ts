/**
 * Canonical facts about the business, in one place.
 *
 * These numbers appear in the trust bar, the AEO lead sentences, FAQ answers,
 * and JSON-LD — repeating them inline would guarantee they drift apart.
 */

/** Note the www. sujha.com 308s to www.sujha.com, so canonicals, sitemap, OG
 *  tags and schema must all use the www form or we split our own signals. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sujha.com";

export const BRAND_NAME = "Sujha Traders";
export const LEGAL_NAME = "Sujha Traders & Exports Pvt. Ltd.";

export const COMPANY = {
  foundedYear: 1998,
  employees: "150+",
  monthlyPieces: 60_000,
  moqPieces: 100,
  sampleTurnaroundHours: 72,
  address: {
    street: "Tokha Road",
    city: "Kathmandu",
    country: "Nepal",
    countryCode: "NP",
  },
  geo: { latitude: 27.738017, longitude: 85.320076 },
  phone: "+977 985-1024784",
  email: "jhaindra@sujha.com",
} as const;

/** Already shipped to these. Presented as evidence, never as a limit — Sujha
 *  exports anywhere. */
export const EXPORT_MARKETS = [
  "United States",
  "Canada",
  "United Kingdom",
  "France",
  "Germany",
  "Australia",
  "Spain",
  "Nepal",
  "Italy",
  "Japan",
  "Czech Republic",
  "Netherlands",
  "Belgium",
] as const;

export const MACHINERY = [
  "Flatlock",
  "4-thread overlock",
  "5-thread overlock",
  "Single needle lockstitch",
  "Double needle lockstitch",
  "Bartack",
  "Embroidery",
  "Printing",
  "CAD",
  "Pattern making",
  "Digitizer",
  "Eyelet and stud attachment",
  "Modern cutting machines",
] as const;

/**
 * Certification language. **Read before writing any copy that touches this.**
 *
 * Sujha holds no certification of its own. It is a member of Fair Trade Group
 * Nepal, which is itself a WFTO member, and has permission to display the FTG
 * Nepal mark. WFTO and SA8000 are in progress.
 *
 * Never write "Fair Trade Certified" (a Fair Trade USA registered certification
 * mark), "Fairtrade" as one word (Fairtrade International's mark), "WFTO
 * certified", or "SA8000 certified". The FTG Nepal logo must never sit beside
 * the word "Certified" — that pairing is exactly what the old site got wrong.
 */
export const FAIR_TRADE = {
  membership: "Member of Fair Trade Group Nepal",
  network: "Fair Trade Group Nepal is a member of the World Fair Trade Organization (WFTO).",
  inProgress: "Working toward WFTO Guaranteed Member status and SA8000 certification.",
  honestyLine:
    "We only list certifications we've actually earned. WFTO and SA8000 are in progress, and we'll update this page the day they're confirmed, not before.",
} as const;

/** Kamlari programme. Numbers and outcome, never trauma. No individual names or
 *  identifying stories. Full narrative lives on /sustainability only. */
export const KAMLARI = {
  currentlyEmployed: 70,
  trainedSince2015: "300+",
  partner: "Nepal Youth Foundation",
} as const;
