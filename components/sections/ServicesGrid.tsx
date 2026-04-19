import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ValueIcon } from "@/components/sections/HomeValues";
import type { Service } from "@/lib/services-defaults";

export function ServicesGrid({
  intro,
  services,
}: {
  intro?: ReadonlyArray<string>;
  services: ReadonlyArray<Service>;
}) {
  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        {intro && intro.length > 0 && (
          <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
            {intro.map((p, idx) => (
              <p
                key={idx}
                className="text-lg leading-relaxed text-[color:var(--color-ink-muted)]"
              >
                {p}
              </p>
            ))}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group relative isolate flex flex-col overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] transition hover:-translate-y-1 hover:border-[color:var(--color-brand)] hover:shadow-xl"
            >
              {service.heroImage.src && (
                <div className="relative aspect-[5/3] w-full overflow-hidden">
                  <Image
                    src={service.heroImage.src}
                    alt={service.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)] transition group-hover:bg-[color:var(--color-brand)] group-hover:text-white">
                    <ValueIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-2xl">{service.title}</h3>
                </div>
                <p className="text-base leading-relaxed text-[color:var(--color-ink-muted)]">
                  {service.shortDescription}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-[color:var(--color-brand)]">
                  <span>Learn more</span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
