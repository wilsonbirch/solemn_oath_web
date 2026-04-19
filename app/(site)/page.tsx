import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

/**
 * Placeholder home page — the real hero / sections / gallery land in PR 3.
 * For now this exists so the shared layout (Header + Footer) has something
 * to wrap and we can verify navigation works end-to-end.
 */
export default function HomePage() {
  return (
    <Container as="div" width="narrow" className="flex flex-1 flex-col justify-center gap-8 py-24">
      <Eyebrow>Solemn Oath Contracting</Eyebrow>
      <Heading level={1}>Layout in place — pages land next.</Heading>
      <p className="max-w-xl text-lg text-[color:var(--color-ink-muted)]">
        Header, footer, and shared layout are now wired up. The real home,
        about, services, projects, testimonials, and contact pages land in
        subsequent PRs.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/contact">Get a free quote</Button>
        <Button href="/studio" variant="secondary">
          Open Sanity Studio
        </Button>
      </div>
      <p className="text-sm text-[color:var(--color-ink-muted)]">
        Try the navigation above — all routes return the placeholder shell
        until each PR fills them in. <Link href="/about" className="underline">/about</Link>,{" "}
        <Link href="/services" className="underline">/services</Link>,{" "}
        <Link href="/projects" className="underline">/projects</Link>,{" "}
        <Link href="/testimonials" className="underline">/testimonials</Link>,{" "}
        <Link href="/contact" className="underline">/contact</Link>.
      </p>
    </Container>
  );
}
