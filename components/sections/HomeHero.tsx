import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import type { Cta } from "@/lib/home-defaults";

type HeroImage = { src: string; alt: string };

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  image,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: HeroImage;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white"
      aria-labelledby="home-hero-title"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      {/* Vignette gradient — dark at the bottom for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80"
      />

      <Container
        as="div"
        width="wide"
        className="relative grid min-h-[78vh] place-items-end py-16 sm:min-h-[82vh] sm:py-20 lg:min-h-[88vh]"
      >
        <div className="max-w-3xl space-y-6">
          {eyebrow && <Eyebrow className="text-white/80">{eyebrow}</Eyebrow>}
          <Heading
            as="h1"
            level={1}
            id="home-hero-title"
            className="text-white drop-shadow-sm"
          >
            {title}
          </Heading>
          {subtitle && (
            <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{subtitle}</p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg" variant="primary">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} size="lg" variant="inverse">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
