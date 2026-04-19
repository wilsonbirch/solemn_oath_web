import { Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { TestimonialTeaser } from "@/lib/home-defaults";

function formatMonthYear(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

export function HomeTestimonials({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<TestimonialTeaser>;
}) {
  if (items.length === 0) return null;

  return (
    <Section spacing="lg" tone="surface">
      <Container width="wide" as="div">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Testimonials</Eyebrow>
          <Heading level={2} className="mt-3">
            {title}
          </Heading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.slice(0, 3).map((t) => (
            <article
              key={t._id}
              className="relative flex flex-col gap-5 rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] p-7"
            >
              <Quote
                aria-hidden
                className="absolute right-6 top-6 h-6 w-6 text-[color:var(--color-brand)]/15"
              />
              <div className="flex items-center gap-1 text-[color:var(--color-accent)]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                ))}
                <span className="sr-only">{t.rating} out of 5 stars</span>
              </div>
              <p className="text-base leading-relaxed text-[color:var(--color-ink)] line-clamp-7">
                “{t.quote}”
              </p>
              <footer className="mt-auto border-t border-[color:var(--color-rule)] pt-4">
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

        <div className="mt-10 text-center">
          <Button href="/testimonials" variant="secondary">
            Read more reviews
          </Button>
        </div>
      </Container>
    </Section>
  );
}
