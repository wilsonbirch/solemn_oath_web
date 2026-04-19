import { Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Testimonial } from "@/lib/testimonials-defaults";

function formatMonthYear(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: ReadonlyArray<Testimonial>;
}) {
  if (testimonials.length === 0) {
    return (
      <Section spacing="lg">
        <Container width="narrow" as="div">
          <p className="text-center text-[color:var(--color-ink-muted)]">
            Reviews are coming soon.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        {/*
          CSS columns gives a real masonry feel (variable card heights stack
          tight). break-inside-avoid keeps each card whole.
        */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {testimonials.map((t) => (
            <article
              key={t._id}
              className="relative mb-6 break-inside-avoid rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-7"
            >
              <Quote
                aria-hidden
                className="absolute right-6 top-6 h-7 w-7 text-[color:var(--color-brand)]/15"
              />
              <div
                className="flex items-center gap-1 text-[color:var(--color-accent)]"
                role="img"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink)]">
                “{t.quote}”
              </p>
              <footer className="mt-6 border-t border-[color:var(--color-rule)] pt-4">
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-sm text-[color:var(--color-ink-muted)]">
                  {t.projectType}
                  {t.projectType && formatMonthYear(t.date) ? " · " : ""}
                  {formatMonthYear(t.date)}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
