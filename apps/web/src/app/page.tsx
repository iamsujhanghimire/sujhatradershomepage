import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { LeadStatement } from "@/components/home/LeadStatement";
import { ProcessTeaser } from "@/components/home/ProcessTeaser";
import { ExportFootprint } from "@/components/home/ExportFootprint";
import { ImpactTeaser } from "@/components/home/ImpactTeaser";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  // 57 characters — inside the 50–60 budget.
  title: "Sustainable Garment Manufacturer in Nepal | Sujha Traders",
  description:
    "Kathmandu garment manufacturer since 1998. 60,000 pieces monthly, 100-piece MOQ, 72-hour samples. Member of Fair Trade Group Nepal.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <LeadStatement />
      <ProcessTeaser />
      <ExportFootprint />
      <TeamTeaser />
      <ImpactTeaser />
      <ClosingCta />
    </>
  );
}
