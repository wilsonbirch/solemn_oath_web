import {
  Bath,
  Clock,
  Compass,
  Hammer,
  Layers,
  MessageSquare,
  Trees,
  Utensils,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import type { ValueCard } from "@/lib/home-defaults";

// Map of icon name -> lucide component. Anything missing falls back to Wrench.
const ICONS: Record<string, LucideIcon> = {
  hammer: Hammer,
  compass: Compass,
  clock: Clock,
  "messages-square": MessageSquare,
  bath: Bath,
  utensils: Utensils,
  layers: Layers,
  trees: Trees,
  wrench: Wrench,
};

export function ValueIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICONS[name]) || Wrench;
  return <Icon aria-hidden className={className} />;
}

export function HomeValues({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<ValueCard>;
}) {
  return (
    <Section tone="brand" spacing="lg" id="why-us">
      <Container width="wide" as="div">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-white/70">Why choose us</Eyebrow>
          <Heading level={2} className="mt-3 text-white">
            {title}
          </Heading>
        </div>

        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 bg-[color:var(--color-brand)] p-8 transition hover:bg-[color:var(--color-brand-soft)]"
            >
              <ValueIcon
                name={item.icon}
                className="h-7 w-7 text-[color:var(--color-accent)] transition group-hover:scale-110"
              />
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/75">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
