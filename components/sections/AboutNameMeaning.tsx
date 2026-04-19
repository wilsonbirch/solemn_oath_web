import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export function AboutNameMeaning({
  title,
  body,
}: {
  title: string;
  body: ReadonlyArray<string>;
}) {
  return (
    <Section tone="brand" spacing="lg">
      <Container width="wide" as="div">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Quote
            aria-hidden
            className="mx-auto h-8 w-8 text-[color:var(--color-accent)]"
          />
          <Heading level={2} className="text-white">
            {title}
          </Heading>
          <div className="space-y-4 text-lg leading-relaxed text-white/85">
            {body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
