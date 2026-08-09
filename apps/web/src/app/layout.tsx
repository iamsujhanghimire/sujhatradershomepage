import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Only the cuts the brand guidelines call for. DM Serif Display has a single
// weight by design; loading more would download nothing useful.
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} — Sustainable Garment Manufacturer in Nepal`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Sujha Traders is a Kathmandu garment manufacturer producing 60,000 pieces monthly with a 100-piece MOQ and 72-hour sampling. Member of Fair Trade Group Nepal.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
