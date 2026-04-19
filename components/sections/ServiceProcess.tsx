import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import type { ServiceProcessStep } from "@/lib/services-defaults";

export function ServiceProcess({
  steps,
}: {
  steps: ReadonlyArray<ServiceProcessStep>;
}) {
  if (steps.length === 0) return null;

  return (
    <Section tone="surface" spacing="lg">
      <Container width="wide" as="div">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How we work</Eyebrow>
          <Heading level={2} className="mt-3">
            Our process
          </Heading>
          <p className="mt-4 text-lg text-[color:var(--color-ink-muted)]">
            From the first conversation through the final walkthrough, here&apos;s what to expect.
          </p>
        </div>

        <ol className="mx-auto mt-12 grid max-w-5xl gap-px bg-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={`${step.title}-${idx}`}
              className="flex flex-col gap-3 bg-[color:var(--color-bg)] p-7"
            >
              <span className="font-display text-3xl text-[color:var(--color-brand)]/30">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
