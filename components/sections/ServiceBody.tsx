import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ServiceBody({ paragraphs }: { paragraphs: ReadonlyArray<string> }) {
  if (paragraphs.length === 0) return null;
  return (
    <Section spacing="lg">
      <Container width="narrow" as="div" className="space-y-5">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            {p}
          </p>
        ))}
      </Container>
    </Section>
  );
}
