import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { ProjectTeaser } from "@/lib/home-defaults";

const CATEGORY_LABELS: Record<string, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  basement: "Basement",
  deck: "Deck & fence",
  flooring: "Flooring",
  panelling: "Wall panelling",
  "whole-home": "Whole home",
  other: "Other",
};

export function HomeProjects({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: ReadonlyArray<ProjectTeaser>;
}) {
  if (items.length === 0) return null;

  // Asymmetric layout: feature first project tall on the left, others tile right.
  const [feature, ...rest] = items;

  return (
    <Section spacing="lg">
      <Container width="wide" as="div">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <Eyebrow>Recent work</Eyebrow>
            <Heading level={2}>{title}</Heading>
            {subtitle && (
              <p className="text-lg text-[color:var(--color-ink-muted)]">{subtitle}</p>
            )}
          </div>
          <Button href="/projects" variant="link">
            See full portfolio →
          </Button>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {feature?.cover && (
            <ProjectTile
              project={feature}
              className="lg:col-span-7 lg:row-span-2 lg:aspect-auto aspect-[4/3]"
              priority
            />
          )}
          {rest.slice(0, 4).map((project, idx) => (
            <ProjectTile
              key={project._id}
              project={project}
              className={`lg:col-span-${idx % 2 === 0 ? "5" : "5"} aspect-[4/3]`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProjectTile({
  project,
  className,
  priority,
}: {
  project: ProjectTeaser;
  className?: string;
  priority?: boolean;
}) {
  if (!project.cover) return null;
  const label = CATEGORY_LABELS[project.category] ?? project.category;

  return (
    <Link
      href={`/projects`}
      className={`group relative isolate overflow-hidden rounded-lg ${className ?? ""}`}
      aria-label={`${project.title} — view in portfolio`}
    >
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 text-white">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            {label}
          </p>
          <h3 className="mt-1 font-display text-xl sm:text-2xl">{project.title}</h3>
        </div>
      </div>
    </Link>
  );
}
