/**
 * Nav structure. Nine public destinations is too many for a flat bar, so
 * About / Team / Sustainability / Careers group under "Company" and the five
 * highest-intent destinations stay flat. Section 16 leaves this open to
 * revisit once real content is in — flattening is a one-line change here.
 *
 * The footer lists every page regardless of how the header groups them.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Design", href: "/design" },
  { label: "Blog", href: "/blog" },
];

export const COMPANY_NAV: NavLink[] = [
  { label: "About", href: "/about", description: "Founded 1998 in Kathmandu" },
  { label: "Team", href: "/team", description: "Leadership and departments" },
  {
    label: "Sustainability",
    href: "/sustainability",
    description: "Fair trade and the Kamlari programme",
  },
  { label: "Careers", href: "/careers", description: "Working at Sujha" },
];

/** One consistent primary CTA across nav, hero, mid-page and footer. */
export const PRIMARY_CTA = { label: "Request a Quote", href: "/contact" } as const;

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "What we do",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Design", href: "/design" },
      { label: "Request a Quote", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
