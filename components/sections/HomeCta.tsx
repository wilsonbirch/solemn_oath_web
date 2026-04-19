import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { Cta } from "@/lib/home-defaults";

export function HomeCta({
  title,
  subtitle,
  button,
}: {
  title: string;
  subtitle?: string;
  button?: Cta;
}) {
  return (
    <Section tone="ink" spacing="lg">
      <Container width="wide" as="div" className="text-center">
        <Heading level={2} className="mx-auto max-w-3xl text-white">
          {title}
        </Heading>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{subtitle}</p>
        )}
        {button && (
          <div className="mt-8 flex justify-center">
            <Button href={button.href} size="lg" variant="inverse">
              {button.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
