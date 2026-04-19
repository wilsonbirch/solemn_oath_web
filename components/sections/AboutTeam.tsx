import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import type { TeamMember } from "@/lib/about-defaults";

export function AboutTeam({
  title,
  members,
}: {
  title: string;
  members: ReadonlyArray<TeamMember>;
}) {
  if (members.length === 0) return null;

  return (
    <Section tone="surface" spacing="lg">
      <Container width="wide" as="div">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The team</Eyebrow>
          <Heading level={2} className="mt-3">
            {title}
          </Heading>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              {member.photo ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[color:var(--color-rule)]">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden
                  className="flex aspect-[4/5] w-full items-center justify-center rounded-lg bg-[color:var(--color-rule)] font-display text-7xl text-[color:var(--color-brand)]/30"
                >
                  {member.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              <h3 className="mt-6 font-display text-2xl">{member.name}</h3>
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--color-brand-soft)]">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-3 text-base leading-relaxed text-[color:var(--color-ink-muted)]">
                  {member.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
