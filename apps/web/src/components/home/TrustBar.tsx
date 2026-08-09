import { Container, Section, Stat } from "@/components/ui/primitives";
import { COMPANY } from "@/lib/site";

/**
 * The six figures a sourcing buyer checks first, presented as a spec sheet
 * rather than a marketing band. Every one is verifiable — which is the whole
 * positioning, so they get typographic weight rather than icons.
 */
const FACTS = [
  { value: String(COMPANY.foundedYear), label: "Established" },
  { value: COMPANY.employees, label: "Employees" },
  { value: `${(COMPANY.monthlyPieces / 1000).toFixed(0)}k`, label: "Pieces / month" },
  { value: String(COMPANY.moqPieces), label: "Piece MOQ" },
  { value: `${COMPANY.sampleTurnaroundHours}h`, label: "Sample turnaround" },
  { value: "FTG", label: "Nepal member" },
];

export function TrustBar() {
  return (
    <Section tone="ivory" className="rule-t rule-b">
      <Container className="py-10 lg:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <Stat value={fact.value} label={fact.label} />
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
