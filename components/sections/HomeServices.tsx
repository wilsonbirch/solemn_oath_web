import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ValueIcon } from "@/components/sections/HomeValues";
import type { ServiceTeaser } from "@/lib/home-defaults";

export function HomeServices({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: ReadonlyArray<ServiceTeaser>;
}) {
  return (
    <Section spacing="lg" tone="surface">
      <Container width="wide" as="div">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <Eyebrow>Services</Eyebrow>
            <Heading level={2}>{title}</Heading>
            {subtitle && (
              <p className="text-lg text-[color:var(--color-ink-muted)]">{subtitle}</p>
            )}
          </div>
          <Button href="/services" variant="link">
            View all services →
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] p-6 transition hover:-translate-y-1 hover:border-[color:var(--color-brand)] hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)] transition group-hover:bg-[color:var(--color-brand)] group-hover:text-white">
                  <ValueIcon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  {service.shortDescription}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand)]">
                <span>Learn more</span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
