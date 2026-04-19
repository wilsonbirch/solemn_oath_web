import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";

type HeroImage = { src: string; alt: string };

export function AboutHero({
  title,
  image,
}: {
  title: string;
  image: HeroImage;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"
      />
      <Container
        as="div"
        width="wide"
        className="relative grid min-h-[55vh] place-items-center py-24 text-center sm:min-h-[60vh]"
      >
        <div className="space-y-4">
          <Eyebrow className="text-white/80">Who we are</Eyebrow>
          <Heading as="h1" level={1} className="text-white drop-shadow-sm">
            {title}
          </Heading>
        </div>
      </Container>
    </section>
  );
}
