import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import type { FaqEntry } from "@/lib/contact-defaults";

export function ContactFaq({ items }: { items: ReadonlyArray<FaqEntry> }) {
  if (items.length === 0) return null;

  return (
    <Section tone="surface" spacing="lg">
      <Container width="wide" as="div">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <Heading level={2}>Common questions</Heading>
            <p className="text-base text-[color:var(--color-ink-muted)]">
              The questions we get most often, answered up front.
            </p>
          </div>

          {/*
            Native <details>/<summary> = built-in keyboard + screen-reader
            support, no client JS required, plays nice with view-source.
          */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
              {items.map((item) => (
                <li key={item.question}>
                  <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-[color:var(--color-ink)] transition group-open:text-[color:var(--color-brand)]">
                      <span>{item.question}</span>
                      <span
                        aria-hidden
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color:var(--color-rule)] text-sm transition group-open:rotate-45 group-open:border-[color:var(--color-brand)] group-open:text-[color:var(--color-brand)]"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-muted)]">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
