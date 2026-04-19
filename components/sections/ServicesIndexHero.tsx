import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";

export function ServicesIndexHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"
      />
      <Container as="div" width="wide" className="relative grid min-h-[55vh] place-items-end py-20">
        <div className="max-w-3xl space-y-4">
          <Eyebrow className="text-white/80">What we do</Eyebrow>
          <Heading as="h1" level={1} className="text-white drop-shadow-sm">
            {title}
          </Heading>
          {subtitle && (
            <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
