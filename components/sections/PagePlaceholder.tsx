import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";

/**
 * Stand-in section used by routes whose real content lands in a later PR.
 * Removing usages is part of each PR — when this file has no importers
 * left, delete it.
 */
export function PagePlaceholder({
  page,
  pr,
}: {
  page: string;
  pr: string;
}) {
  return (
    <Container as="div" width="narrow" className="flex flex-1 flex-col justify-center gap-6 py-32">
      <Eyebrow>{page}</Eyebrow>
      <Heading level={1}>Coming in {pr}.</Heading>
      <p className="text-lg text-[color:var(--color-ink-muted)]">
        This route exists so the navigation works. The full page lands in {pr}.
      </p>
    </Container>
  );
}
